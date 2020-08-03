<template>
    <div class="filter text-3 text-gray-600">
        <flight-sort v-model="localValue.sort" class="mb-4" />
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

        <filter-panel title="ساعت پرواز">
            <b-card-body class="d-flex justify-content-around px-2">
                <div
                    v-for="item in flightTime"
                    :key="item.id"
                    :class="{ 'active': item.id === localValue.flightTime }"
                    class="time-item"
                    @click="selectFlightTime(item.id)"
                >
                    <svgicon name="user" width="30" height="30" />
                    <span>{{ item.time }}</span>
                    <small>{{ item.tip }}</small>
                </div>
            </b-card-body>
        </filter-panel>
        <filter-panel title="ایرلاین ها">
            <group-checkbox v-model="airlinesSelect" :options="airlines" />
        </filter-panel>
        <filter-panel title="انتخاب فرودگاه">
            <group-checkbox v-model="airportsSelect" :options="airports" />
        </filter-panel>
        <filter-panel title="کلاس پروازی">
            <b-form-group class="en font-weight-medium">
                <b-form-radio
                    v-model="localValue.flightClass"
                    class="mb-2"
                    :class="{ active: localValue.flightClass === 'economy' }"
                    checked="flightClass"
                    name="flight_class"
                    value="economy"
                >
                    Economy
                </b-form-radio>
                <b-form-radio
                    v-model="localValue.flightClass"
                    class="mb-2"
                    :class="{ active: localValue.flightClass === 'business' }"
                    checked="flightClass"
                    name="flight_class"
                    value="business"
                >
                    Business
                </b-form-radio>
                <b-form-radio
                    v-model="localValue.flightClass"
                    class="mb-2"
                    checked="flightClass"
                    name="flight_class"
                    value="first"
                    :class="{ active: localValue.flightClass === 'first' }"
                >
                    First Class
                </b-form-radio>
            </b-form-group>
        </filter-panel>

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
import FilterPanel from '~/components/flight/available/filter/FilterPanel'
import cloneDeep from 'lodash/cloneDeep'
import GroupCheckbox from '~/components/ui/form/GroupCheckbox'

const initialFilters = () => ({
    sort: 'min_price',
    priceRange: [null, null],
    airlines: [],
    airports: [],
    flightTime: 1,
    flightClass: 'economy'
})

export default {
    name: 'FlightFilter',
    components: {GroupCheckbox, FilterPanel, ASlider, FlightSort},
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
            airlines: [
                {title: 'آلیتالیا', value: 'alita', price: '3640000'},
                {title: 'ایرفرانس', value: 'airFrance', price: '3640000'},
                {title: 'کاال ام', value: 'klm', price: '3640000'},
                {title: 'ترکیش ایرلاین', value: 'turkishAirlines', price: '3640000'}
            ],
            airports: [
                {value: 'CDG', title: 'شارل دوگل', code: true},
                {value: 'ORY', title: 'اورلی', code: true},
                {value: 'BVA', title: 'باووایس', code: true}
            ],
            classSelect: 'economy',
            flightTime: [
                {id: 1, time: 'صبح', tip: '(۱۲ صبح الی ۱۸)', icon: 'user'},
                {id: 2, time: 'بعدظهر', tip: '(۱۲ ظهر الی ۱۸)', icon: 'user'},
                {id: 3, time: 'عصر', tip: '(۱۲ عصر الی ۱۸)', icon: 'user'},
                {id: 4, time: 'شب', tip: '(۱۲ شب الی ۱۸)', icon: 'user'}
            ]
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
            this.$emit('apply', Object.assign(initialFilters(), {
                sort: this.localValue.sort
            }), true)
        },
        selectFlightTime(id) {
            this.localValue.flightTime = id
        }
    }
}
</script>

<style lang="scss" scoped>
    .filter {
        &__actions {
            position: absolute;
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

    .card-body {
        padding: 0;

        .time-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 15px 10px 10px 10px;
            background: #f9f9f9;
            border: 1px solid map_get($gray-colors, 'gray-400');
            border-radius: 10px;
            transition: all ease 250ms;

            svg {
                color: map_get($gray-colors, 'gray-700');
            }

            span {
                color: map_get($gray-colors, 'gray-800');
                font-size: 0.9em;
            }

            small {
                font-size: 9px;
                color: map_get($gray-colors, 'gray-700');
            }

            &:focus, &:active , &.active{
                background: #e7def7;
                box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
                border-color: $primary;

                span, svg, small {
                    color: $primary;
                }

                span {
                    font-weight: 500;
                }
            }
        }
    }

</style>
