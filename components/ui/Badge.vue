<template functional>
    <span :class="[data.class, data.staticClass]" class="badge en" :style="{ width: props.width ? props.width + 'px' : 'auto' }"><slot /></span>
</template>

<style lang="scss" scoped>
.badge {
    display: inline-block;
    vertical-align: middle;
    background: rgba(71, 32, 134, 0.1);
    border: 1px solid $primary;
    color: $primary;
    font-size: 85%;
    padding: 4px 7px;
    border-radius: 100px;
    font-weight: 600;
    text-align: center;
}
</style>
