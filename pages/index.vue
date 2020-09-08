<template>
    <div class="container">
        <app-navs />
        <!-- <nuxt-child /> -->
        <flight-search />
    </div>
</template>

<script>
import AppNavs from '~/components/navs/Navs'
import FlightSearch from '~/components/flight/flight-search/FlightSearch'

export default {
    components: {
        AppNavs,
        FlightSearch
    },
    layout: 'Mobile'
}
</script>
