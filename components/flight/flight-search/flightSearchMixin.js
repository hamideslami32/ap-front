import isEqual from 'lodash/isEqual'

const translateFlightClass = (en) => ({
    economy: 'اکونومی',
    business: 'بیزنس',
    first: 'فرست'
}[en] || '')

export default {
    data() {
        return {
            jalaaliDatepicker: true,
            search: {
                type: 'RT', // OW, RT, MD,
                origin: null, //object  i, title, value
                destination: null, //object  i, title, value
                departing: null,
                returning: null,
                adult: 1,
                child: 0,
                infant: 0,
                classType: null // business first
            }
        }
    },
    computed: {
        isInternational() {
            const {origin, destination} = this.search
            return origin && destination && (!origin.isDomestic || !destination.isDomestic)
        },
        passengers: {
            get() {
                return {
                    adult: this.search.adult,
                    child: this.search.child,
                    infant: this.search.infant
                }
            },
            set(value) {
                Object.assign(this.search, value)
            }
        },
        date: {
            get() {
                return [this.search.departing, this.search.returning]
            },
            set(x) {
                this.search.departing = x[0]
                this.search.returning = x[1]
            }
        },
        isDatepickerRange: {
            get() {
                return this.search.type === 'RT'
            },
            set(x) {
                this.search.type = x ? 'RT' : 'OW'
            }
        },
        passengersCount() {
            const { adult, child, infant } = this.search
            return adult + child + infant
        },
        classTypeText() {
            return translateFlightClass(this.search.classType)
        }
    },

    watch: {
        'isInternational': {
            immediate: true,
            handler(x) {
                if (!x) {
                    this.search.classType = null
                } else if (x && !this.search.classType) {
                    this.search.classType = 'economy'
                }
            }
        },
        'search.type'(x) {
            if (x === 'OW') {
                this.search.returning = null
            }
        },
        'search.origin'(t) {
            const {destination} = this.search
            if (t && destination && t.id === destination.id) {
                this.search.destination = null
            }
        },
        'search.destination'(t) {
            const {origin} = this.search
            if (t && origin && t.id === origin.id) {
                this.search.origin = null
            }
        },

        '$flight.session': {
            deep: true,
            immediate: true,
            handler(t, f) {
                if (!t || !t.adult || isEqual(t, f)) return
                this.search = {
                    type: {
                        1: 'OW',
                        2: 'RT'
                    }[t.routes.length] || 'MD', // OW, RT, MD,
                    origin: t.routes[0].origin, //object  i, title, value
                    destination: t.routes[0].destination, //object  i, title, value
                    departing: this.$dayjs(t.routes[0].date),
                    ...(t.routes.length === 2 ? {
                        returning: this.$dayjs(t.routes[1].date)
                    }: {}),
                    adult: t.adult,
                    child: t.child,
                    infant: t.infant,
                    classType: t['class'] // business first
                }
            }
        }
    },

    methods: {
        startSearch(cache = true) {
            cache && this.$storage.setLocalStorage('lastSearch', this.search)
            try {
                this.validate()
            } catch (e) {
                this.$toast.alert(this.$createElement('span', {}, e.message), {
                    solid: false,
                    autoHideDelay: 10000
                })
                return
            }
            const {type, origin, destination, departing, returning, adult, child, infant, classType} = this.search
            const query = {
                departing: departing.calendar('jalali').format('YYYY-MM-DD'),
                returning: type === 'OW' || !returning ? undefined : returning.calendar('jalali').format('YYYY-MM-DD'),
                adult,
                child: child || undefined,
                infant: infant || undefined,
                business: classType === 'business' ? null : undefined,
                first: classType === 'first' ? null : undefined
            }
            return this.$router.push({
                path: '/flights/search/' + [origin.id, destination.id].join('-'),
                query
            })
        },

        validate() {
            const {origin, destination, departing, adult, type, returning} = this.search
            if (!origin) {
                throw new Error('لطفا مبدا را مشخص نمایید')
            }
            if (!destination) {
                throw new Error('لطفا مقصد را مشخص نمایید')
            }
            if (!departing) {
                throw new Error('لطفا تاریخ رفت را مشخص نمایید')
            }
            if (!adult) {
                throw new Error('تعداد بزرگسال باید بیشتر از ۱ باشد')
            }
            if (type === 'RT' && !returning) {
                throw new Error('لطفا تاریخ برگشت را مشخص نمایید')
            }

        },

        getLastSearch() {
            const search = this.$storage.getLocalStorage('lastSearch')
            if (!search) {
                return null
            }
            search.departing = search.departing && this.$dayjs(search.departing)
            search.returning = search.returning && this.$dayjs(search.returning)

            try {
                const { departing, returning } = search
                if ((departing && !departing.isAfter(new Date())) || (returning && !returning.isAfter(new Date()))) {
                    search.departing = null
                    search.returning = null
                }
                search.type = search.returning ? 'RT' : 'OW'
            } catch (e) {
                this.$storage.removeLocalStorage('lastSearch')
            }

            return search
        }
    }
}
