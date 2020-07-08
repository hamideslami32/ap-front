<template>
    <div class="flight-destination">
        <input-pair>
            <destination-input
                title="مبدا"
                class="origin"
                :value="value[0]"
                @focus="openModal('origin')"
            >
                <input-detail :left="false" code="AMS" name="استانبول" />
            </destination-input>
            <destination-input
                title="مقصد"
                class="destination"
                :value="value[1]"
                @focus="openModal('destination')"
            >
                <input-detail code="FAD" name="آمستردام" left />
            </destination-input>
        </input-pair>
        <modal v-model="showModal" :title="title">
            <div class="destination-picker">
                <div class="input-holder">
                    <InputModal v-model="query" :title="title" @input="fetchResult" />
                </div>
                <div>
                    <h3 v-if="mode === 'suggestion'" class="destination-picker__title">
                        شهرهای پرتردد
                    </h3>
                    <Item v-for="x in 7" :key="x" :mode="mode" @select="onSelect" />
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import InputPair from '~/components/Ui/Form/InputPair.vue'
import Modal from '~/components/Ui/Modals/Modal.vue'
import DestinationInput from '~/components/Ui/Form/DestinationInput'
import InputDetail from '~/components/Ui/Form/InputDetail'
import InputModal from '~/components/Ui/Form/InputModal'
import Item from '~/components/Ui/Suggestions/Item'

export default {
    components: {
        InputPair,
        Modal,
        DestinationInput,
        InputDetail,
        InputModal,
        Item
    },

    props: {
        value: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            query: null,
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
            mode: 'suggestion',
            showModal: false,
            title: '',
            inputName: ''
        }
    },

    mounted() {
        this.fetchResultDebounced = debounce(this.fetchResult, 300)
    },
    methods: {
        openModal(data) {
            this.title = null
            this.inputName = null
            this.showModal = true
        },
        fetchResult(event) {
            // console.log(event, 'event =>')
        },
        onSelect() {

        }
    }
}
</script>

<style lang="scss">
.destination-picker {
    &__title {
        font-size: 15px;
        line-height: 30px;
        color: $grayColor;
        text-align: right;
    }
}
</style>