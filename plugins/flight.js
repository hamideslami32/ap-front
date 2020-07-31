import Vue from 'vue'
import { flightApi } from '~/api/flight'

class Flight {

    constructor(ctx) {
        this.session = null

        if (process.browser && ctx.nuxtState.session) {
            this.session = ctx.nuxtState.session
        }
    }

    async fetchSession(id) {
        this.session = await flightApi.getSearchSession(id)
        return this.session
    }

    setSession(x) {
        this.session = x
    }
}

export default async function(ctx, inject) {
    const flight = Vue.observable(new Flight(ctx))
    const { sid } = ctx.route.query
    if (process.server && sid) {
        ctx.ssrContext.nuxt.session = await flight.fetchSession(sid).catch(() => null)
    }
    if (process.browser && sid && !flight.session) {
        await flight.fetchSession(sid)
    }
    inject('flight', flight)
}
