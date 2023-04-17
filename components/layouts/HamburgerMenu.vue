<template functional>
    <span class="hamburger-menu" :class="[data.class, data.staticClass]">
        <span />
        <span />
        <span />
    </span>
</template>

<style lang="scss">
    .hamburger-menu {
        > span {
            width: 24px;
            height: 2px;

            background-color: #222222;
            border-radius: 5px;
            margin-bottom: 5px;
            display: block;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &.white > span {
            background-color: $white;
        }
    }
</style>
