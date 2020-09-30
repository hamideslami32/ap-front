import { extend } from 'vee-validate'
import {toLatin} from '~/plugins/numbers'
import dayjs from 'dayjs'

extend('date', {
    validate: (value) => {
        if (value instanceof Date || dayjs.isDayjs(value)) return true
        const date = toLatin(value).replace(/-/g, '/')
        return dayjs(date, 'YYYY/MM/DD', true).calendar('gregory').format('YYYY/MM/DD') === date
    },
    message: 'تاریخ وارد شده صحیح نمیباشد'
})

extend('age', {
    validate(value, args) {
        const age = dayjs().calendar('gregory').diff(dayjs(value).calendar('gregory'), 'year', true)
        const [min, max] = args.map(Number).sort((a, b) => a - b)
        return age >= min && age <= max
    },
    message: 'تاریخ وارد شده صحیح نمیباشد'
})
