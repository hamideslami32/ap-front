<template>
    <div>
        <flight-header />
        <nuxt />
    </div>
</template>

<script>
import FlightHeader from '~/components/flight/FlightHeader'

export default {
    name: 'FlightSearch',
    components: {
        FlightHeader
    }
}
</script>
