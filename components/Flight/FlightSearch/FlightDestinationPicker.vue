<template>
    <div class="flight-destination">
        <input-pair>
            <destination-input
                :value="value[0]"
                title="مبدا"
                class="origin"
                @input="select(0, value[0])"
                @focus="openModal('origin')"
            >
                <span v-if="value[0]" class="input-detail">
                    <badge v-if="value[0].id[0] !== '#'" class="mr-1">
                        {{ value[0].id }}
                    </badge>
                    <badge v-else>
                        All
                    </badge>
                    <span class="input-detail__name">
                        {{ value[0].country.fa }}
                    </span>
                </span>
            </destination-input>
            <destination-input
                :value="value[1]"
                title="مقصد"
                class="destination"
                @input="select(1, value[1])"
                @focus="openModal('destination')"
            >
                <span v-if="value[1]" class="input-detail">
                    <span class="input-detail__name">
                        {{ value[1].country.fa }}
                    </span>
                    <badge v-if="value[1].id[0] !== '#'" class="mr-1">
                        {{ value[1].id }}
                    </badge>
                    <badge v-else>
                        All
                    </badge>
                </span>
            </destination-input>
        </input-pair>
        <modal v-model="showModal" :title="focus === 'origin' ? 'شهر یا فرودگاه مبدا' : 'شهر یا فرودگاه مقصد'">
            <div class="destination-picker">
                <div class="input-holder">
                    <custom-input v-model="query" icon="search" :title="focus === 'origin' ? 'مبدا' : 'مقصد'" @input="dFetchResult" />
                </div>
                <div class="destination-result">
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
import CustomInput from '~/components/Ui/Form/CustomInput'
import FlightDestinationPickerItem from '~/components/Flight/FlightSearch/FlightDestinationPickerItem'
import Badge from '~/components/Ui/Buttons/Badge'
import {flightApi} from '~/api/flight'

export default {
    components: {
        InputPair,
        Modal,
        DestinationInput,
        CustomInput,
        FlightDestinationPickerItem,
        Badge
    },

    props: {
        value: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            query: '',
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
            this.select(this.focus === 'origin' ? 0 : 1, value)
            this.showModal = false
        },
        select(i, value) {
            const newValue = [...this.value]
            newValue[i] = value
            this.$emit('input', newValue)
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

    .destination-result {
        overflow: hidden;
        overflow-y: scroll;
        height: calc(100vh - 194px);
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .input-detail {
        &__name {
            font-size: 11px;
            line-height: 20px;
            color: $darkGrayColor;
        }
    }
}
</style>