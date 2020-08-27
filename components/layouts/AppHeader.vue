<template>
    <header class="app-header">
        <portal-target name="header-right">
            <hamburger-menu @click="isNavOpen = !isNavOpen" />
        </portal-target>
        <portal-target name="header">
            <nuxt-link to="/">
                <logo />
            </nuxt-link>
        </portal-target>
        <svgicon name="notifications" width="30" class="header__icon" height="30" />
        <sidebar-nav :opened="isNavOpen" />
    </header>
</template>

<script>
import Logo from '~/components/logo/Logo'
import HamburgerMenu from '~/components/layouts/HamburgerMenu'
import SidebarNav from '~/components/layouts/SidebarNav'
import {PortalTarget} from 'portal-vue'

export default {
    components: {
        Logo,
        HamburgerMenu,
        PortalTarget,
        SidebarNav
    },
    data() {
        return {
            isNavOpen: false
        }
    }
}
</script>

<style lang='scss'>
    .app-header {
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

    .transparent-header .app-header {
        border-bottom: 0;
        color: $white;
        background-color: transparent;

        .hamburger-menu > span {
            background-color: $white;
        }
    }

    .transparent-header .mobile-layout {
        padding-top: 0;
    }


    a {
        color: $white;
        &:hover, &:focus, &:active {
            color: $white;

        }
    }
</style>
