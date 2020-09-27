import {extend} from 'vee-validate'
import {toLatin} from '~/plugins/numbers'

extend('nationalCode', {
    validate(value) {
        const common = [
            '0000000000',
            '1111111111',
            '2222222222',
            '3333333333',
            '4444444444',
            '5555555555',
            '6666666666',
            '7777777777',
            '8888888888',
            '9999999999'
        ]

        value = value = toLatin(value)

        if (!/^\d{10}$/.test(value))
            return false

        if(common.includes(value)) {
            return false
        }
        var check = +value[9]
        var sum = Array(9).fill().map((_, i) => +value[i] * (10 - i)).reduce((x, y) => x + y) % 11
        return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)
    },
    message: 'کد ملی را صحیح وارد کنید'
})