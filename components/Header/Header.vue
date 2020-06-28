<template>
  <div class="container-fluid header-wrapper">
    <header class="header">
      <svgicon name="bars-solid" width="30" height="30" color="black" />
      <svgicon name="logo" width="120" height="33" />
      <svgicon name="notifications" width="30" height="30" />
    </header>
  </div>
</template>

<script>
import '~/components/icons'
export default {}
</script>

<style lang='scss' scoped>
.header-wrapper {
  background-color: #fafafa;
}

.header {
  height: 60px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>