<template functional>
    <div class="button-wrapper d-flex align-items-center justify-content-center" :class="[data.class, data.staticClass]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'BtnWrapper'
}
</script>

<style lang="scss" scoped>
    .button-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 55px;
        padding-bottom: 1rem;
        text-align: center;
        direction: rtl;
        background: linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, rgba(245, 245, 245, 0.5) 28.13%, #f5f5f5 82.81%);

        /deep/ .btn {
            min-width: 120px;
            height: 40px;
        }

    }
</style>
