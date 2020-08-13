<template>
    <div class="date-card mb-2">
        <div class="date-card__header">
            <span class="text-1 text-gray-700">بدون توقف</span>
            <span>image</span>
        </div>
        <div class="date-card__time d-flex align-items-center justify-content-between">
            <span class="text-weight-500 text-3 text-gray-900">09:00</span>
            <span class="text-weight-500 text-3 text-gray-900">15:20</span>
        </div>
        <div class="date-card__line my-2" />
        <p class="text-center text-1 text-weight-500 text-gray-700 mb-1">
            2h 30m
        </p>
    </div>
</template>

<script>
export default {
    name: 'DateCard'
}
</script>

<style lang="scss" scoped>
    .date-card {
        background: $white;
        border: 1px solid map_get($gray-colors, 'gray-400');
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        padding: 5px 10px;
        border-radius: 10px;

        &__header {
            margin: 0 -5px;
            padding: 5px;
            background: map_get($gray-colors, 'gray-200');
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            border-radius: 8px;
        }

        &__line {
            width: 100%;
            border: 1px dashed map_get($gray-colors, 'gray-500');
            position: relative;
            padding: 0 5px;
            &:before , &:after {
                position: absolute;
                content: '';
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: $white;
                border: 1px solid map_get($gray-colors, 'gray-400');
                top: -5px;
                bottom: 0;
            }

            &:before {
                left: -1px;
            }

            &:after {
                right: -1px;
            }
        }

        p {
            font-family: 'Baloo Thambi 2', Dana, Tahoma, serif;
        }
    }
</style>