export class FlightApi {
    suggest(query) {
        return this.axios.$get('/flight/suggestions', {
            params: {
                q: query
            }
        })
    }
}

export default {
    beforeCreate() {
        FlightApi.prototype.axios = this.$axios
        this.flightApi = new FlightApi()
    }
}