<template functional>
    <a-btn
        wrapper-class="full-btn"
        :class="[data.class, data.staticClass]"
        v-bind="data.attrs"
        variant="primary"
        v-on="listeners"
    >
        <span>
            <slot />
        </span>
        <span v-if="props.icon" class="full-btn__icon-holder">
            <svgicon :name="props.icon" width="24" height="24" />
        </span>
    </a-btn>
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

<style lang="scss">
    .full-btn {
        &, & .btn {
            height: 50px;
            display: block;
            width: 100%;
        }

        &__icon-holder {
            position: absolute;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.1);
            width: 40px;
            display: inline-block;
            left: 5px;
            top: 5px;
            bottom: 5px;
            color: $white;

            &::before {
                content: ' ';
                vertical-align: middle;
                height: 100%;
                display: inline-block;
            }
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
