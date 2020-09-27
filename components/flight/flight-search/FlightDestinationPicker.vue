<template>
    <div class="flight-destination">
        <destination-input
            :value="value"
            :title="title"
            :place-holder="placeHolder"
            @input="select"
            @focus="showModal = true"
        />
        <b-modal v-model="showModal" :title="`انتخاب ${title}`" hide-footer @shown="onModalShow">
            <template v-slot:modal-header-close>
                <svgicon name="arrow-left" width="20" height="20" />
            </template>
            <div class="destination-picker mb-2">
                <div class="destination-picker__input">
                    <a-input
                        ref="inputModal"
                        v-model="query"
                        icon="search"
                        :placeholder="'شهر یا فرودگاه ' + title"
                        autocomplete="off"
                        wrapper-class="mb-3"
                        @input="dFetchResult"
                        @keypress.enter="selectFirst"
                    />
                </div>
                <div v-if="destinations" class="destination-picker__result">
                    <h3 v-if="!query" class="destination-picker__title">
                        شهرهای پرتردد
                    </h3>
                    <flight-destination-picker-item
                        v-for="(item,i) in destinations"
                        :key="i"
                        :item="item"
                        :show-airports="!!query"
                        @select="select($event, true)"
                    />
                    <div v-if="destinations.length === 0" class="text-center mt-4">
                        <h5>اوپس!</h5>
                        <p>موردی یافت نشد، مجدد تلاش کنید</p>
                        <b-btn variant="outline-secondary" @click="(query = '') || fetchResult('')">
                            بازگشت به صفحه نخست
                        </b-btn>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import DestinationInput from '~/components/flight/flight-search/DestinationInput'
import AInput from '~/components/ui/form/AInput'
import FlightDestinationPickerItem from '~/components/flight/flight-search/FlightDestinationPickerItem'
import {flightApi} from '~/api/flightApi'

export default {
    components: {
        DestinationInput,
        AInput,
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
        },
        placeHolder: {
            type: String,
            default: ''
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
        // this.fetchResult('')
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
        },
        onModalShow() {
            const { inputModal } = this.$refs
            inputModal && inputModal.focus()
            if (!this.destinations) {
                this.fetchResult('')
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

        &__input {
            z-index: 5;
            position: relative;
            padding-bottom: 5px;
        }

        &__result {
            position: absolute;
            top: 65px;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px 10px;
            overflow: hidden;
            overflow-y: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>
