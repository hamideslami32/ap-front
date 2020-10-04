<template functional>
    <span 
        class="hamburger-menu" 
        :class="[data.class, data.staticClass]"
        v-bind="data.attrs"
        v-on="listeners"
    >
        <span />
        <span />
        <span />
    </span>
</template>

<style lang="scss">
    .hamburger-menu {
        z-index: 2;
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
        @include media-breakpoint-up(xl) {
            display: none;
        }
    }
</style>
