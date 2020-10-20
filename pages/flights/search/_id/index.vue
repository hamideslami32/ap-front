<template>
    <div class="h-100">
        <portal to="header">
            <flight-header />
        </portal>
        <div v-if="loading" class="flight-container h-100">
            <flight-lottie-loading />
        </div>
        <div v-else-if="availables" class="flight-container h-100">
            <template v-if="availables.results.length">
                <flight-card
                    v-for="(x, i) in availables.results"
                    :key="i"
                    class="mb-3"
                    :available="x"
                    @click="onSelectAvailable(x)"
                />
            </template>
            <template v-else>
                <b-alert variant="danger" show>
                    موردی یافت نشد.
                </b-alert>
                <div v-if="!isInitialFilters" class="text-center">
                    <b-btn variant="outline-info" @click="applyFilters(initialFilters)">
                        حذف فیلترها
                    </b-btn>
                </div>
            </template>
        </div>
        <div v-else-if="error" class="flight-container">
            <b-alert variant="danger" show>
                {{ error.message }}
            </b-alert>
            <div class="text-center">
                <b-btn variant="outline-info" @click="refresh">
                    تلاش مجدد
                </b-btn>
            </div>
        </div>

        <template v-if="availables && availables.filters">
            <sticky-bottom>
                <a-btn

                    wrapper-class="filter-btn"
                    :class="{ 'filter-btn--selected' : filtersCount }"
                    variant="primary"
                    shadow
                    @click="showFilter = true"
                >
                    {{ filterBtnText }}
                </a-btn>
            </sticky-bottom>


            <b-modal v-model="showFilter" modal-class="right-icon" body-class="px-0" hide-footer>
                <template v-slot:modal-title>
                    فیلتر و مرتب سازی
                </template>
                <template v-slot:modal-header-close>
                    <svgicon name="delete-disabled" width="30" height="30" />
                </template>
                <flight-filter v-model="filters" :options="availables.filters" @apply="applyFilters" />
            </b-modal>
        </template>
    </div>
</template>

<script>
import Axios from 'axios'
import FlightCard from '~/components/flight/available/FlightCard'
import {flightApi} from '~/api/flightApi'
import FlightFilter from '~/components/flight/available/filter/FlightFilter'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import StickyBottom from '@/components/ui/StickyBottom'
import FlightHeader from '@/components/flight/FlightHeader'
import FlightLottieLoading from '@/components/flight/available/FlightLottieLoading'

const initialFilters = () => ({
    sort: '',
    priceRange: [null, null],
    airlines: [],
    airports: [],
    departureFlightTime: [],
    returningFlightTime: [],
    flightClass: 'economy'
})


const POLLING_INTERVAL = 3000

