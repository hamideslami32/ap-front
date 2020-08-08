import Vue from 'vue'

const COOKIE_TOKEN = 'token'
const UNAUTH_REDIRECT = '/login'

const routeOption = (route, key) => route.matched.some(m => {
    if (process.browser) {
        return Object.values(m.components).some(component => component.options[key])
    }
    return Object.values(m.components).some(component =>
        Object.values(component._Ctor).some(ctor => ctor.options && ctor.options[key]))
})

class Auth {
    constructor(ctx) {
        this.axios = ctx.app.$axios
        this.storage = ctx.$storage
        this.router = ctx.app.router
        this.user = null
        this.showModal = false
    }

    async init(ctx) {
        const token = this.storage.getCookie(COOKIE_TOKEN)
        if (token) {
            this.setToken(token)
        }

        if (process.browser) {
            if (ctx.nuxtState.user) {
                this.user = ctx.nuxtState.user
            }
            if (!this.user && this.token) {
                await this.fetchUser()
            }
            this.router.beforeResolve((t, f, next) => {
                next(this.shouldRedirect(t) ? '/login' : undefined)
            })
        }

        if (process.server) {
            if (this.token) {
                const shouldFetchFull = ctx.route.name === 'profile'
                ctx.ssrContext.nuxt.user = await this.fetchUser(shouldFetchFull).catch(() => null)
            }
            if (this.shouldRedirect(ctx.route)) {
                ctx.redirect(UNAUTH_REDIRECT)
            }
        }

    }

    shouldRedirect(route) {
        return routeOption(route, 'auth') && !this.user
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
        const { token, user, expiration } = await this.axios.$post('/auth/otp/verify', { phoneNumber, otp })
        this.setToken(token)
        this.user = user
        this.storage.setCookie(COOKIE_TOKEN, token, {
            expires: new Date(expiration)
        })
        this.showModal = false
        return user
    }

    async logout(redirect = '/') {
        if (routeOption(this.router.currentRoute, 'auth')) {
            await this.router.push(redirect)
            await new Promise(resolve => setTimeout(resolve, 200))
        }
        this.user = null
        this.storage.removeCookie('token')
    }

    async fetchUser(full) {
        const user = await this.axios.$get('/auth/user', {
            params: {
                full: full * 1
            }
        })
        this.user = user
        return user
    }

    patchUser(data) {
        return this.axios.$patch('/auth/user', data).then(user => {
            this.user = user
            return user
        })
    }

    setToken(token) {
        this.axios.defaults.headers.common.Authorization = 'Bearer ' + token
    }

    get token() {
        const { Authorization } = this.axios.defaults.headers.common
        return Authorization ? Authorization.slice(7).trim() : null
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            if (this.user) {
                return resolve(this.user)
            }
            this.showModal = true
            this._resolve = resolve
            this._reject = reject
        })
    }
}

export default async function(ctx, inject) {
    const auth = Vue.observable(new Auth(ctx))
    await auth.init(ctx)
    inject('auth', auth)
}
