import Vue from 'vue'
import ABtn from '@/components/ui/buttons/ABtn'

const status = [
    {color: 'primary', name: 'new', fa: 'جدید'},
    {color: 'secondary', name: 'pending', fa: 'در حال انتظار'},
    {color: 'success', name: 'paid', fa: 'پرداخت شده'},
    {color: 'danger', name: 'failed', fa: 'لغو شده'},
    {color: 'info', name: 'skipped', fa: 'تست'},
    {color: 'info', name: 'refunded', fa: 'استرداد شده'}
]

Vue.component('a-btn', ABtn)

if (process.browser) {
    const FastClick = require('fastclick')
    new FastClick(document.body)
}

Vue.prototype.$translate = function(x) {
    if (typeof x === 'string') return x
    return x.fa || x.en || Object.values(x).filter(Boolean)[0] || ''
}

Vue.prototype.$statusChecker = function(x) {
    return status.find(item => item.name === x) || {}
}

Vue.filter('translate', Vue.prototype.$translate)

Vue.filter('duration', (x, text) => {
    const h = Math.floor(x / 60)
    const m = x % 60
    return (text ? `${h ? h + ' ساعت' : ''} ${m ? m + ' دقیقه' : ''}` : `${h ? h + 'h' : ''} ${m ? m + 'm' : ''}`).trim()
})

export default function(ctx, inject) {
    inject('staticUrl', (url) => {
        const baseURL = ctx.$config.STATIC_URL.replace(/\/+$/, '')
        return (baseURL + '/' + url.replace(/^\/+/, '')).trim()
    })
}
