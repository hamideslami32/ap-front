<template>
    <div class="toast-card mt-2" :class="variant">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ToastCard',
    props: {
        variant: {
            type: String,
            required: false,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .toast-card {
        padding: 5px;
        border-radius: 5px;
        background: map_get($grays, '1000');

        &.light {
            background: map_get($grays, '900');
        }
    }
</style>