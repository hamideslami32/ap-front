<template>
  <div class="container-fluid header-wrapper">
    <header class="header">
      <svgicon name="bars-solid" class="header__icon" width="30" height="30" color="black" />
      <logo />
      <svgicon name="notifications" width="30" class="header__icon" height="30" />
    </header>
  </div>
</template>

<script>
import '~/components/icons'
import Logo from '~/components/Logo/Logo'

export default {
    components: {
        Logo
    }
}
</script>

<style lang='scss' scoped>
.header-wrapper {
    background-color: #FAFAFA;
}

.header {
    height: 60px;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__icon {
        color: $blackColor;
    }
}
</style>
