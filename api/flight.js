import {BaseApi} from '~/plugins/api'

export const flightApi = new class FlightApi extends BaseApi {
    suggest(query) {
        return this.axios.$get('/flight/suggestions', {
            params: {
                q: query
            }
        })
    }

    createSearch(data) {
        return this.axios.$post('/flight/search', data)
    }

    getSearchSession(id) {
        return this.axios.$get('/flight/search/' + id)
    }

    getResults(searchId, cancelToken) {
        return this.axios.$get('/flight/results/' + searchId, {
            cancelToken
        })
    }
}
