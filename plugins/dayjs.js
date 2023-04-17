import Vue from 'vue'
import dayjs from 'dayjs'
import jalaliDay from 'jalaliday'

dayjs.extend(jalaliDay)
dayjs.locale('fa')
dayjs.calendar('jalali')

dayjs.auto = function(str, format, ...args) {
    const year = parseInt(str.slice(0, 4), 10)
    const jalali = year < 1700
    format = typeof format === 'string' ? { format } : format
    return dayjs(str, {
        ...format,
        jalali,
        calendar: jalali ? 'jalali' : 'gregory'
    }, ...args)
}

Vue.prototype.$dayjs = dayjs
