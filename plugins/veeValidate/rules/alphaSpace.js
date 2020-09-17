import {extend} from 'vee-validate'


extend('alpha_spaces', {
    validate(value) {
        return /^[A-Za-z ]+$/.test(value)
    },
    message: '{_field_} را صحیح وارد نمایید'
})