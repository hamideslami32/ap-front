<template>
    <div class="inputPair">
        <a-input v-for="(data, i) in inputsData" :key="i" :data="data" @focus="clickInput(data)">
            <input-detail :data="data.airport" :type="data.type" />
        </a-input>
        <slot />
    </div>
</template>

<script>
import AInput from '~/components/Ui/Form/AInput'
import InputDetail from '~/components/Ui/Form/InputDetail'
export default {
    components: {
        AInput,
        InputDetail
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
