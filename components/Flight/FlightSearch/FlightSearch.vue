<template>
  <div>
    <form action="#">
      <tabs v-model="search.type" class="mb-3" :tabs="tabs" />
      <flight-destination-picker />
      <select-date />
      <passengers />
      <search-button @click.prevent="startSearch" />
    </form>
  </div>
</template>


<script>
import FlightDestinationPicker from '~/components/Flight/FlightSearch/FlightDestinationPicker'
import SelectDate from '~/components/Flight/FlightSearch/SelectDate'
import Passengers from '~/components/Flight/FlightSearch/Passengers'
import SearchButton from '~/components/Flight/FlightSearch/SearchButton'
import Tabs from '~/components/Ui/Tabs'

export default {
    components: {
        FlightDestinationPicker,
        SelectDate,
        Passengers,
        SearchButton,
        Tabs
    },
    data() {
        return {
            tabs: [
                { value: 'roundTrip', name: 'رفت و برگشت' },
                { value: 'oneWay', name: 'یک طرفه' },
                { value: 'multiDestination', name: 'چند مسیره' }
            ],
            search: {
                type: 'roundTrip', // oneWay, roundTrip, multiDestination
                origin: null,
                destination: null,
                departing: null,
                returning: null,
                adult: 1,
                child: 0,
                infant: 0,
                class: 'economy'
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
