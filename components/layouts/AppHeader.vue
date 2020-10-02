<template>
    <header class="app-header">
        <portal-target name="header-right">
            <hamburger-menu @click="toggleNavSidebar()" />
        </portal-target>
        <portal-target name="header">
            <nuxt-link to="/">
                <logo />
            </nuxt-link>
        </portal-target>
        <button v-if="$route.fullPath.match(/^\/(flights)?$/)" class="btn-raw">
            <svgicon name="notifications" width="30" class="header__icon" height="30" />
        </button>
        <button v-else class="btn-raw">
            <svgicon
                name="arrow-left"
                width="20"
                class="header__icon"
                height="20"
                @click="$router.back()"
            />
        </button>
        <sidebar-nav :opened="isNavOpen" @close="isNavOpen = false" />
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
    },
    methods: {
        toggleNavSidebar() {
            this.isNavOpen = !this.isNavOpen
        }
    }
}
</script>

<style lang="scss">
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

        @include media-breakpoint-up(md) {
            position: absolute;
        }

        a {
            color: $white;
            &:hover, &:focus, &:active {
                color: $white;

            }
        }
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
        padding-top: 0 !important;
    }
</style>
