<template>
    <div>
        <page-header />
        <main class="page-layout">
            <nuxt />
        </main>
        <toast-portal />
        <login-modal />
    </div>
</template>

<script>
import PageHeader from '~/components/layouts/PageHeader'
import ToastPortal from '~/components/ui/ToastPortal'
import LoginModal from '~/components/auth/LoginModal'

export default {
    name: 'Page',
    components: {ToastPortal, PageHeader, LoginModal}
}
</script>

<style scoped>
    .page-layout {
        padding-top: 60px;
    }
</style>
