import Vue from 'vue'
import dayjs from 'dayjs'
import jalaliDay from 'jalaliday'

dayjs.extend(jalaliDay)
dayjs.locale('fa')
dayjs.calendar('jalali')

dayjs.auto = function(str, format, ...args) {
    return dayjs(str, {
        ...format,
        calendar: 'gregory'
    })
}

Vue.prototype.$dayjs = dayjs
