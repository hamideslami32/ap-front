<template functional>
    <b-button class="full-btn" :class="[data.class, data.staticClass]" v-bind="data.attrs" v-on="listeners">
        <span>
            <slot />
        </span>
        <span v-if="props.icon" class="full-btn__icon-holder">
            <svgicon :name="props.icon" width="24" height="24" />
        </span>
    </b-button>
</template>

<script>
export default {
    functional: true,
    inheritAttrs: false,
    props: {
        icon:{
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
    .full-btn {
        position: relative;
        height: 50px;
        display: block;
        width: 100%;
        appearance: none;
        border: 0;
        outline: 0;
        background: $primary;
        border-radius: 10px;
        color: $white;

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
            color: $white;
        }

        &::after {
            $size: 1px;
            content: ' ';
            position: absolute;
            top: -$size;
            left: -$size;
            right: -$size;
            bottom: -$size;
            background: linear-gradient(180deg, rgba(255,255,255, 0) 57.81%, #e3469a 100%);
            z-index: -1;
            border-radius: 10px;
        }
    }

  </style>
