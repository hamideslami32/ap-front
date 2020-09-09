<template>
    <div class="flight-detail mt-3 mx-2">
        <portal to="header">
            <span>جزئیات پرواز</span>
        </portal>
        <portal to="right-header">
            <svgicon name="share" width="30" height="30" />
        </portal>
        <div class="d-flex align-items-center justify-content-center mb-2">
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].origin.city | translate }}</span>
            <span class="mx-3">-</span>
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].destination.city | translate }}</span>
        </div>

        <div class="d-flex align-items-center justify-content-center text-2 text-gray-800 mb-3">
            <span>{{ $dayjs($flight.session.routes[0].date).format('dddd D MMMM YY') }}</span>
            <span class="px-1">-</span>
            <span>
                <template v-if="flights[0].stops.length > 1">
                    {{ flights[0].stops.length - 1 }}
                    توقف
                    <template v-if="flights[0].stops.length === 2">
                        در {{ flights[0].stops[0].arrivalCityName }}
                    </template>
                </template>
                <template v-else>
                    بدون توقف
                </template>
            </span>
            <span class="px-1">-</span>
            <span class="font-en text-weight-500">Economy(H)</span>
        </div>

        <div class="flight-detail__card-holder mt-3 mb-3">
            <flight-detail-card :flight="flights[0]" />
        </div>

        <template v-if="$flight.session.routes[1]">
            <div class="d-flex align-items-center justify-content-center mb-2 mt-1">
                <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[1].origin.city | translate }}</span>
                <span class="mx-3">-</span>
                <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[1].destination.city | translate }}</span>
            </div>

            <div class="d-flex align-items-center justify-content-center text-2 text-gray-800 mb-3">
                <span>{{ $dayjs($flight.session.routes[1].date).format('dddd D MMMM YY') }}</span>
                <span class="px-1">-</span>
                <span>
                    <template v-if="flights[1].stops.length > 1">
                        {{ flights[1].stops.length - 1 }}
                        توقف
                        <template v-if="flights[1].stops.length === 2">
                            در {{ flights[1].stops[0].arrivalCityName }}
                        </template>
                    </template>
                    <template v-else>
                        بدون توقف
                    </template>
                </span>
                <span class="px-1">-</span>
                <span class="font-en text-weight-500">Economy(H)</span>
            </div>

            <div class="flight-detail__card-holder mt-3 mb-3">
                <flight-detail-card :flight="flights[1]" />
            </div>
        </template>


        <risk-free-card tag="Risk Free" tag-color="#45c6d4" />
        <price-detail />

        <div class="py-5" />
        <div class="py-4" />

        <flight-details-toast>
            <b-button class="text-3 py-2 px-4" variant="secondary" @click="submit">
                رزرو کنید
            </b-button>
        </flight-details-toast>
    </div>
</template>

<script>
import FlightDetailCard from '~/components/flight/detail/FlightDetailCard'
import RiskFreeCard from '~/components/flight/detail/RiskFreeCard'
import PriceDetail from '~/components/flight/PriceDetail'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'
import {flightApi} from '~/api/flight'

export default {
    components: {
        FlightDetailsToast,
        FlightDetailCard,
        RiskFreeCard,
        PriceDetail
    },
    layout: 'page',
    computed: {
        available() {
            return this.$flight.available
        },
        flights() {
            return this.$route.query.flights.split('-').map((flightIndex, i) => this.available.routes[i].flights[flightIndex])
        }
    },

    methods: {
        async submit() {
            const {order} = await flightApi.createOrder({
                sessionId: this.$flight.session.id,
                availableId: this.available._id,
                flightIds: this.flights.map(fl => fl._id)
            })
            await this.$router.push({
                path: this.$route.path + '/order',
                query: {
                    ...this.$route.query,
                    orderId: order._id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
