<template>
    <div class="time-picker px-2 py-3" :class="{ 'time-picker--isDestination': isDestination }">
        <p class="text-2 text-gray-900 mb-2 text-weight-500">
            {{ isDestination ? 'پرواز برگشت' : 'پرواز رفت' }}
        </p>
        <div class="time-picker__info mb-2">
            <span class="text-primary text-2 text-weight-600">ICA - CDG</span>
            <span class="text-2 text-gray-800 text-weight-400">۲۰ تیر ۹۹</span>
        </div>
        <slot />
    </div>
</template>

<script>

export default {
    name: 'FlightTimePicker',
    props: {
        isDestination: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .time-picker {
        flex: 1;
        overflow-y: scroll;
        height: calc(100vh - 126px);
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }

        &--isDestination {
            background: map_get($gray-colors, 'gray-500');
            text-align: left;
        }


        &__info {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px;
            background: #f9f9f9;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            border-radius: 10px;

        }
    }
</style>