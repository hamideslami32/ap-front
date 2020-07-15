<template>
    <div class="d-flex flex-nowrap" dir="ltr">
        <span
            v-for="(v, i) in value"
            :key="i"
            class="mx-1"
        >
            <custom-input
                ref="inputs"
                title="-"
                :value="value[i]"
                maxlength="1"
                input-class="text-center"
                @input="onInput(i, $event)"
                @keyup="onKeyUp(i, $event)"
            />
        </span>
    </div>
</template>

<script>
import CustomInput from '~/components/ui/form/CustomInput'
export default {
    components: {
        CustomInput
    },
    props: {
        value: {
            type: Array,
            required: true
        }
    },

    mounted() {
        setTimeout(() => {
            Array.from(this.$el.querySelectorAll('input')).forEach(el => {
                el.onkeypress = (e) => !isNaN(e.key)
                el.onfocus = (e) => e.target.select()
            })
        }, 50)
    },

    methods: {
        onInput(i, value) {
            this.value[i] = isNaN(value) ? '' : value[0]
            const nextElement = this.$refs.inputs[i + 1]
            if (value.trim() && nextElement) {
                const el = nextElement.$el.querySelector('input')
                el.focus()
            }
            if (i === this.value.length - 1 && this.value.filter(el => !isNaN(el)).length === this.value.length) {
                this.$emit('done')
            }
        },
        onKeyUp(i, e) {
            if (e.key === 'Backspace') {
                const prevElement = this.$refs.inputs[i - 1]
                if (prevElement) {
                    const el = prevElement.$el.querySelector('input')
                    el.focus()
                    // el.select()
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
