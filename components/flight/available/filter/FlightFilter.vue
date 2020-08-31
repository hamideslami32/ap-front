<template>
    <div class="filter text-3 text-gray-600">
        <flight-sort v-model="localValue.sort" class="mb-4 px-2" />
        <div class="px-2">
            <p class="filter__title mt-2 mb-0">
                بازه قیمت بلیط (تومان)
            </p>
            <a-slider
                v-model="localValue.priceRange"
                :min="options.priceRange[0]"
                :max="options.priceRange[1]"
                :step="priceRangeStep"
                class="mx-2 mb-2"
            >
                <template #tooltip="{ value: tooltip }">
                    {{ tooltip | separateNumber }}
                </template>
            </a-slider>
        </div>

        <flight-time-filter v-model="localValue.departureFlightTime" title="پرواز رفت" />

        <flight-time-filter v-if="$flight.session.routes.length === 2" v-model="localValue.returningFlightTime" title="پرواز برگشت" />

        <flight-airline-filter v-model="localValue.airlines" :airlines="options.airlines" />

        <!--<panel title="کلاس پروازی">
            <b-form-group class="en font-weight-medium">
                <b-form-radio
                    v-model="localValue.flightClass"
                    class="mb-2 mx-1"
                    :class="{ active: localValue.flightClass === 'economy' }"
                    checked="flightClass"
                    name="flight_class"
                    value="economy"
                >
                    Economy
                </b-form-radio>
                <b-form-radio
                    v-model="localValue.flightClass"
                    class="mb-2 mx-1"
                    :class="{ active: localValue.flightClass === 'business' }"
                    checked="flightClass"
                    name="flight_class"
                    value="business"
                >
                    Business
                </b-form-radio>
                <b-form-radio
                    v-model="localValue.flightClass"
                    class="mb-2 mx-1"
                    checked="flightClass"
                    name="flight_class"
                    value="first"
                    :class="{ active: localValue.flightClass === 'first' }"
                >
                    First Class
                </b-form-radio>
            </b-form-group>
        </panel>-->

        <div class="py-4" />

        <div class="filter__actions">
            <a-btn wrapper-class="ml-2" variant="light" @click="clear">
                حذف فیلترها
            </a-btn>
            <a-btn variant="primary" @click="apply">
                تائید
            </a-btn>
        </div>
    </div>
</template>
<script>
import FlightSort from '~/components/flight/available/filter/FlightSort'
import ASlider from '~/components/ui/ASlider'
import cloneDeep from 'lodash/cloneDeep'
import FlightTimeFilter from '~/components/flight/available/filter/FlightTimeFilter'
import FlightAirlineFilter from '~/components/flight/available/filter/FlightAirlineFilter'

const initialFilters = () => ({
    sort: 'min_price',
    priceRange: [null, null],
    airlines: [],
    airports: [],
    departureFlightTime: [],
    returningFlightTime: [],
    flightClass: 'economy'
})

export default {
    components: {FlightAirlineFilter, FlightTimeFilter, ASlider, FlightSort},
    props: {
        options: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localValue: Object.assign(initialFilters(), cloneDeep(this.value)), // airlines - airports - flight time
            classSelect: 'economy'
        }
    },
    computed: {
        priceRangeStep() {
            const [min, max] = this.options.priceRange
            return Math.floor((max - min) / 100)
        },
        airlinesSelect: {
            get() {
                return this.localValue.airlines
            },
            set(value) {
                const index = this.localValue.airlines.indexOf(value)
                if (index >= 0) {
                    this.localValue.airlines.splice(index, 1)
                } else {
                    return this.localValue.airlines.push(value)
                }
            }
        },
        airportsSelect: {
            get() {
                return this.localValue.airports
            },
            set(value) {
                const index = this.localValue.airports.indexOf(value)
                if (index >= 0) {
                    this.localValue.airports.splice(index, 1)
                } else {
                    return this.localValue.airports.push(value)
                }
            }
        }
    },

    methods: {
        apply() {
            this.$emit('apply', cloneDeep(this.localValue), true)
        },
        clear() {
            this.$emit('apply', Object.assign(initialFilters()), true)
        },
        isInitialFilters(value) {
            return JSON.stringify(initialFilters()) === JSON.stringify(value)
        }
    }
}
</script>

<style lang="scss" scoped>
    .filter {
        &__actions {
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 20px;
            white-space: nowrap;

            .btn {
                min-width: 120px;
                height: 40px;
            }
        }
    }
</style>
