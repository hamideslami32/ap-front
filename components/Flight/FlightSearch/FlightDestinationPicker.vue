<template>
  <div class="flight-destination">
    <app-input-pair @handleClick="openModal($event)">
      <app-reverse-btn />
    </app-input-pair>
    <app-modal v-model="showModal" title="مبدا" />
  </div>
</template>

<script>
import InputPair from '~/components/Ui/Form/InputPair.vue'
import ReverseBtn from '~/components/Ui/Buttons/ReverseBtn.vue'
import Modal from '~/components/Ui/Modals/Modal.vue'
export default {
    components: {
        appInputPair: InputPair,
        appReverseBtn: ReverseBtn,
        appModal: Modal
    },
    data(){
        return{
            showModal: false
        }
    },
    methods:{
        openModal(type){
            console.log({type})
            this.showModal= true
            // this.$refs.modal.openModal()
        },
    }
}
</script>
