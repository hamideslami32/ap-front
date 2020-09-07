import Vue from 'vue'

const renderIcon = (h, name, cl, ...options) => h('svgicon', { props: { name }, staticClass: cl, ...options })

export default (ctx, inject) => {
    window.onNuxtReady(() => {
        const h = ctx.app.router.app.$createElement
        const bvToast = ctx.app.router.app.$bvToast

        bvToast.alert = function(message) {
            const toast = this.toast([
                h('div', {
                    staticClass: 'd-flex align-items-center'
                }, [
                    renderIcon(h, 'notifications', 'ml-2'),
                    message,
                    h('span', {
                        staticClass: 'mr-auto confirm-btn',
                        on: {
                            click: () => {
                                this.hide()
                            }
                        }
                    }, ['متوجه شدم'])
                ])
            ], {
                variant: 'danger',
                toastClass: 'toast--no-header toast-alert'
            })
            return toast
        }

        Vue.prototype.$toast = bvToast
    })
}
