import {BaseApi} from '~/plugins/api'

export const flightApi = new class FlightApi extends BaseApi {
    suggest(query) {
        return this.axios.$get('/flight/suggestions', {
            params: {
                q: query
            }
        })
    }
}