<template>
    <div
        class="form-input"
        :class="{
            'form-input--blur': !focus && !value,
            'form-input--icon': icon,
            'form-input--value': !!value
        }"
        @click="$refs.input.focus()"
    >
        <svgicon v-if="icon" :name="icon" width="28" height="28" />
        <div>
            <label :class="className" :for="'form_' + _uid"><slot name="label">{{ label }}</slot></label>
            <input
                :id="'form_' + _uid"
                ref="input"
                v-model="localValue"
                v-bind="$attrs"
                :class="className"
                @focus="onFocus(true)"
                @blur="onFocus(false)"
            >
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        icon: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        className: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            focus: false
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(x) {
                this.$emit('input', x)
            }
        }
    },

    methods: {
        onFocus(focus) {
            if (!this.$attrs.readonly) {
                this.focus = focus
            }
            this.$emit(focus ? 'focus' : 'blur')
        }
    }
}
</script>

<style lang="scss">
.form-input {
    position: relative;
    border: 1px solid $borderColor;
    border-radius: 5px;
    background: #f9f9f9;
    padding: 10px 20px 10px 20px;

    > svg {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -14px;
    }

    > div {
        flex-grow: 1;
    }

    input {
        appearance: none;
        border: 0;
        outline: 0 !important;
        background-color: transparent;
        width: 100%;
        min-width: 0;
        display: inline-block;
        font-size: 0.8em;
        font-weight: 500;
        &.one-way{
            text-align: right;
            padding-right: 55px;
        }
    }

    label {
        font-size: 13px;
        margin-bottom: 0;
        width: 100%;
        &.one-way{
            text-align: right;
            padding-right: 55px;
        }
    }

    &--blur {
        padding: 10px 20px;

        label {
            transform: translateY(14px);
            font-size: 15px;
            text-align: center;
        }
    }

    &--value {
        background-color: #f9f9f9;
        label{
            font-size: 0.6rem;
        }
    }
}
</style>
