<template>
    <div class="filter-panel">
        <a class="link-inherit" :class="{ show }" href="javascript:void(0)" @click="toggle">
            <svgicon class="text-gray-500 ml-2" width="20" height="20" :name="icon" />
            <span class="align-middle">{{ title }}</span>
            <svgicon class="filter-panel__chevron" name="arrow-left" />
        </a>
        <b-collapse v-model="show" accordion="filter">
            <div class="px-2 pb-3">
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
        toggleAble: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            show: !!this.$attrs.show
        }
    },
    methods: {
        toggle() {
            if (this.toggleAble) {
                this.show = !this.show
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .filter-panel {
        display: block;
        border-top: 1px solid map_get($gray-colors, 'gray-500');
        margin: 0 -10px;
        color: map_get($grays, '800');

        > a {
            display: block;
            padding: 20px 10px;
            font-weight: 500;

            &.show {
                .filter-panel__chevron {
                    transform: rotate(-90deg);
                }
            }
        }

        &__chevron {
            float: left;
            margin: 3px 0;
            transition: all ease 150ms;
        }
    }
</style>
