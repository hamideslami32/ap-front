<template functional>
    <b-button class="button-search" :class="[data.class, data.staticClass]" v-bind="data.attrs" v-on="listeners">
        <span>
            <slot />
        </span>
        <span v-if="props.icon" class="button-search__icon-holder">
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
    .button-search {
        position: relative;
        height: 50px;
        display: block;
        width: 100%;
        appearance: none;
        border: 0;
        outline: 0;
        background: $primary;
        border-radius: 5px;
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
    }

  </style>
