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

    getAvailable(searchId, availableId) {
        return this.axios.$get('/flight/results/' + searchId + '/' + availableId)
    }

    getFlights(searchId, availableId, flightIds) {
        return this.axios.$get(`/flight/results/${searchId}/${availableId}/fare`, {
            params: {
                flightIds: flightIds.join(',')
            }
        })
    }

    createOrder({ sessionId, availableId, flightIds, callbackURL }) {
        return this.axios.$post(`/flight/results/${sessionId}/select`, {
            availableId,
            flightIds,
            callbackURL
        })
    }

    pay(orderId) {
        return this.axios.$post(`/order/${orderId}/pay`)
    }

    getOrder(orderId) {
        return this.axios.$get(`/order/${orderId}`)
    }
}
