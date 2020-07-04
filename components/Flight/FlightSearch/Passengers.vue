<template>
  <div class="passengers">
    <span class="passengers__icon-holder">
      <svgicon class="passengers__icon-holder--icon" width="24" height="24" name="user" />
    </span>
    <div class="passengers__input-holder">
      <span class="passengers__input-holder--before">
        <svgicon class="passengers__input-holder--before__icon" width="24" height="24" name="chair" />
      </span>
      <input name="passengers" value="3 مسافر، اکونومی" class="passengers__input-holder--input" type="text">
      <span class="passengers__input-holder--after">
        <svgicon class="passengers__input-holder--after__icon" width="24" height="24" name="arrow-down" />
      </span>
    </div>
    <app-modal />
  </div>
</template>

<script>
import '~/components/icons'
export default {

}
</script>


<style lang="scss" scoped>
.passengers {
  margin-bottom: 20px;
  border: 1px solid $borderColor;
  border-radius: 5px;
  position: relative;
  height: 50px;

  &__icon-holder {
    position: absolute;
    right: 15px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      height: 24px;
      position: absolute;
      left: -10px;
      width: 1px;
      background: $borderColor;
    }

    &--icon {
      color: $grayColor;
      position: relative;
    }
  }

  &__input-holder {
    height: 100%;
    position: relative;

    &--input {
      height: 100%;
      width: 80%;
      outline: none;
      border: none;
      background: transparent;
      padding-right: 40px;
      padding-left: 30px;
      font-size: 15px;
      line-height: 52px;
    }

    &--before {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      &__icon {
        color: $grayColor;
      }
    }

    &--after {
      position: absolute;
      left: 15px;
      transform: translateY(50%);
      height: 24px;

      &__icon {
        color: $darkGrayColor;
      }
    }
  }
}
</style>
