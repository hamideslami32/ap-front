import {extend} from 'vee-validate'


extend('passportNumber', {
    validate(value) {
        return /^(?!^0+$)[a-zA-Z0-9]{6,9}$/.test(value)
    },
    message: 'شماره پاسپورت را صحیح وارد کنید'
})
