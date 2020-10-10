import {extend} from 'vee-validate'

extend('latinWord', {
    validate(value) {
        return /^[a-zA-Z\s]+$/.test(value)
    },
    message: '{_field_} را به صورت لاتین وارد نمایید',
    computesRequired: true

})