<template>
    <div>
        <p class="mt-2 mb-3">
            مرتب سازی بر اساس
        </p>
        <div class="sort">
            <button
                v-for="item in items"
                :key="item.value"
                class="btn"
                :class="{ active: item.value === value }"
                @click="$emit('input', item.value)"
            >
                {{ item.text }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FlightSort',
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            items: [
                { value: 'min_price', text: 'کمترین قیمت' },
                { value: 'max_price', text: 'بیشترین قیمت' },
                { value: 'min_duration', text: 'کوتاه‌ترین زمان' }
            ]
        }
    }
}
</script>

<style lang="scss">
    .sort {
        overflow: auto;
        white-space: nowrap;

        &::-webkit-scrollbar {
            display: none;
        }

        > button {
            width: 120px;
            height: 40px;
            background-color: map_get($grays, '100');
            border: 1px solid map_get($grays, '600');
            border-radius: 10px;
            color: map_get($grays, '800');
            transition: all ease-out 250ms;
            font-size: inherit;

            &:not(:first-child) {
                margin-right: 10px;
            }

            &:active, &.active {
                color: $primary;
                border-color: $primary;
                background-color: #e7def7;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
                font-weight: 600;
            }
        }
    }
</style>
