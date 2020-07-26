<template>
    <div>
        <form action="#">
            <tabs v-model="search.type" class="mb-3" :tabs="tabs" />
            <input-pair class="mb-3">
                <flight-destination-picker v-model="search.origin" title="مبدا" />
                <flight-destination-picker v-model="search.destination" title="مقصد" />
            </input-pair>
            <a-datepicker
                v-model="date"
                class="date-input-pair mb-3"
                :jalaali.sync="jalaaliDatepicker"
                :range.sync="isDatepickerRange"
            >
                <template v-slot:before="{ on, value }">
                    <span class="date-input-pair" dir="rtl">
                        <form-input
                            label="تاریخ رفت"
                            icon="calendar"
                            :value="value[0] ? value[0].format('dddd DD MMMM YY') : null"
                            readonly
                            v-on="on"
                        />
                        <form-input
                            label="تاریخ برگشت"
                            :value="value[1] ? value[1].format('dddd DD MMMM YY') : null"
                            readonly
                            data-datepicker="1"
                            v-on="on"
                        />
                    </span>
                </template>
                <template v-slot="{ open, value }">
                    <form-input
                        label="تاریخ رفت"
                        icon="calendar"
                        :value="value[0] ? value[0].format('dddd DD MMMM YY') : null"
                        readonly
                        @focus="open(0)"
                    />
                    <form-input
                        label="تاریخ برگشت"
                        :value="value[1] ? value[1].format('dddd DD MMMM YY') : null"
                        data-datepicker="1"
                        readonly
                        @focus="open(1)"
                    />
                </template>
            </a-datepicker>
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
            >
                <multi-passenger :value="passengerCounts" />
            </passengers-picker>
            <search-button @click.prevent="startSearch" />
        </form>
    </div>
</template>


<script>
import FlightDestinationPicker from '~/components/flight/flight-search/FlightDestinationPicker'
import PassengersPicker from '~/components/flight/flight-search/PassengersPicker'
import SearchButton from '~/components/flight/flight-search/SearchButton'
import ADatepicker from '~/components/ui/date-picker/ADatepicker'
import Tabs from '~/components/ui/Tabs'
import FormInput from '~/components/ui/form/FormInput'
import {maxPassenger, childrenCheck, minAdult, infantCheck, translateFlightClass} from '~/utils/flightHelpers'
import InputPair from '~/components/ui/form/InputPair'
import MultiPassenger from '~/components/ui/MultiPassenger'

export default {
    components: {
        MultiPassenger,
        InputPair,
        FlightDestinationPicker,
        PassengersPicker,
        SearchButton,
        Tabs,
        FormInput,
        ADatepicker
    },
    data() {
        return {
            jalaaliDatepicker: true,
            tabs: [
                {value: 'roundTrip', name: 'رفت و برگشت'},
                {value: 'oneWay', name: 'یک طرفه'},
                {value: 'multiDestination', name: 'چند مسیره'}
            ],
            search: {
                type: 'roundTrip', // oneWay, roundTrip, multiDestination,
                origin: null, //object  i, title, value
                destination: null, //object  i, title, value
                departing: null,
                returning: null,
                adult: 1,
                child: 0,
                infant: 0,
                classType: 'economy' // business first
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
                const {adult, child, infant} = value
                if (!maxPassenger(adult, child, infant)) {
                    return
                }

                if (minAdult(adult, child, 'domestic')) {
                    this.search.adult = adult
                }

                if (childrenCheck('domestic', adult, child)) {
                    this.search.child = child
                }

                if (infantCheck(infant)) {
                    this.search.infant = infant
                }
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
        passengerCounts() {
            const allPassengerCount = this.search.adult + this.search.child + this.search.infant
            return `${allPassengerCount} مسافر${this.isInternational ? ', ' + translateFlightClass(this.search.classType) : ''}`
        }
    },
    watch: {
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
        startSearch() {
            // this.$toast('تست', 'success')
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
            this.$router.push({
                path: '/flights/search/' + [origin.id, destination.id].join('-'),
                query
            })
        }
    }
}
</script>

<style lang="scss">
    .date-input-pair {
        display: flex;

        > div {
            flex: 50% 1 0;

            &:first-child {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            &:last-child {
                border-right: 0;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
</style>
