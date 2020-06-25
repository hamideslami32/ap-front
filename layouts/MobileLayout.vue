<template>
  <div class="mobile-layout">
    <app-header></app-header>
    <main class="container mobile-layout__main">
      <app-nav></app-nav>
      <nuxt />
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from '../components/Mobile/Header/Header.vue';
import Footer from '../components/Mobile/Footer/Footer.vue';
import Navs from '../components/Mobile/Navs/Navs.vue';
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    appNav: Navs
  }
};
</script>

<style lang='scss' scoped>
.mobile-layout {
  position: relative;

  &__main {
    background: #f5f5f5;
    min-height: calc(100vh - 120px);
  }
}
</style>