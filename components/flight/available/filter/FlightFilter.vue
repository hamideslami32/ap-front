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
            TEST
        </filter-panel>
        <filter-panel title="ایرلاین ها">
            TEST
        </filter-panel>
        <filter-panel title="انتخاب فرودگاه">
            TEST
        </filter-panel>
        <filter-panel title="کلاس پروازی">
            TEST
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

const initialFilters = () => ({
    sort: 'min_price',
    priceRange: [null, null]
})

export default {
    name: 'FlightFilter',
    components: {FilterPanel, ASlider, FlightSort},
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
            localValue: Object.assign(initialFilters(), cloneDeep(this.value))
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
</style>
