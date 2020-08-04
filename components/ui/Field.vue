<template functional>
    <div class="field text-3" :class="[data.class, data.staticClass]">
        <span class="field__title">{{ props.title }}</span>
        <span class="field__spacer" />
        <span class="field__value">{{ props.value }}
        </span>
        <span v-show="props.active" class="star">
            <span class="tick" />
        </span>
    </div>
</template>

<script>
export default {
    name: 'Field',
    functional: true,
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        active:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .field {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f9f9f9;
        border: 1px solid map_get($gray-colors, 'gray-400');
        border-radius: 10px;
        padding: 0 20px;

        &__title {
            color: map_get($gray-colors, 'gray-700');
        }

        &__value {
            color: map_get($gray-colors, 'gray-900');
            font-weight: 500;
        }

        &__spacer{
            flex-grow: 1;
        }

        .star {
            display: inline-block;
            background: $primary;
            width: 18px;
            height: 18px;
            position: relative;
            text-align: center;
            transform: rotate(20deg);
            margin-right: 10px;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 18px;
                width: 18px;
                background: $primary;
                transform: rotate(135deg);
            }

            .tick{
                display: inline-block;
                transform: rotate(25deg);
                height: 11px;
                width: 7px;
                border-bottom: 2px solid $white;
                border-right: 2px solid $white;
                margin-right: 2px;
            }
        }
    }
</style>