import {extend} from 'vee-validate'


extend('iranianPassport', {
    validate(value) {
        return /[a-zA-Z]{1}[0-9]{7,8}+$/.test(value)
    },
    message: '{_field_} را صحیح وارد نمایید'
})