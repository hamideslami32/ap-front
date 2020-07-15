<template>
    <span class="custom-input" :class="{ 'custom-input--icon': icon }">
        <svgicon
            v-if="icon"
            :name="icon"
            width="15"
            class="custom-input__icon"
            height="15"
            :fill="false"
        />
        <b-input
            ref="input"
            v-model="localValue"
            :placeholder="title"
            class="form-control"
            v-bind="$attrs"
            :class="inputClass"
            @keyup="$emit('keyup', $event)"
            @keypress="$emit('keypress', $event)"
        />
    </span>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: null
        },
        inputClass: {
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

<style lang="scss" scoped>
.custom-input {
    padding: 20px 0;
    display: flex;
    position: relative;

    input {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        font-size: 1rem;

        &::placeholder {
            color: #888888;
        }
    }

    &__icon {
        color: $grayColor;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 17px;
        margin: auto 0;
        z-index: 1;
    }

    &--icon {
        .form-control {
            padding-right: 40px;
        }
    }
}
</style>
