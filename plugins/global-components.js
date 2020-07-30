import Vue from 'vue'
import {BButton} from 'bootstrap-vue'

Vue.component('a-btn', {
    functional: true,
    render(h, ctx) {
        const { 'wrapper-class': wrapperClass, ...attrs } = ctx.data.attrs || {}
        return h('span', {
            staticClass: 'btn-wrapper',
            class: wrapperClass
        }, [h(BButton, {
            class: [ctx.data.class, ctx.data.staticClass],
            attrs: attrs,
            props: attrs,
            on: ctx.listeners
        }, ctx.slots().default)])
        // return BButton.render(h, ctx)
    }
})

if (process.browser) {
    const FastClick = require('fastclick')
    new FastClick(document.body)
}
