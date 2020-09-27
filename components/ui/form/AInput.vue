<template>
    <span class="form-control-wrapper" :class="[wrapperClass]" @click="focus">
        <svgicon
            v-if="icon"
            :name="icon"
            width="15"
            class="form-control__icon"
            height="15"
            :fill="false"
        />
        <b-input
            ref="input"
            v-model="localValue"
            v-bind="$attrs"
            v-on="$listeners"
        />
    </span>
</template>

<script>
export default {
    name: 'AInput',
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        wrapperClass: {
            type: [String, Object, Array],
            default: ''
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus()
        }
    }
}
</script>

<style lang="scss">
.form-control-wrapper {
    display: block;
    position: relative;


    .form-control__icon {
        color: $grayColor;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 17px;
        margin: auto 0;
        z-index: 1;

        + .form-control {
            padding-right: 3em;

        }
    }

    [dir=ltr] {
        text-align: left;
    }
}
</style>
