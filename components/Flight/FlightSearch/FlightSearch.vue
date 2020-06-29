<template>
  <div class="flightSearch">
    <form class="flight-search">
      <app-location />
      <app-select-date />
      <app-passengers />
    </form>
  </div>
</template>


<script>
import Location from './Loaction.vue'
import SelectDate from '~/components/Flight/FlightSearch/SelectDate.vue'
import Passengers from '~/components/Flight/FlightSearch/Passengers.vue'

export default {
  components: {
    appLocation: Location,
    appSelectDate: SelectDate,
    appPassengers: Passengers
  }
}
</script>


<style lang="scss" scoped>
.flightSearch {
  padding: 20px 0;
}
</style>
