<template>
  <div class="flights">
    <app-tabs />
    <app-flight-search />
  </div>
</template>


<script>
import Tabs from '~/components/Mobile/Tabs/Tabs.vue'
import FlightSearch from '~/components/Mobile/FlightSearch/FlightSearch.vue'

export default {
  components: {
    appTabs: Tabs,
    appFlightSearch: FlightSearch
  }
}
</script>