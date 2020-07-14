<template>
    <div class="reverse-btn">
        <div class="reverse-btn__holder">
            <svgicon class="reverse-btn__holder--icon" name="arrows-round" width="30" height="30" />
        </div>
    </div>
</template>

<script>
export default {}
</script>


<style lang="scss" scoped>
.reverse-btn {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    width: 40px;
    height: 40px;
    background: $backgroundColor;
    border-radius: 50%;

    &::before {
        content: '';
        width: 40px;
        height: 20px;
        border-top-left-radius: 90px;
        border-top-right-radius: 90px;
        background: transparent;
        position: absolute;
        left: 12px;
        transform: rotate(90deg);
        border: 1px solid #DDDDDD;
        border-bottom-style: none;
        top: 10px;
    }

    &::after {
        content: '';
        width: 40px;
        height: 20px;
        border-top-left-radius: 90px;
        border-top-right-radius: 90px;
        background: transparent;
        position: absolute;
        right: 12px;
        transform: rotate(-90deg);
        border: 1px solid #DDDDDD;
        border-bottom-style: none;
        top: 10px;
    }

    &__holder {
        background: $black;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
        line-height: 30px;

        &--icon {
            color: $white;
            display: inline-block;
            vertical-align: baseline;
        }
    }
}
</style>