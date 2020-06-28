<template>
  <div class="navs">
    <app-button v-for="list in lists" :key="list.id" :item="list" />
  </div>
</template>


<script>
import Button from './Button.vue'

export default {
  components: {
    appButton: Button
  },
  data() {
    return {
      lists: [
        { name: 'جستجوی پرواز', icon: 'flight', url: '/flights', id: 1 },
        { name: 'جستجوی هتل', icon: 'hotel', url: '/hotels', id: 2 },
        { name: 'جستجوی تور', icon: 'tour', url: '/tours', id: 3 }
      ]
    }
  }
}
</script>

<style lang='scss'>
.navs {
  padding: 20px 0;
  overflow: auto;
  text-align: right;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>