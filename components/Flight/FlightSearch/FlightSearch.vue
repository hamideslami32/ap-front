<template>
  <div class="flightSearch">
    <form class="flight-search">
      <app-location />
      <app-select-date />
    </form>
  </div>
</template>


<script>
import Location from './Loaction.vue'
import SelectDate from '~/components/Flight/FlightSearch/SelectDate.vue'
export default {
  components: {
    appLocation: Location,
    appSelectDate: SelectDate
  }
}
</script>


<style lang="scss" scoped>
.flightSearch {
  padding: 20px 0;
}
</style>
