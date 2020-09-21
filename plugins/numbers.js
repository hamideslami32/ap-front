import Vue from 'vue'

const AR_NUMBERS = [
    '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹',
    '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'
]

export const toLatin = function(v) {
    return (v || '').replace(/[۰-۹٠-٩]/g, w => AR_NUMBERS.indexOf(w) % 10)
}

const toArabic = function(v) {
    return (v || '').replace(/[0-9]/g, w => AR_NUMBERS[w])
}

const transformInputToLatin = (el, onlyNumber = false) => {
    let value = toLatin(el.value)
    if (onlyNumber) {
        value = value.replace(/[^0-9]/g, '')
    }
    if (el.value !== value) {
        el.value = value
        el.dispatchEvent(new Event('input'))
    }
}

Vue.directive('localize-number', {
    bind(el, bindings) {
        const onlyNumber = bindings.modifiers.only
        if (el.tagName !== 'INPUT') {
            el = el.querySelector('input')
        }
        if (!el) return
        el.addEventListener('input', ({ target }) => {
            transformInputToLatin(target, onlyNumber)
        })
    }
})

Vue.filter('localizeNumber', (x, en) => {
    if (en) return x
    const a = '۰۱۲۳۴۵۶۷۸۹'
    return String(x).replace(/\d/ig, v => a[v])
})

Vue.filter('ordinal', (x) => {
    const a = [
        'صفرم',
        'اول',
        'دوم',
        'سوم',
        'چهارم',
        'پنجم',
        'ششم',
        'هفتم',
        'هشتم',
        'نهم',
        'دهم',
        'یازدهم',
        'دوازدهم',
        'سیزدهم',
        'چهاردهم'
    ]
    return a[x] || x
})

const separateNumber = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

Vue.filter('separateNumber', separateNumber)

export default {
    toLatin,
    toArabic,
    separateNumber,
    transformInputToLatin
}
