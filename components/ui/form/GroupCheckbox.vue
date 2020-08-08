<template>
    <b-form-group class="group-checkbox">
        <b-form-checkbox
            v-for="item in options"
            :id="item.value"
            :key="item.value"
            v-model="localValue"
            :value="item.value"
        >
            <div class="flex-grow-1 mb-2">
                <slot :item="item" />
            </div>
        </b-form-checkbox>
    </b-form-group>
</template>

<script>
export default {
    name: 'GroupCheckbox',
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
        localValue: {
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

<style lang="scss">
.group-checkbox {
    .custom-control-label {
        width: 100%;

        &::after, &::before {
            top: 50%;
            margin-top: -8px;
        }
    }
}
</style>
