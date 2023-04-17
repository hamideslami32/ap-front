import Vue from 'vue'

export default (ctx, inject) => {
    const toast = (message, type) => {
        Vue.prototype.$nuxt.$bvToast.toast(message, {
            variant: type,
            toaster: 'b-toaster-bottom-center',
            solid: true
        })
    }
    inject('toast', toast)
}