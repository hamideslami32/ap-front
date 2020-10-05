<template>
    <div class="mobile-layout" :class="{ 'mobile-layout--hide-bottom-nav': !showBottomNav }">
        <app-header :sidebar-open.sync="sidebarOpen" />
        <sidebar-nav :open.sync="sidebarOpen" />
        <main>
            <nuxt />
        </main>
        <app-bottom-nav v-show="showBottomNav" />
        <toast-portal />
        <login-modal />
    </div>
</template>

<script>
import AppHeader from '~/components/layouts/AppHeader'
import AppBottomNav from '~/components/layouts/AppBottomNav'
import LoginModal from '~/components/auth/LoginModal'
import ToastPortal from '@/components/ui/ToastPortal'
import SidebarNav from '~/components/layouts/SidebarNav'


export default {
    name: 'Default',
    components: {
        ToastPortal,
        AppHeader,
        AppBottomNav,
        LoginModal,
        SidebarNav
    },

    data() {
        return {
            sidebarOpen: false
        }
    },

    computed: {
        showBottomNav() {
            return this.$route.meta.showBottomNav
        }
    },
    watch: {
        '$route.path'() {
            if(process.server) {
                this.sidebarOpen = !this.$device.isDesktop
            } else {
                this.sidebarOpen = window.innerWidth >= 1200
            }
        }
    },

    mounted() {
        if(process.server) {
            this.sidebarOpen = this.$device.isDesktop
        } else {
            this.sidebarOpen = window.innerWidth >= 1200
        }
    }
}
</script>

<style lang="scss">
.mobile-layout {
    margin: 0 auto;
    background-color: $white;
    height: 100%;
    width: 100%;
    padding: 60px 0;

    > main {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        background: $body-bg;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background: rgba($black, 0.22);
            border-radius: 4px;
            transition: all ease 200ms;

            &:hover {
                background: rgba($black, 0.30);
            }
        }
    }

    @include media-breakpoint-up(md) {
        height: 80vh;
        max-height: 1600px;
        border-radius: 6px;
        overflow-x: hidden;
        width: 450px;
        position: relative;
    }

    &--hide-bottom-nav {
        padding-bottom: 0;
    }
}
</style>
