import {extend} from 'vee-validate'
import { email } from 'vee-validate/dist/rules'


extend('email', {
    ...email,
    message: '{_field_} را صحیح وارد نمایید'
})