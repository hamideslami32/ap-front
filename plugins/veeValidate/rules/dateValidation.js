import { extend } from 'vee-validate'
import {toLatin} from '~/plugins/numbers'

const dateValidation = new RegExp(/^(\d{4})\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/)


const validation = (value) => {
    const data = value.split('-')
    const translateData = data.map(item => toLatin(item))
    const date = translateData.join('/')
    return dateValidation.test(date)
}


extend('date', {
    validate(value) {
        return validation(value)
    },
    message: 'تاریخ وارد شده صحیح نمیباشد'
})