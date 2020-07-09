<template functional>
    <span :class="[data.class, data.staticClass]" class="slug en" :style="{ width: props.width ? props.width + 'px' : 'auto' }"><slot /></span>
</template>

<style lang="scss" scoped>
.slug {
    display: inline-block;
    vertical-align: middle;
    background: rgba(71, 32, 134, 0.1);
    border: 1px solid $primary;
    color: $primary;
    font-size: 11px;
    padding: 3px 5px;
    border-radius: 100px;
    font-weight: 600;
    text-align: center;
}
</style>