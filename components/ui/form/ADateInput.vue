<template>
    <a-input
        :value="localValue"
        v-bind="{ ...omit($props, ['value']), ...$attrs }"
        :formatter="formatter"
        v-on="omit($listeners, ['input'])"
        @blur="onInput($event.target.value)"
        @change="onInput($event)"
    />
</template>

<script>
import AInput from '~/components/ui/form/AInput'
import omit from 'lodash/omit'
import {toLatin} from '~/plugins/numbers'

export default {
    components: {
        AInput
    },
    props: {
        ...AInput.props,
        value: {
            type: [Object, Date],
            default: null
        }
    },
    computed: {
        localValue() {
            return this.value ? this.$dayjs(this.value).format('YYYY-MM-DD') : null
        }
    },
    methods: {
        omit,

        formatter(x) {
            x = x.replace(/\//g, '-').replace(/[^\d-]/g, '')
            return x.replace(/^(\d{4})(\d)/, '$1-$2').replace(/^(\d{4}[-/]\d{2})(\d)/, '$1-$2')
        },
        onInput(x) {
            x = toLatin(x)
            let date = null
            if (x.match(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/)) {
                date = this.$dayjs.auto(x)
            }
            this.$emit('input', date)
        }
    }
}
</script>
