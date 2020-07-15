<template>
    <div class="mobile-layout">
        <app-header />
        <main class="container mobile-layout__main">
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
