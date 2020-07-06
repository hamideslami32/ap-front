<template>
    <div class="inputPair">
        <slot />
        <reverse-btn />
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .inputPair {
        position: relative;
        max-height: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
</style>
