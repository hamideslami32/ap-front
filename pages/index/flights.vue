<template>
  <div class="flights">
    <app-tabs />
    <app-flight-search />
  </div>
</template>


<script>
import Tabs from '~/components/Tabs/Tabs.vue'
import FlightSearch from '~/components/Flight/FlightSearch/FlightSearch.vue'

export default {
  components: {
    appTabs: Tabs,
    appFlightSearch: FlightSearch,
  }
}
</script>