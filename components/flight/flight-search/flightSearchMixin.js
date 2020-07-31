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
                type: 'roundTrip', // oneWay, roundTrip, multiDestination,
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
                return this.search.type === 'roundTrip'
            },
            set(x) {
                this.search.type = x ? 'roundTrip' : 'oneWay'
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
            if (x === 'oneWay') {
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
        }
    },

    methods: {
        startSearch(cache = true) {
            // this.$toast('تست', 'success')
            cache && this.$storage.setLocalStorage('lastSearch', this.search)
            const {type, origin, destination, departing, returning, adult, child, infant, classType} = this.search
            const query = {
                departing: departing.format('YYYY-MM-DD'),
                returning: type === 'oneWay' ? undefined : returning.format('YYYY-MM-DD'),
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

        getLastSearch() {
            const search = this.$storage.getLocalStorage('lastSearch')
            if (!search) {
                return null
            }
            search.departing = search.departing && this.$dayjs(search.departing)
            search.returning = search.returning && this.$dayjs(search.returning)
            return search
        }
    }
}
