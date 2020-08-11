<template>
    <div>
        <page-header />
        <main class="page-layout">
            <nuxt />
        </main>
    </div>
</template>

<script>
import PageHeader from '~/components/layouts/PageHeader'
export default {
    name: 'Page',
    components: {PageHeader}
}
</script>

<style scoped>
    .page-layout {
        padding: 60px 0;
    }
</style>