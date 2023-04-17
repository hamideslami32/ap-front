<template>
    <div class="container">
        <app-navs />
        <nuxt-child />
        <flight-search v-if="$route.path === '/'" />
    </div>
</template>

<script>
import AppNavs from '~/components/navs/Navs'
import FlightSearch from '~/components/flight/flight-search/FlightSearch'

export default {
    components: {
        AppNavs,
        FlightSearch
    }
}
</script>


<router>
    {
    "meta": {
    "showBottomNav": true
    }
    }
</router>
