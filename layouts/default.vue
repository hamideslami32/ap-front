<template>
    <div>
        <app-header />
        <main class="mobile-layout">
            <nuxt />
        </main>
        <app-bottom-nav />
        <login-modal />
    </div>
</template>

<script>
import AppHeader from '~/components/layouts/AppHeader'
import AppBottomNav from '~/components/layouts/AppBottomNav'
import LoginModal from '~/components/auth/LoginModal'

export default {
    name: 'Default',
    components: {
        AppHeader,
        AppBottomNav,
        LoginModal
    },
    head: {
        title: 'خرید بلیط هواپیما',
        titleTemplate: 'Apro | %s'
    }
}
</script>

<style>
    .mobile-layout {
        padding: 60px 0;
    }
</style>
