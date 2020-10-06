<template>
    <div class="refund">
        <div>
            <b-badge class="p-2 text-white" variant="info">
                {{ title }}
            </b-badge>
            <span class="mr-2 text-2">مسافرین مورد نظر را انتخاب کنید</span>
            <div class="mt-3">
                <b-form-checkbox-group
                    v-model="selected"
                    :options="options"
                    class="refund__passengers-list"
                    value-field="item"
                    direction="rtl"
                    text-field="name"
                    disabled-field="notEnabled"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Refund',
    props: {
        data: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            refund: false
        }
    },
    computed: {
        options() {
            const passengers = this.data.map((item,i) => ({
                name: item.name.en + ' ' + item.surname.en,
                item: i
            }))
            return passengers
        },
        selected: {
            get() {
                return this.value
            },
            set(x) {
                this.$emit('input', x)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .refund {
        &__passengers-list {
            /deep/ .custom-checkbox {
                display: block;
                text-align: left;
                background: $white;
                border: 1px solid map_get($grays, '400');
                border-radius: 10px;
                padding: 14px 40px;
                margin-left: 0;
                &:not(:last-child) {
                    margin-bottom: 1rem;
                }
            }
            /deep/ .custom-control-label:before , /deep/ .custom-control-label:after {
                top: 2px;
            }
        }
    }
</style>