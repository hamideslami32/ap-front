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
                    <template v-slot:before="{ open, value, focus }">
                        <span class="date-input-pair" dir="rtl">
                            <form-input
                                :class="[{ active: focus === 0 }, { 'left-border-radius': search.type === 'OW' }]"
                                :class-name="search.type === 'OW' ? 'one-way' : ''"
                                label="تاریخ رفت"
                                :icon="search.type === 'OW' ? 'calendar-schedule': ''"
                                :value="datePickerValue(value[0])"
                                readonly
                                :dir="jalaaliDatepicker ? 'rtl' : 'ltr'"
                                @click.native="open(0)"
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
                                class="left-border-radius"
                                :class="[{ active: focus === 1 }]"
                                label="تاریخ برگشت"
                                style="textAlign: left;"
                                :value="datePickerValue(value[1])"
                                readonly
                                :dir="jalaaliDatepicker ? 'rtl' : 'ltr'"
                                data-datepicker="1"
                                @click.native="open(1)"
                            />
                        </span>
                    </template>
                    <template v-slot="{ open, value, on }">
                        <form-input
                            label="تاریخ رفت"
                            :class="{ 'left-border-radius': search.type === 'OW' }"
                            :class-name="search.type === 'OW' ? 'one-way' : ''"
                            :value="datePickerValue(value[0])"
                            readonly
                            :dir="jalaaliDatepicker ? 'rtl' : 'ltr'"
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
                            class="left-border-radius"
                            style="textAlign: left;"
                            :value="datePickerValue(value[1])"
                            data-datepicker="1"
                            readonly
                            :dir="jalaaliDatepicker ? 'rtl' : 'ltr'"
                            v-on="on"
                        />
                    </template>

                    <template #day="{ day }" dropdown>
                        <span class="calendar__day__content">
                            <span v-if="datePrices && datePrices.departing[day.calendar('gregory').format('YYYY-MM-DD')]">
                                {{ day.format('D') }}
                                <br>
                                <small class="text-1">{{ Math.ceil(datePrices.departing[day.calendar('gregory').format('YYYY-MM-DD')] / 1000) }}</small>
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
                <search-button icon="arrow-left" wrapper-class="mb-3" class="mb-2" @click.prevent="startSearch" />
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
import {flightApi} from '~/api/flightApi'


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
        },
        datePickerValue(value) {
            if(value && this.jalaaliDatepicker) {
                return value.format('dddd DD MMMM YY')
            }
            else if(value && !this.jalaaliDatepicker) {
                return value.format('D MMMM YYYY')
            }else {
                return null
            }
        }
    }
}
</script>

<style lang="scss">
    .date-input-pair {
        display: flex;
        position: relative;

        .form-input {
            background: map-get($grays, '250');

            &.active::before {
                content: ' ';
                position: absolute;
                top: 2px;
                right: 2px;
                left: 2px;
                bottom: 2px;
                background-color: $pinkColor;
                border-radius: 3px 8px 8px 3px;
                z-index: auto;
            }
            &.active:last-child::before {
                border-radius: 8px 3px 3px 8px;
            }
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
            background: map-get($grays, '250');
        }

        .left-border-radius {
            border-top-left-radius: $borderRadius10;
            border-bottom-left-radius: $borderRadius10;
        }

        > div {
            flex: 50% 1 0;
            border-radius: 0;

            &:first-child {
                border-top-right-radius: $borderRadius10;
                border-bottom-right-radius: $borderRadius10;
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
