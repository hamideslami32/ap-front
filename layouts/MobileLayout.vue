<template>
    <div class="mobile-layout">
        <app-header />
        <main class="container mobile-layout__main">
            <nuxt />
        </main>
        <app-footer />

        <login-modal />
    </div>
</template>

<script>
import AppHeader from '~/components/Header/Header.vue'
import AppFooter from '~/components/Footer/Footer.vue'
import LoginModal from '~/components/Auth/LoginModal'
export default {
    components: {
        AppHeader,
        AppFooter,
        LoginModal
    }
}
</script>

<style lang='scss' scoped>
.mobile-layout {
    position: relative;

    &__main {
        background: #F5F5F5;
        min-height: calc(100vh - 120px);
    }
}
</style>