<template>
  <div class="flightSearch">
    <form class="flight-search">
      <app-flight-destination-picker />
      <app-select-date />
      <app-passengers />
      <app-search-button />
    </form>
  </div>
</template>


<script>
import FlightDestinationPicker from '~/components/Flight/FlightSearch/FlightDestinationPicker'
import SelectDate from '~/components/Flight/FlightSearch/SelectDate.vue'
import Passengers from '~/components/Flight/FlightSearch/Passengers.vue'
import SearchButton from '~/components/Flight/FlightSearch/SearchButton'

export default {
    components: {
        appFlightDestinationPicker: FlightDestinationPicker,
        appSelectDate: SelectDate,
        appPassengers: Passengers,
        appSearchButton: SearchButton
    }
}
</script>


<style lang="scss" scoped>
.flightSearch {
  padding: 20px 0;
}
</style>
