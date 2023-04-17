<template>
    <div class="container">
        <flight-search />
    </div>
</template>


<script>
import FlightSearch from '~/components/flight/flight-search/FlightSearch'

export default {
    components: {
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