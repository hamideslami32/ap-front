<template>
    <div class="spinner">
        <lottie-animation
            path="loading1.json"
        />
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .spinner {
        position: fixed;
        margin-top: 114px;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        z-index: 1000;
        background-color: rgba(255,255,255, 0.9);

        @include media-breakpoint-up(md) {
            top: calc(50% + 55px);
            margin: 0 auto;
            transform: translateY(-50%);
            height: calc(80vh - 114px);
            max-width: 450px;
        }
    }
</style>
