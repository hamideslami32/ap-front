<template>
    <div class="flight-detail mt-3 mx-2">
        <portal to="header">
            <span>جزئیات پرواز</span>
        </portal>
        <div class="d-flex align-items-center justify-content-center mb-2">
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].origin.city | translate }}</span>
            <span class="mx-3">-</span>
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].destination.city | translate }}</span>
        </div>

        <!--<div class="d-flex align-items-center justify-content-center text-2 text-gray-800 mb-3">
            <span>{{ $dayjs($flight.session.routes[0].date).format('dddd D MMMM YY') }}</span>
            <span class="px-1">-</span>
            <span>توقف لندن</span>
            <span class="px-1">-</span>
            <span class="font-en text-weight-500">Economy(H)</span>
        </div>-->

        <div v-for="flight in flights" :key="flight._id" class="flight-detail__card-holder mt-3 mb-3">
            <flight-detail-card :flight="flight" />
        </div>

        <risk-free-card />
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
            const { order } = await flightApi.createOrder({
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
