<template>
  <div class="inputPair">
    <app-input v-for="(data, i) in inputsData" :key="i" :data="data" @click.native="clickInput(data.type)">
      <app-input-detail :data="data.airport" :type="data.type" />
    </app-input>
    <slot />
  </div>
</template>

<script>
import Input from '~/components/Ui/Form/Input.vue'
import inputDetail from '~/components/Ui/Form/InputDetail.vue'
export default {
    components: {
        appInput: Input,
        appInputDetail: inputDetail
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
        clickInput(type){
            this.$emit('handleClick', type)
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