<template>
  <div class="mobile-layout">
    <app-header></app-header>
    <main class="container mobile-layout__main">
      <nuxt />
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from '../components/Mobile/Header/Header.vue';
import Footer from '../components/Mobile/Footer/Footer.vue';
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>

<style lang='scss' scoped>
.mobile-layout {
  position: relative;

  &__main {
    min-height: calc(100vh - 120px);
  }
}
</style>