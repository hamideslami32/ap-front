<template functional>
    <div class="field text-3" :class="[data.class, data.staticClass]">
        <span class="field__title">{{ props.title }}</span>
        <span class="field__spacer" />
        <span class="field__value">
            <slot>
                {{ props.value }}
            </slot>
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
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
    .field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: map-get($grays, '250');
        border: 1px solid map_get($grays, '600');
        border-radius: 10px;
        padding: 14px 20px;

        &__title {
            color: map_get($grays, '700');
        }

        &__value {
            color: map_get($grays, '900');
            font-weight: 500;
        }

        &__spacer {
            flex-grow: 1;
        }
    }
</style>
