import {extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'

extend('required', {
    ...required,
    message: '{_field_} اجباری میباشد'
})