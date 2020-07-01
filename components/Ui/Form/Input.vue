<template>
  <div :class="data.type" class="input-holder">
    <label v-if="data.title" class="input-holder__title">
      {{ data.title }}
    </label>
    <input :name="data.type" value="آمستردام" class="input-holder__input">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
      data: {
          type: Object,
          required: true
      }
  }
}
</script>


<style lang="scss" scoped>
@mixin destinationInput {
  margin-left: 5px;
  text-align: right;
  display: flex;
  flex-direction: column;
  min-width: 49%;
  background: $backgroundColor;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.input-holder {
  padding: 20px 15px 20px 10px;

  &.origin {
    @include destinationInput;

    border-radius: 0 5px 5px 0;
    align-items: flex-start;
  }

  &.destination {
    @include destinationInput;

    border-radius: 5px 0 0 5px;
    align-items: flex-end;

    input {
      text-align: left;
    }
  }

  &__title {
    font-size: 13px;
    color: $grayColor;
    line-height: 22px;
    margin-bottom: 5px;
  }

  &__input {
    outline: none;
    border: none;
    background: transparent;
    font-weight: 600;
    font-size: 17px;
    line-height: 30px;
    height: 30px;
    color: $blackColor;
    margin-bottom: 5px;
    width: 90%;
  }
}
</style>