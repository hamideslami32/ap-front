import Vue from 'vue'

const COOKIE_TOKEN = 'token'

class Auth {
    constructor(ctx) {
        this.axios = ctx.app.$axios
        this.storage = ctx.$storage
        this.user = null

        const token = this.storage.getCookie(COOKIE_TOKEN)
        if (token) {
            this.setToken(token)
        }
        if (process.browser && ctx.nuxtState.user) {
            this.user = ctx.nuxtState.user
        }
        if (process.browser && !this.user && this.token) {
            this.fetchUser()
        }
    }

    /**
    * Use this method to send otp request
    */
    requestOtp(phoneNumber) {
        return this.axios.$post('/auth/otp', { phoneNumber })
    }

    /**
    * Use this method to verify otp response
    */
    async verifyOtp(phoneNumber, otp) {
        const { token, user } = await this.axios.$post('/auth/otp/verify', { phoneNumber, otp })
        this.setToken(token)
        this.user = user
        this.storage.setCookie(COOKIE_TOKEN, token)
        return user
    }

    logout() {
        this.user = null
        this.storage.removeCookie('token')
    }

    async fetchUser() {
        const user = await this.axios.$get('/auth/user')
        this.user = user
        return user
    }

    setToken (token) {
        this.axios.defaults.headers.common.Authorization = 'Bearer ' + token
    }

    get token () {
        return this.axios.defaults.headers.common.Authorization.slice(7).trim()
    }
}

export default async function (ctx, inject) {
    const auth = Vue.observable(new Auth(ctx))
    if (process.server && auth.token) {
        ctx.ssrContext.nuxt.user = await auth.fetchUser().catch(() => null)
    }
    inject('auth', auth)
}
