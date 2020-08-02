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
                <div v-for="i in 4" :key="i" class="time-item">
                    <svgicon name="user" width="30" height="30" />
                    <span>بعدظهر</span>
                    <small>(۱۲ ظهر الی ۱۸)</small>
                </div>
            </b-card-body>
        </filter-panel>
        <filter-panel title="ایرلاین ها">
            <group-checkbox v-model="airlines" />
        </filter-panel>
        <filter-panel title="انتخاب فرودگاه">
            <group-checkbox v-model="airports" />
        </filter-panel>
        <filter-panel title="کلاس پروازی">
            <b-form-group class="en font-weight-medium">
                <b-form-radio
                    v-model="classSelect"
                    class="mb-2"
                    :class="{ active: classSelect === 'economy' }"
                    checked="flightClass"
                    name="flight_class"
                    value="economy"
                >
                    Economy
                </b-form-radio>
                <b-form-radio
                    v-model="classSelect"
                    class="mb-2"
                    :class="{ active: classSelect === 'business' }"
                    checked="flightClass"
                    name="flight_class"
                    value="business"
                >
                    Business
                </b-form-radio>
                <b-form-radio
                    v-model="classSelect"
                    class="mb-2"
                    checked="flightClass"
                    name="flight_class"
                    value="first"
                    :class="{ active: classSelect === 'first' }"
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
    priceRange: [null, null]
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
            localValue: Object.assign(initialFilters(), cloneDeep(this.value)),
            selected: [],// Must be an array reference!
            airlines: [
                {title: 'آلیتالیا', value: 'alita', price: '3640000'},
                {title: 'ایرفرانس', value: 'airFrance', price: '3640000'},
                {title: 'کاال ام', value: 'klm', price: '3640000'},
                {title: 'ترکیش ایرلاین', value: 'turkishAirlines', price: '3640000'}
            ],
            airports: [
                {value: 'CDG', title:'شارل دوگل', code: true},
                {value: 'ORY', title:'اورلی', code: true},
                {value: 'BVA', title:'باووایس', code: true}
            ],
            classSelect: 'economy'
        }
    },
    computed: {
        priceRangeStep() {
            const [min, max] = this.options.priceRange
            return Math.floor((max - min) / 100)
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

            &:focus, &:hover, &:active {
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