export default {
    components: {
        FlightHeader,
        StickyBottom,
        FlightFilter,
        FlightCard,
        FlightLottieLoading
    },
    data() {
        return {
            reverse: true,
            loading: false,
            availables: null,
            showFilter: false,
            error: null,
            filters: initialFilters(),
            initialFilters: initialFilters()
        }
    },
    computed: {
        searchId() {
            return this.$route.query.sid
        },
        isInitialFilters() {
            return FlightFilter.methods.isInitialFilters.call(null, this.filters) || JSON.stringify(this.filters) === '{}'
        },
        filterBtnText() {
            return this.filtersCount > 0 ? 'فیلتر ( ' + this.filtersCount + ' فیلتر)' : 'فیلتر و مرتب سازی '
        },
        filtersCount() {
            let c
            if (!isEmpty(this.filters)) {
                c = Object.keys(this.initialFilters).filter(key => !isEqual(this.initialFilters[key], this.filters[key])).length
            } else {
                c = 0
            }
            return c
        }
    },
    watch: {
        '$route.fullPath'(t, f) {
            if (!this.$route.query.sid) {
                this.refresh()
            }
        },
        filters: {
            deep: true,
            async handler(t, f) {
                if (isEqual(t, f)) return
                this.availables = null
                this.availables = await this.startPolling(this.searchId)
            }
        }
    },
    mounted() {
        if (this.$flight.session) {
            this.expireTime()
        }
        this.refresh(!this.searchId)

        window.addEventListener('scroll', this.scrollListener)
    },
    beforeDestroy() {
        this.cancelPolling()
        clearTimeout(this._checkExpire)
        window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
        async search() {
            const toGregory = d => this.$dayjs(d, {jalali: true}).calendar('gregory').format()
            const {departing, returning, business, first, adult = 1, child = 0, infant = 0} = this.$route.query
            const [origin, destination] = this.$route.params.id.split('-')
            const res = await flightApi.createSearch({
                routes: [
                    {
                        origin,
                        destination,
                        date: toGregory(departing)
                    },
                    ...(returning ? [
                        {
                            origin: destination,
                            destination: origin,
                            date: toGregory(returning)
                        }
                    ] : [])
                ],
                class: first !== undefined ? 'first' : (business !== undefined ? 'business' : 'economy'),
                adult: Number(adult),
                child: Number(child),
                infant: Number(infant)
            })
            this.$flight.setSession(res)
            await this.$router.replace({
                query: {
                    ...this.$route.query,
                    sid: res.id
                }
            })
            return res
        },
        startPolling(sid, retry = 1) {
            return this.getRequest(sid, new Axios.CancelToken(canceler => {
                this._pollingCanceler = canceler
            })).then(res => {
                if (res.progress < 100) {
                    return new Promise(resolve => {
                        this._pollingTimeout = setTimeout(resolve, POLLING_INTERVAL)
                    }).then(() => this.startPolling(sid))
                }
                return res
            }).catch(err => {
                if (Axios.isCancel(err)) {
                    return null
                }
                if (retry > 0) {
                    return this.startPolling(sid, 0)
                }
                throw err
            })
        },
        getRequest(sid, cancelToken, offset, limit) {
            const {filters} = this
            const {priceRange = [], departureFlightTime, returningFlightTime, airlines = []} = filters
            return flightApi.getResults(sid, {
                sort: filters.sort ? filters.sort : undefined,
                minPrice: priceRange[0] || undefined,
                maxPrice: priceRange[1] || undefined,
                flightTimes: (departureFlightTime || []).concat(returningFlightTime || []).length ? [
                    departureFlightTime ? departureFlightTime : '',
                    returningFlightTime ? returningFlightTime : ''
                ] : undefined,
                airlines: airlines.length ? airlines : undefined,
                offset,
                limit
            }).then(res => {
                res.results = res.results.filter(result => {
                    result.similarFlightsCount = this.$flight.similarFlightsCount(result)
                    return result.similarFlightsCount >= 0
                })
                return res
            })
        },
        cancelPolling() {
            this._pollingCanceler && this._pollingCanceler()
            clearTimeout(this._pollingTimeout)
        },
        async refresh(newSearch = true) {
            this.loading = true
            this.availables = null
            delete this._loadMoreComplete
            try {
                const search = newSearch ? await this.search() : { id: this.searchId }
                if (search.progress >= 100) {
                    this.availables = {
                        results: search.results,
                        filters: search.filters
                    }
                    return
                }
                if (newSearch) {
                    await new Promise(resolve => this._pollingTimeout = setTimeout(resolve, POLLING_INTERVAL / 2))
                }
                this.availables = await this.startPolling(search.id)
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err)
                this.error = {
                    message: 'خطایی در سرور رخ داده است.'
                }
            } finally {
                this.loading = false
            }
        },

        async loadMore() {
            if (this.loading || this._loadMoreComplete) return false
            const limit = 20
            const { results } = await this.getRequest(this.searchId, null, this.availables.results.length, limit)
            if (results.length < 20) {
                this._loadMoreComplete = true
            }
            results.forEach(r => {
                this.availables.results.push(r)
            })
        },

        applyFilters(filters, close) {
            this.filters = filters
            if (close) {
                this.showFilter = false
            }
        },

        onSelectAvailable(available) {
            this.$flight.selectAvailable(available)
            if (this.$flight.similarFlightsCount(available) > 0) {
                this.$router.push({
                    path: this.$route.path + '/' + available._id,
                    query: {
                        sid: this.searchId
                    }
                })
            } else {
                this.$router.push({
                    path: this.$route.path + '/' + available._id + '/detail',
                    query: {
                        ...this.$route.query,
                        flights: available.routes.map(el => el.flights[0]._id).join(',')
                    }
                })
            }
        },
        research() {
            this.refresh()
        },
        expireTime() {
            if(this.$flight.session) {
                const expireTime = this.$dayjs(this.$flight.session.expireAt)
                const nowTime = this.$dayjs()
                const expirationTime = expireTime.diff(nowTime)

                this._checkExpire = setTimeout(() => {
                    this.$flight.expireSession(() => this.refresh(true))
                }, expirationTime)
            }
        },

        scrollListener() {
            const OFFSET = 50
            if (window.scrollY > (document.documentElement.scrollHeight - document.documentElement.clientHeight) - OFFSET) {
                this.loadMore()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-container {
        padding: 60px 10px 80px;
        -ms-overflow-style: none;
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    /deep/ .filter-btn {
        font-size: 0.8em;

        .btn {
            width: 140px;
            height: 40px;
            position: relative;

            &::after {
                content: '';
                width: 6px;
                height: 6px;
                display: inline-block;
                background: #e3469a;
                margin-right: 5px;
                border-radius: 50%;
            }
        }

        &--selected {
            &:after {
                background: $success !important;
            }
        }
    }
</style>
