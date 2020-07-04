<template functional>
  <button class="button-search" v-on="listeners">
    <span>
      <slot />
    </span>
    <span class="button-search__icon-holder">
      <svgicon :name="props.icon" width="24" height="24" />
    </span>
  </button>
</template>

<script>
export default {
    functional: true,
    props: {
        icon:{
            type: String,
            default: 'arrow-left'
        }
    }
}
</script>

<style lang="scss" scoped>
    .button-search {
        position: relative;
        height: 50px;
        display: block;
        width: 100%;
        appearance: none;
        border: 0;
        outline: 0;
        background: linear-gradient(90deg, $primary 0%, #8958D7 100%);
        border-radius: 5px;
        color: $whiteColor;

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
            color: $whiteColor;
        }
    }

  </style>
