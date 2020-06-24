<template>
  <div class="container-fluid footer-wrapper">
    <footer class="footer">
      <svgicon class="footer__icon" name="user-add" width="30" height="30"></svgicon>
      <svgicon class="footer__icon" name="home" width="30" height="30"></svgicon>
      <svgicon class="footer__icon" name="calendar" width="30" height="30" :orginal="false"></svgicon>
    </footer>
  </div>
</template>

<script>
import 'assets/images/icons';
export default {};
</script>

<style lang="scss" scoped>
.footer-wrapper {
  position: fixed;
  bottom: 0;
  background-color: #fafafa;
}

.footer {
  padding: 15px 0;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &__icon {
    cursor: pointer;
  }
}
</style>