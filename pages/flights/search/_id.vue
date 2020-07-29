<template>
    <div>
        <div v-if="loading" class="flight-container">
            <flight-placeholder v-for="i in 3" :key="i" class="mb-3" />
        </div>
        <div v-else-if="availables" class="flight-container">
            <flight-card v-for="(x, i) in availables.results" :key="i" class="mb-3" :available="x" />
        </div>

        <a-btn wrapper-class="filter-btn" variant="primary" @click="showFilter = true">
            فیلتر و مرتب سازی
        </a-btn>

        <b-modal v-model="showFilter" hide-footer>
            <template v-slot:modal-title>
                فیلتر و مرتب سازی
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <flight-filter />
        </b-modal>
    </div>
</template>

<script>
import Axios from 'axios'
import FlightCard from '~/components/flight/available/FlightCard'
import FlightPlaceholder from '~/components/flight/available/FlightPlaceholder'
import { flightApi } from '~/api/flight'
import FlightFilter from '~/components/flight/available/FlightFilter'

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
            showFilter: false
        }
    },
    computed: {
        searchId() {
            return this.$route.query.sid
        },
        isInternational() {
            const {origin, destination} = this.search
            return origin && destination && (!origin.isDomestic || !destination.isDomestic)
        }
    },
    async mounted() {
        this.loading = true
        try {
            let searchId = this.searchId
            if (!this.searchId) {
                searchId = await this.search()
            }
            const results = await this.startPolling(searchId)
            this.availables = results
        } catch (err) {
        } finally {
            this.loading = false
        }
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
                class: first ? 'first' : (business ? 'business' : 'economy'),
                adult: Number(adult),
                child: Number(child),
                infant: Number(infant)
            })
            await this.$router.push({
                query: {
                    ...this.$route.query,
                    sid: res.id
                }
            })
            return res.id
        },
        startPolling(sid, retry = 1) {
            return flightApi.getResults( sid, new Axios.CancelToken(canceler => {
                this._pollingCanceler = canceler
            })).then(res => {
                if (res.progress < 100) {
                    return new Promise(resolve => {
                        this._pollingTimeout = setTimeout(resolve, 3000)
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
