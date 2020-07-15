<template functional>
    <span class="hamburger-menu">
        <span />
        <span />
        <span />
    </span>
</template>

<style lang="scss">
    .hamburger-menu {
        > span {
            width: 24px;
            height: 3px;

            background-color: #222222;
            border-radius: 5px;
            margin-bottom: 4px;
            display: block;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
