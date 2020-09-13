<template>
    <div class="panel">
        <a class="link-inherit" :class="{ show }" href="javascript:void(0)" @click="toggle">
            <svgicon class="text-gray-500 ml-2" width="26" height="26" :name="icon" />
            <span class="align-middle">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <svgicon class="panel__chevron" width="30" height="30" name="arrow-down" />
        </a>
        <b-collapse v-model="show" :accordion="accordion">
            <div class="px-2 pb-3" :class="bodyClass">
                <slot />
            </div>
        </b-collapse>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: 'user'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        bodyClass: {
            type: [String, Object, Array],
            default: ''
        },
        accordion: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            show: !!this.$attrs.show
        }
    },
    methods: {
        toggle() {
            if (this.disabled) return
            this.show = !this.show
        }
    }
}
</script>

<style lang="scss" scoped>
    .panel {
        display: block;
        border-top: 1px solid map_get($grays, '500');
        color: map_get($grays, '800');

        > a {
            display: block;
            padding: 20px 10px;
            font-weight: 500;

            &.show {
                .panel__chevron {
                    transform: rotate(180deg);
                }
            }
        }

        &__chevron {
            float: left;
            transition: all ease 150ms;
        }
    }
</style>
