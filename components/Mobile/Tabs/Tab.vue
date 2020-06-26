<template>
  <li class="tab" @click="handleClick(item.id)">{{ item.name }}</li>
</template>

<script>
export default {
  props: ['item', 'handleClick']
};
</script>

<style lang='scss' scoped>
.tab {
  font-size: 13px;
  line-height: 42px;
  list-style: none;
  min-width: 100px;
  text-align: center;

  &.actived {
    font-weight: 600;
    color: #fff;
    z-index: 1;
  }
}
</style>

