<template>
    <header class="header">
        <hamburger-menu />
        <logo />
        <svgicon name="notifications" width="30" class="header__icon" height="30" />
    </header>
</template>

<script>
import Logo from '~/components/logo/Logo'
import HamburgerMenu from '~/components/layouts/HamburgerMenu'

export default {
    components: {
        Logo,
        HamburgerMenu
    }
}
</script>

<style lang='scss' scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: $body-bg;
    height: 60px;
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
}
</style>
