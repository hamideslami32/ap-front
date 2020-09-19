import Vue from 'vue'
import ABtn from '@/components/ui/buttons/ABtn'

Vue.component('a-btn', ABtn)

if (process.browser) {
    const FastClick = require('fastclick')
    new FastClick(document.body)
}

Vue.prototype.$staticUrl = function(url) {
    const baseURL = process.env.STATIC_URL.replace(/\/+$/, '')
    return (baseURL + '/' + url.replace(/^\/+/, '')).trim()
}

Vue.prototype.$translate = function(x) {
    if (typeof x === 'string') return x
    return x.fa || x.en || Object.values(x).filter(Boolean)[0] || ''
}

Vue.filter('translate', Vue.prototype.$translate)

Vue.filter('duration', (x, text) => {
    const h = Math.floor(x / 60)
    const m = x % 60
    return (text ? `${h ? h + ' ساعت' : ''} ${m ? m + ' دقیقه' : ''}` : `${h ? h + 'h' : ''} ${m ? m + 'm' : ''}`).trim()
})
