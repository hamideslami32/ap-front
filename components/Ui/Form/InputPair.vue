<template>
    <div class="inputPair">
        <slot />
        <reverse-btn @click.native="switchInputs" />
    </div>
</template>

<script>
import ReverseBtn from '~/components/Ui/Buttons/ReverseBtn'
export default {
    components: {
        ReverseBtn
    },
    data() {
        return {
            inputsData: [
                {
                    title: 'مبدا',
                    type: 'origin',
                    airport: {
                        code: 'AMS',
                        name: 'فرودگاه سبیها'
                    }
                },
                {
                    title: 'مقصد',
                    type: 'destination',
                    airport: {
                        code: 'AMS',
                        name: 'فرودگاه سبیها'
                    }
                }
            ]
        }
    },
    methods: {
        clickInput(type) {
            this.$emit('focus', type)
        },
        switchInputs() {
            const [v0, v1] = this.$children.map(el => el.value)
            this.$children[0].$emit('input', v1)
            this.$children[1].$emit('input', v0)
        }
    }
}
</script>

<style lang="scss" scoped>
    .inputPair {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
