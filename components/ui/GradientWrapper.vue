<template functional>
    <span class="gradient-wrapper" :class="[data.class, data.staticClass]">
        <slot />
    </span>
</template>

<script>
export default {
    name: 'GradientWrapper',
    functional: true
}
</script>

<style lang="scss" scoped>
    .gradient-wrapper {
        position: relative;
        border-radius: 5px;
        display: inline-block;

        &:after {
            content: '';
            position: absolute;
            background: linear-gradient(180deg, map_get($grays, '200') 57.81%, $secondary 100%);
            left: -1px;
            right: -1px;
            bottom: -1px;
            top: -1px;
            border-radius: 5px;
        }
    }
</style>