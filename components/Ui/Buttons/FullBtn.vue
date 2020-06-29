<template>
  <div class="button-search">
    <button class="button-search__btn">
      <slot />
    </button>
    <span class="button-search__icon-holder">
      <svgicon class="button-search__icon-holder--icon" :name="icon" width="24" height="24" />
    </span>
  </div>
</template>

<script>
import '~/components/icons'
export default {
  props: {
    icon:{
      type: String,
      required: false,
      default: 'arrow-left'
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-search {
    position: relative;
    height: 50px;

    &__btn {
      width: 100%;
      border: 1px solid $primary;
      background: linear-gradient(90deg, $primary 0%, #8958d7 100%);
      color: $whiteColor;
      line-height: 50px;
      height: 50px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    &__icon-holder {
      position: absolute;
      left: 5px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      top: 10%;

      &--icon {
        color: $whiteColor;
      }
    }
  }

  </style>
