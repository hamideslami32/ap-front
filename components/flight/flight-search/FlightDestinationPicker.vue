<template>
    <div class="flight-destination">
        <destination-input
            :value="value"
            :title="title"
            @input="select"
            @focus="showModal = true"
        />
        <b-modal v-model="showModal" :title="`انتخاب ${title}`" hide-footer @shown="$refs.inputModal.focus()">
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <div class="destination-picker">
                <div class="input-holder">
                    <custom-input
                        ref="inputModal"
                        v-model="query"
                        icon="search"
                        :title="'شهر یا فرودگاه ' + title"
                        autocomplete="off"
                        @input="dFetchResult"
                        @keypress.enter="selectFirst"
                    />
                </div>
                <div class="destination-result">
                    <h3 v-if="!query" class="destination-picker__title">
                        شهرهای پرتردد
                    </h3>
                    <flight-destination-picker-item
                        v-for="(item,i) in destinations"
                        :key="i"
                        :item="item"
                        :show-airports="!!query"
                        @select="select(item, true)"
                    />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import DestinationInput from '~/components/flight/flight-search/DestinationInput'
import CustomInput from '~/components/ui/form/CustomInput'
import FlightDestinationPickerItem from '~/components/flight/flight-search/FlightDestinationPickerItem'
import {flightApi} from '~/api/flight'

export default {
    components: {
        DestinationInput,
        CustomInput,
        FlightDestinationPickerItem
    },

    props: {
        value: {
            type: Object,
            default: null
        },
        title: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            query: '',
            destinations: null,
            showModal: false,
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
        async fetchResult(query) {
            this.destinations = await flightApi.suggest(query)
        },
        select(value, close = false) {
            this.$emit('input', value)
            if (close) {
                this.showModal = false
            }
        },
        selectFirst() {
            if (this.destinations.length) {
                this.select(this.destinations[0], true)
            }
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
}
</style>