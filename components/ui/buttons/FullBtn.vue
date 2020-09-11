<template functional>
    <a-btn
        :wrapper-class="`full-btn ${props.variant.match(/^outline/) ? 'full-btn--outline' : ''}`"
        :class="[data.class, data.staticClass]"
        v-bind="data.attrs"
        :variant="props.variant"
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
        },
        variant: {
            type: String,
            default: 'primary'
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
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            width: 40px;
            display: inline-block;
            left: 5px;
            top: 5px;
            bottom: 5px;

            &::before {
                content: ' ';
                vertical-align: middle;
                height: 100%;
                display: inline-block;
            }
        }

        &--outline::after {
            content: none;
            display: none;
        }
    }

  </style>
