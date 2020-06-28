<template>
  <div class="flightSearch">
    <form class="flight-search">
      <app-location />
    </form>
  </div>
</template>


<script>
import Location from './Loaction.vue'
export default {
  components: {
    appLocation: Location
  }
}
</script>


<style lang="scss" scoped>
.flightSearch {
  padding: 20px 0;
}
</style>
