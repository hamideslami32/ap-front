import Vue from 'vue'
import { flightApi } from '~/api/flight'

class Flight {

    constructor(ctx) {
        this.session = null
        this.available = null

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
        return this.session
    }

    async fetchAvailable(id) {
        this.available = await flightApi.getAvailable(this.session.id, id)
        return this.available
    }

    setSession(x) {
        this.session = x
    }

    selectAvailable(x) {
        this.available = x
    }
}

export default async function(ctx, inject) {
    const flight = Vue.observable(new Flight(ctx))
    const { sid } = ctx.route.query
    const { availableId } = ctx.route.params
    if (process.server) {
        if (sid) {
            ctx.ssrContext.nuxt.session = await flight.fetchSession(sid).catch(() => null)
        }
        if (availableId) {
            ctx.ssrContext.nuxt.available = await flight.fetchAvailable(availableId).catch(() => null)
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
