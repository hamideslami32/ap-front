<template>
    <div class="flight-destination">
        <input-pair>
            <destination-input v-for="item in destinations" :key="item.type" :data="item" @focus="openModal($event)">
                <input-detail :data="item.airport" :type="item.type" />
            </destination-input>
        </input-pair>
        <modal v-model="showModal" :title="title">
            <Destination :title="title" :name="inputName" />
        </modal>
    </div>
</template>

<script>
import InputPair from '~/components/Ui/Form/InputPair.vue'
import Modal from '~/components/Ui/Modals/Modal.vue'
import Destination from '~/components/Ui/Modals/Destination'
import DestinationInput from '~/components/Ui/Form/DestinationInput'
import InputDetail from '~/components/Ui/Form/InputDetail'

export default {
    components: {
        InputPair,
        Modal,
        Destination,
        DestinationInput,
        InputDetail
    },
    data() {
        return {
            destinations: [
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
            ],
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
