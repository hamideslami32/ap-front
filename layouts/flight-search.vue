<template>
    <div>
        <flight-header />
        <nuxt />
    </div>
</template>

<script>
import {flightApi} from '~/api/flight'
import FlightHeader from '~/components/flight/FlightHeader'

export default {
    name: 'FlightSearch',
    components: {
        FlightHeader
    },
    provide() {
        return {
            $session: this.$data
        }
    },
    async fetch() {
        if (process.server) {
            await this.fetchSession()
        }
    },

    data() {
        return {
            session: null
        }
    },

    watch: {
        '$route.query.sid': 'fetchSession'
    },

    methods: {
        fetchSession() {
            const {sid} = this.$route.query
            return sid && flightApi.getSearchSession(sid).then(res => {
                this.session = res
            })
        }
    }
}
</script>
