import dayjs from 'dayjs'

export default {
    props: {
        jalaali: {
            type: Boolean,
            default: true
        },

        minDate: {
            default() {
                return dayjs().toDate()
            }
        },

        maxDate: {
            default() {
                return dayjs().add(1, 'year').toDate()
            }
        },

        /**
         * A function that returns classes for day blocks
         * @param day object like { day: moment, classes: {} }
         * @param a function that returns classes (day, defaultClassGen) => defaultClassGen(day) : Object
         */
        dayClasses: {
            type: Function,
            default: (day, dcg) => dcg(day)
        }
    },

    computed: {
        isMobile() {
            return true // this.$device.isMobile
        },
        calendarType() {
            return this.jalaali ? 'jalali' : 'gregory'
        },
        calendarLocale() {
            return this.jalaali ? 'fa' : 'en'
        }
    },

    methods: {
        weekday(i) {
            return this.dayjs().day(i + (this.jalaali ? 5 : 0)).format('ddd').slice(0, this.jalaali ? 1 : 2)
        },
        dayjs(a) {
            return dayjs(a, { calendar: this.calendarType, locale: this.calendarLocale })
        }
    }
}
