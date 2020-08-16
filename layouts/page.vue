<template>
    <div>
        <page-header />
        <main class="page-layout">
            <nuxt />
        </main>
        <toast-portal />
    </div>
</template>

<script>
import PageHeader from '~/components/layouts/PageHeader'
import ToastPortal from '~/components/ui/ToastPortal'
export default {
    name: 'Page',
    components: {ToastPortal, PageHeader}
}
</script>

<style scoped>
    .page-layout {
        padding-top: 60px;
    }
</style>