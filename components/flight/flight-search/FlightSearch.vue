<template>
    <div>
        <v-observer slim>
            <form action="#">
                <tabs v-model="search.type" class="mb-3" :tabs="tabs" />
                <input-pair class="mb-3">
                    <flight-destination-picker v-model="search.origin" place-holder="ازکجا" title="مبدا" />
                    <flight-destination-picker v-model="search.destination" place-holder="به کجا" title="مقصد" />
                </input-pair>
                <a-datepicker
                    v-model="date"
                    class="date-input-pair mb-3 a-datepicker--top"
                    :jalaali.sync="jalaaliDatepicker"
                    :range.sync="isDatepickerRange"
                >
                    <template v-slot:before="{ on, value }">
                        <span class="date-input-pair" dir="rtl">
                            <form-input
                                :class-name="search.type === 'OW' ? 'one-way' : ''"
                                label="تاریخ رفت"
                                :icon="search.type === 'OW' ? 'calendar-schedule': ''"
                                :value="value[0] ? value[0].format('dddd DD MMMM YY') : null"
                                readonly
                                v-on="on"
                            />
                            <svgicon
                                v-if="search.type !== 'OW'"
                                class="pair-icon"
                                name="calendar-schedule"
                                width="28"
                                height="28"
                            />
                            <form-input
                                v-if="search.type !== 'OW'"
                                label="تاریخ برگشت"
                                :value="value[1] ? value[1].format('dddd DD MMMM YY') : null"
                                readonly
                                data-datepicker="1"
                                v-on="on"
                            />
                        </span>
                    </template>
                    <template v-slot="{ open, value, on }">
                        <form-input
                            label="تاریخ رفت"
                            :class-name="search.type === 'OW' ? 'one-way' : ''"
                            :value="value[0] ? value[0].format('dddd DD MMMM YY') : null"
                            readonly
                            :icon="search.type === 'OW' ? 'calendar-schedule': ''"
                            v-on="on"
                        />
                        <svgicon
                            v-if="search.type !== 'OW'"
                            class="pair-icon"
                            name="calendar-schedule"
                            width="28"
                            height="28"
                        />
                        <form-input
                            v-if="search.type !== 'OW'"
                            label="تاریخ برگشت"
                            :value="value[1] ? value[1].format('dddd DD MMMM YY') : null"
                            data-datepicker="1"
                            readonly
                            v-on="on"
                        />
                    </template>

                    <template #day="{ day }">
                        <span class="calendar__day__content">
                            <span v-if="datePrices && datePrices.departing[day.calendar('gregory').format('YYYY-MM-DD')]">
                                {{ day.format('D') }}
                                <br>
                                <small class="text-1">{{ datePrices.departing[day.calendar('gregory').format('YYYY-MM-DD')] / 1000 }}</small>
                            </span>
                            <template v-else>
                                {{ day.format('D') }}
                            </template>
                        </span>
                    </template>
                </a-datepicker>
                <passengers-picker
                    v-model="passengers"
                    class="mb-3"
                    :flight-class.sync="search.classType"
                    :is-international="isInternational"
                >
                    <passenger-input
                        :value="passengersCountText"
                    />
                </passengers-picker>
                <search-button class="mb-2" @click.prevent="startSearch" />
            </form>
        </v-observer>
    </div>
</template>


<script>
import FlightDestinationPicker from '~/components/flight/flight-search/FlightDestinationPicker'
import PassengersPicker from '~/components/flight/flight-search/PassengersPicker'
import SearchButton from '~/components/flight/flight-search/SearchButton'
import ADatepicker from '~/components/ui/date-picker/ADatepicker'
import Tabs from '~/components/ui/Tabs'
import FormInput from '~/components/ui/form/FormInput'
import InputPair from '~/components/ui/form/InputPair'
import PassengerInput from '~/components/ui/PassengerInput'
import flightSearchMixin from '~/components/flight/flight-search/flightSearchMixin'
import {flightApi} from '~/api/flight'

export default {
    components: {
        PassengerInput,
        InputPair,
        FlightDestinationPicker,
        PassengersPicker,
        SearchButton,
        Tabs,
        FormInput,
        ADatepicker
    },
    mixins: [flightSearchMixin],
    data() {
        return {
            tabs: [
                {value: 'RT', name: 'رفت و برگشت', disable: false},
                {value: 'OW', name: 'یک طرفه', disable: false},
                {value: 'MD', name: 'چند مسیره', disable: true}
            ],

            datePrices: null
        }
    },

    computed: {
        passengersCountText() {
            return this.passengersCount + ' مسافر' + (this.search.classType ? '، ' + this.classTypeText : '')
        }
    },

    mounted() {
        const lastSearch = this.getLastSearch()
        if (lastSearch) {
            this.search = lastSearch
        }

        this.$watch(() => [this.search.origin, this.search.destination], this.fetchDatePrices, {
            immediate: true
        })
    },

    methods: {
        async fetchDatePrices() {
            const { search } = this
            if (!search.origin || !search.destination) {
                this.datePrices = null
                return
            }
            this.datePrices = await flightApi.getDatePrices({
                origin: search.origin.id,
                destination: search.destination.id,
                type: search.type,
                minDate: this.$dayjs().calendar('gregory').format('YYYY-MM-DD'),
                maxDate: this.$dayjs().calendar('gregory').add(30, 'day').format('YYYY-MM-DD')
            }).catch(err => null)
        }
    }
}
</script>

<style lang="scss">
    .date-input-pair {
        display: flex;
        position: relative;

        .form-input {
            background: #f9f9f9;
        }

        .pair-icon {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 1;
            box-sizing: content-box;
            padding: 5px 0;
            background: #f9f9f9;
        }

        > div {
            flex: 50% 1 0;
            border-radius: 0;

            &:first-child {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            &:last-child {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }

            & ~ div {
                border-right: 0;
            }
        }
    }

    .a-datepicker--top {
        .a-datepicker__container {
            top: 185px;
        }
    }
</style>
