import dayjs from 'dayjs'

export default {
    props: {
        jalaali: {
            type: Boolean,
            default: true
        },

        minDate: {
            type: [Date, String, Object, Number],
            default() {
                return dayjs().calendar(this.jalaali ? 'jalali' : 'gregorian')
            }
        },

        maxDate: {
            type: [Date, String, Object, Number],
            default() {
                return dayjs().add(1, 'year').calendar(this.jalaali ? 'jalali' : 'gregorian')
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
            return this.$device.isMobile
        },
        calendarType() {
            return this.jalaali ? 'jalali' : 'gregorian'
        },
        calendarLocale() {
            return this.jalaali ? 'fa' : 'en'
        }
    },

    methods: {
        weekday(i) {
            return this.dayjs().day(i).format('ddd')[0]
        },
        dayjs(a) {
            return dayjs(a, { calendar: this.calendarType, locale: this.calendarLocale })
        }
    }
}
