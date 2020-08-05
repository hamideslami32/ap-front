<template functional>
    <div class="field text-3" :class="[data.class, data.staticClass]">
        <span class="field__title">{{ props.title }}</span>
        <span class="field__spacer" />
        <span class="field__value">{{ props.value }}
            <slot />
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
            width: 15px;
            height: 15px;
            position: relative;
            text-align: center;
            transform: rotate(20deg);
            margin-right: 10px;
            border-radius: 1px;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 15px;
                width: 15px;
                background: $primary;
                transform: rotate(135deg);
                border-radius: 1px;
            }

            .tick{
                display: inline-block;
                transform: rotate(25deg);
                height: 9px;
                width: 5px;
                border-bottom: 2px solid #fff;
                border-right: 2px solid #fff;
                margin-right: 1px;
                margin-bottom: 2px;
            }
        }
    }
</style>