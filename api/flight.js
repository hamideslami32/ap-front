import {BaseApi} from '~/plugins/api'


export const flightApi = new class FlightApi extends BaseApi {
    constructor() {
        super()
        this.suggestions = Object.create(null)
    }

    suggest(query) {
        if (query in this.suggestions) {
            return Promise.resolve(this.suggestions[query])
        }
        return this.axios.$get('/flight/suggestions', {
            params: {
                q: query
            }
        }).then(res => {
            this.suggestions[query] = res
            return res
        })
    }

    createSearch(data) {
        return this.axios.$post('/flight/search', data)
    }

    getSearchSession(id) {
        return this.axios.$get('/flight/search/' + id)
    }

    getResults(searchId, filters, cancelToken) {
        return this.axios.$get('/flight/results/' + searchId, {
            params: filters,
            cancelToken
        })
    }

    getDatePrices({
        origin, destination, type, minDate, maxDate
    }) {
        return this.axios.$get(`/flight/search/date-prices/${origin}-${destination}`, {
            params: {
                type,
                minDate,
                maxDate
            }
        })
    }
}
