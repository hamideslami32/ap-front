<template>
    <div class="flight-destination">
        <input-pair @focus="openModal($event)">
            <reverse-btn />
        </input-pair>
        <modal v-model="showModal" :title="title">
            <Destination :title="title" :name="inputName" />
        </modal>
    </div>
</template>

<script>
import InputPair from '~/components/Ui/Form/InputPair.vue'
import ReverseBtn from '~/components/Ui/Buttons/ReverseBtn.vue'
import Modal from '~/components/Ui/Modals/Modal.vue'
import Destination from '~/components/Ui/Modals/Destination'

export default {
    components: {
        InputPair,
        ReverseBtn,
        Modal,
        Destination
    },
    data() {
        return {
            showModal: false,
            title: '',
            inputName: ''
        }
    },
    methods: {
        openModal(data) {
            this.title = data.title
            this.inputName = data.type
            this.showModal = true
        }
    }
}
</script>
