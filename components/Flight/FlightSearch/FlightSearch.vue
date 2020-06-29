<template>
  <div class="flightSearch">
    <form class="flight-search">
      <app-location />
      <app-select-date />
      <app-passengers />
      <app-search-button />
    </form>
  </div>
</template>


<script>
import Location from './Loaction.vue'
import SelectDate from '~/components/Flight/FlightSearch/SelectDate.vue'
import Passengers from '~/components/Flight/FlightSearch/Passengers.vue'
import SearchButton from '~/components/Flight/FlightSearch/SearchButton'

export default {
  components: {
    appLocation: Location,
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
