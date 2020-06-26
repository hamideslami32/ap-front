<template>
  <div class="flights">
    <app-tabs></app-tabs>
  </div>
</template>


<script>
import Tabs from '../components/Mobile/Tabs/Tabs.vue'
export default {
  components: {
    appTabs: Tabs
  },
  layout: 'MobileLayout'
};
</script>