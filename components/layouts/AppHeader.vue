<template>
    <header class="app-header">
        <portal-target name="header-right">
            <div class="app-header__start">
                <hamburger-menu @click="toggleNavSidebar()" />
            </div>
        </portal-target>
        <portal-target class="text-center" name="title">
            <nuxt-link to="/">
                <logo />
            </nuxt-link>
        </portal-target>
        <div class="app-header__end">
            <button v-if="$route.fullPath.match(/^\/(flights)?$/)" class="btn-raw text-left">
                <svgicon name="notifications" width="30" height="30" />
            </button>
            <button v-else class="btn-raw text-left" @click="$router.back()">
                <svgicon
                    name="arrow-left"
                    width="20"
                    height="20"
                />
            </button>
        </div>
    </header>
</template>

<script>
import Logo from '~/components/logo/Logo'
import HamburgerMenu from '~/components/layouts/HamburgerMenu'
import {PortalTarget} from 'portal-vue'

export default {
    components: {
        Logo,
        HamburgerMenu,
        PortalTarget
    },
    props: {
        sidebarOpen: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleNavSidebar() {
            this.$emit('update:sidebarOpen', !this.sidebarOpen)
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
        padding: 18px 10px;
        border-bottom: 1px solid #e6e6e6;

        @include media-breakpoint-up(md) {
            position: absolute;
        }

        &__start, &__end {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;

            button {
                padding: 10px 15px;
                height: 100%;
            }
        }

        &__end {
            right: auto;
            left: 0;
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
