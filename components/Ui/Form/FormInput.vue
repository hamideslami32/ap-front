<template>
    <div
        class="form-input"
        :class="{
            'form-input--blur': !focus && !value,
            'form-input--icon': icon,
            'form-input--value': !!value
        }"
    >
        <svgicon v-if="icon" :name="icon" width="28" height="28" />
        <div>
            <label :for="'form_' + _uid"><slot name="label">{{ label }}</slot></label>
            <input
                :id="'form_' + _uid"
                v-model="localValue"
                @focus="onFocus(true)"
                @blur="onFocus(false)"
            >
        </div>
    </div>
</template>

<script>
export default {
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
            this.focus = focus
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
    padding: 10px 56px 10px 20px;

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
    }

    label {
        font-size: 13px;
        margin-bottom: 0;
        width: 100%;
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
        background-color: $lightGrayColor;
    }
}
</style>
