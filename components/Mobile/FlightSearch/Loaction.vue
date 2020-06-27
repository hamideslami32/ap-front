<template>
  <div class="location">
    <div class="location__origin">
      test
    </div>
    <div class="location__destination">
      test
    </div>
    <div class="location__reverse">
      <div class="location__reverse--btn">
        <svgicon name="arrows-round" width="30" height="30" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@mixin location-input {
  min-height: 120px;
  min-width: 49%;
  background: #f5f5f5;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 0 5px 5px 0;
}

.location {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__origin {
    @include location-input;
  }

  &__destination {
    @include location-input;
  }

  &__reverse {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    width: 40px;
    height: 40px;
    // border: 1px solid #ddd;
    background: #f5f5f5;
    border-radius: 50%;

    &::before {
      content: '';
      width: 40px;
      height: 20px;
      border-top-left-radius: 90px;
      border-top-right-radius: 90px;
      background: transparent;
      position: absolute;
      left: 14px;
      transform: rotate(90deg);
      border: 1px solid #ddd;
      border-bottom-style: none;
      top: 10px;
    }

    &::after {
      content: '';
      width: 40px;
      height: 20px;
      border-top-left-radius: 90px;
      border-top-right-radius: 90px;
      background: transparent;
      position: absolute;
      right: 14px;
      transform: rotate(-90deg);
      border: 1px solid #ddd;
      border-bottom-style: none;
      top: 10px;
    }

    &--btn {
      background: $light;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      margin: 0 auto;
      line-height: 30px;
    }
  }
}
</style>
