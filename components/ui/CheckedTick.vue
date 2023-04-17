<template functional>
    <span class="checked-tick">
        <span />
    </span>
</template>

<style lang="scss">
.checked-tick {
    display: inline-block;
    background: $primary;
    width: 15px;
    height: 15px;
    position: relative;
    text-align: center;
    transform: rotate(20deg);
    margin-right: 10px;
    border-radius: 1px;
    vertical-align: middle;

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

    > span {
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
</style>
