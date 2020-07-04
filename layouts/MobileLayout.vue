<template>
  <div class="mobile-layout">
    <app-header />
    <main class="container mobile-layout__main">
      <nuxt />
    </main>
    <app-footer />
  </div>
</template>

<script>
import Header from '~/components/Header/Header.vue'
import Footer from '~/components/Footer/Footer.vue'
export default {
    components: {
        appHeader: Header,
        appFooter: Footer
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