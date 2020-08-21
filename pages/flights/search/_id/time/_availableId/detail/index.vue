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

        <risk-free-card class="mb-5" />
    </div>
</template>

<script>
import FlightDetailCard from '~/components/flight/detail/FlightDetailCard'
import RiskFreeCard from '~/components/flight/detail/RiskFreeCard'

export default {
    components: {
        FlightDetailCard,
        RiskFreeCard
    },
    layout: 'page',

    computed: {
        available() {
            return this.$flight.available
        },
        flights() {
            return this.$route.query.flights.split('-').map((flightIndex, i) => this.available.routes[i].flights[flightIndex])
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
