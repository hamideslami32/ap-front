<template>
  <nuxt-link class="nav-item" :to="item.url">
    <button class="nav-item__button">
      {{ item.name }}
    </button>
  </nuxt-link>
</template>


<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.nav-item {
  &:not(:first-child) {
    margin-right: 10px;
  }

  &__button {
    width: 145px;
    height: 50px;
    left: 205px;
    top: 80px;
    background: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 13px;
    line-height: 24px;
    color: #666;
    outline: none;
    border: none;
    transition: all ease-out 250ms;

    &:hover {
      color: #fff;
      background: linear-gradient(90deg, #dd418a 0%, #e3629e 100%);
    }
  }
}
</style>