<template>
    <div class="filter text-3 text-gray-600">
        <flight-sort v-model="value.sort" class="mb-4" />

        <p class="filter__title mt-2 mb-0">
            بازه قیمت بلیط (تومان)
        </p>
        <a-slider :min="options.priceRange[0]" :max="options.priceRange[1]" :step="priceRangeStep" class="mx-4 mb-2">
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
    </div>
</template>
<script>
import FlightSort from '~/components/flight/available/filter/FlightSort'
import ASlider from '~/components/ui/ASlider'
import FilterPanel from '~/components/flight/available/filter/FilterPanel'

export default {
    name: 'FlightFilter',
    components: {FilterPanel, ASlider, FlightSort},
    props: {
        value: {
            type: Object,
            required: true
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        priceRangeStep() {
            const [min, max] = this.options.priceRange
            return Math.floor((max - min) / 120)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
