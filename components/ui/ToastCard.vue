<template>
    <portal to="toast">
        <div class="toast-card mt-2" :class="variant">
            <slot />
        </div>
    </portal>
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
        background: map_get($grays, '900');

        &.light {
            background: map_get($grays, '800');
        }
    }
</style>
