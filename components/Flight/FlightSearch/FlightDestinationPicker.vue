<template>
    <div class="flight-destination">
        <input-pair @click="$emit('click')">
            <destination-input
                title="مبدا"
                class="origin"
                :value="value[0]"
                @focus="openModal('origin')"
            >
                <input-detail v-if="value[0]" :left="false" :code="value[0] ? value[0].cityCode: ''" :name="value[0] ? value[0].country.fa.length > 1 ? value[0].country.fa : value[0].country.en : ''" />
            </destination-input>
            <destination-input
                title="مقصد"
                class="destination"
                :value="value[1]"
                @focus="openModal('destination')"
            >
                <input-detail v-if="value[1]" :left="false" :code="value[1] ? value[1].cityCode: ''" :name="value[1] ? value[1].country.fa.length > 1 ? value[1].country.fa : value[1].country.en : ''" />
            </destination-input>
        </input-pair>
        <modal v-model="showModal" :title="focus === 'origin' ? 'مبدا' : 'مقصد'">
            <div class="destination-picker">
                <div class="input-holder">
                    <InputModal v-model="query" :title="focus === 'origin' ? 'مبدا' : 'مقصد'" @input="dFetchResult" />
                </div>
                <div>
                    <h3 v-if="!query" class="destination-picker__title">
                        شهرهای پرتردد
                    </h3>
                    <FlightDestinationPickerItem
                        v-for="(item,i) in destinations"
                        :key="i"
                        :item="item"
                        :show-airports="!!query"
                        @select="onSelect"
                    />
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
import FlightDestinationPickerItem from '~/components/Flight/FlightSearch/FlightDestinationPickerItem'
import {flightApi} from '~/api/flight'

export default {
    components: {
        InputPair,
        Modal,
        DestinationInput,
        InputDetail,
        InputModal,
        FlightDestinationPickerItem
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
            destinations: null,
            showModal: false,
            focus: '',
            inputName: ''
        }
    },

    created() {
        this.dFetchResult = debounce(this.fetchResult, 300)
    },
    mounted() {
        this.fetchResult('')
    },
    methods: {
        openModal(type) {
            this.focus = type
            this.showModal = true
        },
        async fetchResult(query) {
            this.destinations = await flightApi.suggest(query)
        },
        onSelect(value) {
            const newValue = [...this.value]
            newValue[this.focus === 'origin' ? 0 : 1] = value
            this.$emit('input', newValue)
            this.showModal = false
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