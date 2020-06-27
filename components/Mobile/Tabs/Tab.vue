<template functional>
  <li class="tab" :class="[data.class, data.staticClass]" v-on="listeners">
    {{ props.item.name }}
  </li>
</template>

<style lang='scss' scoped>
.tab {
  font-size: 13px;
  line-height: 42px;
  list-style: none;
  min-width: 100px;
  text-align: center;
  flex: 1;

  &.active {
    font-weight: 600;
    color: #fff;
    z-index: 2;
  }
}
</style>

