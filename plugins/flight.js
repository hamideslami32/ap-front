import Vue from 'vue'
import {flightApi} from '~/api/flightApi'
import SearchExpirationModal from '~/components/flight/SearchExpirationModal'

class Flight {

    constructor(ctx) {
        this.session = null
        this.available = null
        this.flights = null
        this.staticUrl = ctx.$staticUrl
        if (process.server) {
            this.ssr = ctx.ssrContext.nuxt
        }

        if (process.browser && ctx.nuxtState.session) {
            this.session = ctx.nuxtState.session
        }

        ctx.app.router.afterEach(to => {
            if (!to.query.sid) {
                this.setSession(null)
            }
        })
    }

    async fetchSession(id) {
        this.session = await flightApi.getSearchSession(id)


        if (process.server) {
            this.ssr.session = this.session
        }
        return this.session
    }

    async fetchAvailable(id) {
        this.available = await flightApi.getAvailable(this.session.id, id)
        if (process.server) {
            this.ssr.available = this.available
        }
        return this.available
    }

    setSession(x) {
        this.session = x
    }

    selectAvailable(x) {
        this.available = x
    }

    selectFlights(flights) {
        this.flights = flights
    }

    get passengersCount() {
        const {adult, child, infant} = this.session
        return adult + child + infant
    }

    flightPrice(flight) {
        const { fare } = flight
        return ['adult', 'child', 'infant'].reduce((carry, item) => carry + (fare[item].price + fare[item].tax) * this.session[item], 0)
    }

    similarFlightsCount(available) {
        const { routes, totalFare } = available
        if (routes.length === 1) {
            return routes[0].flights.length - 1
        }
        if (routes.length === 2) {
            let count = 0
            routes[0].flights.forEach(f1 => {
                routes[1].flights.forEach(f2 => {
                    count += this.flightPrice(f1) + this.flightPrice(f2) === totalFare ? 1 : 0
                })
            })
            return count - 1
        }
        return 0
    }

    airlineLogoUrl(iata) {
        return this.staticUrl(`/ad/airlines/logo/${iata}.png`)
    }

    expireSession(onRetry, msg = null) {
        if (this._expireVm) return
        const vm = this._expireVm = new SearchExpirationModal({
            el: document.createElement('div')
        })
        vm.msg = msg
        vm.$once('retry', () => {
            onRetry()
            vm.$destroy()
            document.body.removeChild(vm.$el)
            this._expireVm = null
        })
        document.body.appendChild(vm.$el)
    }
}

export default async function(ctx, inject) {
    const flight = Vue.observable(new Flight(ctx))
    const { sid } = ctx.route.query
    const { availableId } = ctx.route.params
    if (process.server) {
        if (sid) {
            await flight.fetchSession(sid).catch(() => null)
        }
        if (availableId) {
            await flight.fetchAvailable(availableId).catch(() => null)
        }
    }
    if (process.browser) {
        if (sid && !flight.session) {
            await flight.fetchSession(sid).catch(() => null)
        }
        if (availableId && !flight.available) {
            await flight.fetchAvailable(availableId).catch(() => null)
        }
    }
    inject('flight', flight)
}
