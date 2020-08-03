<template>
    <div class="group-checkbox">
        <b-form-checkbox-group id="checkbox-group-2" class="w-100" name="flavour-2">
            <div
                v-for="item in options"
                :key="item.value"
                class="group-checkbox__item pb-3"
                @click="toggle(item.value)"
            >
                <b-form-checkbox :id="item.value" :checked="value" :value="item.value" />
                <span v-show="item.price" class="group-checkbox__label">{{ item.price | separateNumber | localizeNumber }} <span class="text-small">تومان</span></span>
                <span class="ml-auto">{{ item.title }}</span>
                <badge v-if="item.code" class="ml-2">
                    {{ item.value }}
                </badge>
                <svgicon v-else name="user" width="60" height="40" />
            </div>
        </b-form-checkbox-group>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'
export default {
    name: 'GroupCheckbox',
    components: {
        Badge
    },
    props: {
        value: {
            type: Array,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },
    computed: {
        checkedItem: {
            get() {
                return this.value
            },
            set(value) {
                // this.$emit('input', value)
            }
        }
    },
  
    methods: {
        toggle(value) {
            this.$emit('input', value)
        }
    }
}
</script>

<style lang="scss" scoped>
    .group-checkbox {
        font-weight: 500;
        font-size: 1em;
        color: map_get($gray-colors, 'gray-800');

        &__item {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;

            &.select {
                transition: all ease 250ms;

                .airlines-filter__item__info {
                    span {
                        font-weight: 600;
                        color: $primary;
                    }

                    svg {
                        border-color: $primary;
                    }
                }

                /deep/ .custom-control-label {
                    color: $primary;

                    .text-small {
                        color: $primary;
                    }
                }
            }

            .custom-checkbox {
                margin-right: 0;
                pointer-events: none;
            }

            svg {
                margin-left: 10px;
                border: 1px solid map_get($gray-colors, 'gray-500');
                border-radius: 3px;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            }

            .group-checkbox__label {
                direction: rtl;
                .text-small {
                    font-size: 0.75em;
                    color: map_get($gray-colors, 'gray-700');
                }
            }
        }


    }
</style>