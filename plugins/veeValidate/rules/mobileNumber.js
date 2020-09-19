import {extend} from 'vee-validate'
import {toLatin}  from '~/plugins/numbers'

const mobileNumberRegex = new RegExp('^(\\+98|0)?9\\d{9}$')

extend('mobileNumber', {
    validate(value) {
        const inputValue = toLatin(value)
        return mobileNumberRegex.test(inputValue)
    },
    message: 'شماره موبایل را صحیح وارد نمایید'
})
