<template>
    <div>
        <div v-if="loading" class="flight-container">
            <flight-placeholder v-for="i in 3" :key="i" class="mb-3" />
        </div>
        <div v-else-if="availables" class="flight-container">
            <flight-card v-for="(x, i) in availables.results" :key="i" class="mb-3" :available="x" />
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
            <a-btn wrapper-class="filter-btn" variant="primary" @click="showFilter = true">
                فیلتر و مرتب سازی
            </a-btn>

            <b-modal v-model="showFilter" body-class="px-0" hide-footer>
                <template v-slot:modal-title>
                    فیلتر و مرتب سازی
                </template>
                <template v-slot:modal-header-close>
                    <svgicon name="arrow-long-right" width="20" height="20" />
                </template>
                <flight-filter v-model="filters" :options="availables.filters" @apply="applyFilters" />
            </b-modal>
        </template>
    </div>
</template>

<script>
import Axios from 'axios'
import FlightCard from '~/components/flight/available/FlightCard'
import FlightPlaceholder from '~/components/flight/available/FlightPlaceholder'
import { flightApi } from '~/api/flight'
import FlightFilter from '~/components/flight/available/filter/FlightFilter'
import isEqual from 'lodash/isEqual'

const POLLING_INTERVAL = 3000

export default {
    layout: 'flight-search',
    components: {
        FlightFilter,
        FlightCard,
        FlightPlaceholder
    },
    data() {
        return {
            reverse: true,
            loading: false,
            availables: null,
            showFilter: false,
            error: null,
            filters: {}
        }
    },
    computed: {
        searchId() {
            return this.$route.query.sid
        }
    },
    watch: {
        '$route.fullPath'(t, f) {
            if (!this.$route.query.sid) {
                this.refresh()
            }
        },

        filters: {
            deep:true,
            async handler(t, f) {
                if (isEqual(t, f)) return
                this.availables = null
                this.availables = await this.startPolling(this.searchId)
            }
        }
    },
    mounted() {
        this.refresh(!this.searchId)
    },

    beforeDestroy() {
        this.cancelPolling()
    },

    methods: {
        async search() {
            const toGregory = d => this.$dayjs(d, { jalali: true }).calendar('gregory').format()
            const { departing, returning, business, first, adult=1, child=0, infant=0 } = this.$route.query
            const [origin, destination] = this.$route.params.id.split('-')
            const res = await flightApi.createSearch( {
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
            return res.id
        },
        startPolling(sid, retry = 1) {
            const { filters } = this
            const { priceRange = [], departureFlightTime, returningFlightTime, airlines = [] } = filters
            return flightApi.getResults(sid, {
                sort: filters.sort,
                minPrice: priceRange[0] || undefined,
                maxPrice: priceRange[1] || undefined,
                flightTimes: departureFlightTime || returningFlightTime ? [
                    departureFlightTime ? { min: departureFlightTime[0], max: departureFlightTime[1] } : '',
                    returningFlightTime ? { min: returningFlightTime[0], max: returningFlightTime[1] } : ''
                ] : undefined,
                airlines: airlines.length ? airlines : undefined
            }, new Axios.CancelToken(canceler => {
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
        cancelPolling() {
            this._pollingCanceler && this._pollingCanceler()
            clearTimeout(this._pollingTimeout)
        },
        async refresh(newSearch = true) {
            this.loading = true
            this.availables = null
            try {
                const searchId = newSearch ? await this.search() : this.searchId
                if (newSearch) {
                    await new Promise(resolve => this._pollingTimeout = setTimeout(resolve, POLLING_INTERVAL / 2))
                }
                this.availables = await this.startPolling(searchId)
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

        applyFilters(filters, close) {
            this.filters = filters
            if (close) {
                this.showFilter = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-container {
        padding: 114px + 20px 10px 80px;
        -ms-overflow-style: none;
        overflow: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    /deep/ .filter-btn {
        font-size: 0.8em;
        position: fixed;
        bottom: 20px;
        margin: auto;
        left: 50%;
        transform: translateX(-50%);

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
    }
</style>
