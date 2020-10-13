<template>
    <div v-if="available" class="flight-time">
        <portal to="title">
            <span>انتخاب ساعت پرواز</span>
        </portal>
        <portal to="right-header">
            <a class="text-gray-900" href="javascript:void(0)" @click="$router.back()">
                <svgicon name="delete-disabled" width="30" height="30" />
            </a>
        </portal>
        <portal to="left-header">
            <span />
        </portal>
        <div class="flight-time__header d-flex align-items-center py-3 justify-content-between">
            <span class="px-3 text-2 text-gray-700">{{ classTypeText }}</span>
            <div class="flight-time__header__places">
                <span class="text-gray-800 text-3">{{ $translate(search.origin.city) }}</span>
                <svgicon
                    class="pair-icon text-primary"
                    name="arrows-round"
                    width="26"
                    height="26"
                />
                <span class="text-gray-800 text-3">{{ $translate(search.destination.city) }}</span>
            </div>
            <span class="px-3 text-2 text-gray-700">{{ this.$flight.passengersCount }} مسافر</span>
        </div>
        <div class="d-flex flight-time__container">
            <div>
                <div class="text-2 text-gray-900 mb-2 text-weight-500 pt-3">
                    <b>پرواز رفت</b>
                    <p class="mt-3 flight-time__container__info">
                        <span class="text-2 text-primary text-weight-600">
                            {{ available.routes[0].origin }}
                            -
                            {{ available.routes[0].destination }}
                        </span>
                        <span class="text-2 text-gray-800 text-weight-400 float-left">{{ date[0].format('D MMMM YY') }}</span>
                    </p>
                </div>
                <div>
                    <flight-date-card
                        v-for="(flight, i) in available.routes[0].flights"
                        :key="flight._id"
                        :flight="flight"
                        :available="available"
                        :active="flightTimes[0] === i"
                        @click="selectFlight(0, i)"
                    >
                        <template v-if="!available.routes[1]" #airlineName>
                            <span class="text-2 text-gray-3 en airline-name">{{ getAirlines(flight).join(' ') }}</span>
                        </template>
                    </flight-date-card>
                </div>
            </div>
            <div v-if="available.routes[1]" class="bg-gray-500">
                <div class="text-2 text-gray-900 mb-2 text-weight-500 pt-3 text-left">
                    <b>پرواز برگشت</b>
                    <p class="mt-3 flight-time__container__info flight-time__container__info--back">
                        <span class="text-2 text-primary text-weight-600 float-right">
                            {{ available.routes[1].origin }}
                            -
                            {{ available.routes[1].destination }}
                        </span>
                        <span class="text-2 text-gray-800 text-weight-400">{{ date[1].format('D MMMM YY') }}</span>
                    </p>
                </div>

                <div>
                    <flight-date-card
                        v-for="(flight, i) in available.routes[1].flights"
                        :key="flight._id"
                        :flight="flight"
                        :available="available"
                        :active="flightTimes[1] === i"
                        @click="selectFlight(1, i)"
                    />
                </div>
            </div>
        </div>


        <flight-details-toast>
            <b-button class="text-3 py-2 px-4" variant="secondary" @click="submit">
                جز‌ئیات پرواز
            </b-button>
        </flight-details-toast>
    </div>
</template>

<script>
import FlightDateCard from '~/components/flight/available/time/FlightDateCard'
import flightSearchMixin from '~/components/flight/flight-search/flightSearchMixin'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'

export default {
    components: {FlightDetailsToast, FlightDateCard},

    mixins: [flightSearchMixin],

    data() {
        const { available } = this.$flight
        const similarFlightsCount = available ? this.$flight.similarFlightsCount(available) : 0
        return {
            flightTimes: new Array(available ? available.routes.length : 1).fill(null).map((el, i) => {
                if (similarFlightsCount > 0) return null
                return 0
            })
        }
    },
    computed: {
        available() {
            return this.$flight.available
        }
    },
    methods: {
        selectFlight(i, flightIndex) {
            this.$set(this.flightTimes, i, flightIndex)
        },
        getAirlines(flight) {
            return [...new Set(flight.stops.map(s => s.airlineName))]
        },
        submit() {
            if (this.flightTimes.filter(el => el != null).length < this.available.routes.length) {
                this.$toast.alert('لطفا ساعت پرواز خود را مشخص کنید.')
                return
            }
            this.$router.push({
                path: this.$route.path + '/detail',
                query: {
                    ...this.$route.query,
                    flights: this.flightTimes.map((i, routeIndex) => this.available.routes[routeIndex].flights[i]._id).join(',')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-time {
        &__header {
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            position: relative;
            z-index: 2;

            > span {
                &:first-child {
                    border-left: 1px solid map_get($grays, '400');
                }

                &:last-child {
                    border-right: 1px solid map_get($grays, '400');
                }
            }

            &__places {
                display: flex;
                flex-grow: 1;
                justify-content: space-evenly;
                padding: 0 15px;
                align-items: center;

                svg {
                    border: 1px solid map_get($grays, '400');
                    border-radius: 50%;
                    padding: 3px;
                    box-sizing: content-box;
                }

                span {
                    font-weight: 500;
                }
            }
        }

        &__container {
            position: absolute;
            top: 126px;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: auto;

            & > div::-webkit-scrollbar {
                display: none;
            }

            > div {
                flex: 1;
                overflow-y: scroll;
                height: 100%;

                padding: 0 10px 80px;
            }

            &__info {
                background: map_get($grays, '500');
                padding: 10px;
                border-radius: 10px;

                &--back {
                    background: $white;
                }
            }
        }

        /deep/ .flight-date-card {
            margin-bottom: 15px;

            &:last-child {
                margin-bottom: 60px;
            }
        }
    }

</style>
