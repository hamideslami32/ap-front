<template>
  <div class="flight-destination">
    <input-pair @handleClick="openModal($event)">
      <reverse-btn />
    </input-pair>
    <modal v-model="showModal" title="مبدا" />
  </div>
</template>

<script>
import InputPair from '~/components/Ui/Form/InputPair.vue'
import ReverseBtn from '~/components/Ui/Buttons/ReverseBtn.vue'
import Modal from '~/components/Ui/Modals/Modal.vue'

export default {
    components: {
        InputPair,
        ReverseBtn,
        Modal
    },
    data() {
        return{
            showModal: false
        }
    },
    methods:{
        openModal(type) {
            this.showModal= true
            // this.$refs.modal.openModal()
        }
    }
}
</script>
