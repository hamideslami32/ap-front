<template>
  <nuxt-link active-class="active" class="nav-item" :to="item.url">
    <svgicon class="nav-item__icon" :name="item.icon" width="24" height="24" />
    <button class="nav-item__button">
      {{ item.name }}
    </button>
  </nuxt-link>
</template>


<script>
import '~/components/icons'
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
  position: relative;
  text-decoration: none;
  display: inline-block;

  &:not(:first-child) {
    margin-right: 10px;
  }

  &__icon {
    position: absolute;
    right: 15px;
    transform: translateY(50%);
    color: $darkGrayColor;
    transition: all ease-out 250ms;
  }

  &__button {
    width: 145px;
    height: 50px;
    left: 205px;
    top: 80px;
    background: $whiteColor;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 13px;
    line-height: 24px;
    color: $darkGrayColor;
    outline: none;
    border: none;
    padding-right: 30px;
    transition: all ease-out 250ms;
  }

  &:hover {
    .nav-item {
      &__button {
        color: $whiteColor;
        background: linear-gradient(90deg, #dd418a 0%, #e3629e 100%);
      }

      &__icon {
        color: $whiteColor;
      }
    }
  }

  &.active {
    .nav-item {
      &__button {
        background: linear-gradient(90deg, #dd418a 0%, #e3629e 100%);
        color: $whiteColor;
      }

      &__icon {
        color: $whiteColor;
      }
    }
  }
}
</style>