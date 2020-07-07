<template>
    <div>
        <form action="#">
            <tabs v-model="search.type" class="mb-3" :tabs="tabs" />
            <flight-destination-picker class="mb-3" :type="search.name" />
            <a-datepicker class="date-input-pair mb-3" :jalaali.sync="jalaaliDatepicker">
                <template v-slot="{ open }">
                    <form-input label="تاریخ رفت" icon="calendar" :value="$dayjs().format('DD MMMM YY')" @focus="open(0)" />
                    <form-input label="تاریخ برگشت" @focus="open(1)" />
                </template>
            </a-datepicker>
            <passengers-picker />
            <search-button @click.prevent="startSearch" />
        </form>
    </div>
</template>


<script>
import FlightDestinationPicker from '~/components/Flight/FlightSearch/FlightDestinationPicker'
import PassengersPicker from '~/components/Flight/FlightSearch/PassengersPicker'
import SearchButton from '~/components/Flight/FlightSearch/SearchButton'
import ADatepicker from '~/components/Ui/DatePicker/ADatepicker'
import Tabs from '~/components/Ui/Tabs'
import FormInput from '~/components/Ui/Form/FormInput'

export default {
    components: {
        FormInput,
        FlightDestinationPicker,
        PassengersPicker,
        SearchButton,
        ADatepicker,
        Tabs
    },
    data() {
        return {
            jalaaliDatepicker: false,
            tabs: [
                {value: 'roundTrip', name: 'رفت و برگشت'},
                {value: 'oneWay', name: 'یک طرفه'},
                {value: 'multiDestination', name: 'چند مسیره'}
            ],
            search: {
                type: 'roundTrip', // oneWay, roundTrip, multiDestination,
                origin: null, //object  i, title, value
                destination: null, //object  i, title, value
                departing: null,
                returning: null,
                adult: 1,
                child: 0,
                infant: 0,
                class: 'economy' // business first
            }
        }
    },
    methods: {
        startSearch() {
            // TODO: redirect to flight available page this.$router.push('/...')
        }
    }
}
</script>

<style lang="scss">
    .date-input-pair {
        display: flex;
        > div {
            flex: 50% 1 0;
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
