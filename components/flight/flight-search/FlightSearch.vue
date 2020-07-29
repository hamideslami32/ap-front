<template>
    <div>
        <form action="#">
            <tabs v-model="search.type" class="mb-3" :tabs="tabs" />
            <input-pair class="mb-3">
                <flight-destination-picker v-model="search.origin" place-holder="ازکجا" title="مبدا" />
                <flight-destination-picker v-model="search.destination" place-holder="به کجا" title="مقصد" />
            </input-pair>
            <a-datepicker
                v-model="date"
                class="date-input-pair mb-3"
                :jalaali.sync="jalaaliDatepicker"
                :range.sync="isDatepickerRange"
            >
                <template v-slot:before="{ on, value }">
                    <span class="date-input-pair" dir="rtl">
                        <form-input
                            :class-name="search.type === 'oneWay' ? 'one-way' : ''"
                            label="تاریخ رفت"
                            :icon="search.type === 'oneWay' ? 'calendar': ''"
                            :value="value[0] ? value[0].format('dddd DD MMMM YY') : null"
                            readonly
                            v-on="on"
                        />
                        <svgicon
                            v-show="search.type !== 'oneWay'"
                            class="pair-icon"
                            name="calendar"
                            width="28"
                            height="28"
                        />
                        <form-input
                            v-show="search.type !== 'oneWay'"
                            label="تاریخ برگشت"
                            :value="value[1] ? value[1].format('dddd DD MMMM YY') : null"
                            readonly
                            data-datepicker="1"
                            v-on="on"
                        />
                    </span>
                </template>
                <template v-slot="{ open, value }">
                    <form-input
                        label="تاریخ رفت"
                        :class-name="search.type === 'oneWay' ? 'one-way' : ''"
                        :value="value[0] ? value[0].format('dddd DD MMMM YY') : null"
                        readonly
                        :icon="search.type === 'oneWay' ? 'calendar': ''"
                        @focus="open(0)"
                    />
                    <svgicon
                        v-show="search.type !== 'oneWay'"
                        class="pair-icon"
                        name="calendar"
                        width="28"
                        height="28"
                    />
                    <form-input
                        v-show="search.type !== 'oneWay'"
                        label="تاریخ برگشت"
                        :value="value[1] ? value[1].format('dddd DD MMMM YY') : null"
                        data-datepicker="1"
                        readonly
                        @focus="open(1)"
                    />
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
            <search-button @click.prevent="startSearch" />
        </form>
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
                {value: 'roundTrip', name: 'رفت و برگشت'},
                {value: 'oneWay', name: 'یک طرفه'},
                {value: 'multiDestination', name: 'چند مسیره'}
            ]
        }
    },

    computed: {
        passengersCountText() {
            return this.passengersCount + ' مسافر' + (this.search.classType ? '، ' + this.classTypeText : '')
        }
    },

    mounted() {
        this.search = this.getLastSearch()
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
            border-radius: 10px;

            &:first-child {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            &:last-child {
                border-right: 0;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
</style>
