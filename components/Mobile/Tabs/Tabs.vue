<template>
  <div class="tabs">
    <ul ref="menu" class="tabs__menu">
      <app-tab
        v-for="(tab, i) in tabList"
        :key="i"
        :item="tab"
        :class="{active: activeTab == i }"
        @click="selectTab(i)"
      />
    </ul>
    <span
      :style="{'right': `${tabOffset}px`, 'width': `${tabWidth}px`}"
      class="tabs__active"
    />
  </div>
</template>

<script>
import Tab from './Tab.vue'
export default {
  components: {
    appTab: Tab
  },
  data() {
    return {
      tabList: [
        { name: 'رفت و برگشت' },
        { name: 'یک طرفه' },
        { name: 'چند مسیره' }
      ],
      activeTab: 0,
      tabWidth: 0,
      tabOffset: 0
    }
  },
  watch: {
    activeTab: 'updateWidth'
  },
  mounted() {
    this.updateWidth()
  },
  methods: {
    selectTab(i) {
      this.activeTab = i
    },
    updateWidth() {
      this.$nextTick(() => {
        const tabElement = this.$refs.menu.children[this.activeTab]
        this.tabWidth = tabElement.offsetWidth
        this.tabOffset = this.$refs.menu.offsetWidth - tabElement.offsetLeft - tabElement.offsetWidth
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.tabs {
  position: relative;
  height: 40px;

  &__menu {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgba(17, 17, 17, 0.001);
    border: 1px solid #ddd;
    border-radius: 100px;
    padding: 0;
    margin: 0;
  }

  &__active {
    background-color: #444;
    transition: all 250ms ease;
    position: absolute;
    border-radius: 100px;
    top: 0;
    bottom: 0;
    width: 118px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    color: #fff;
    z-index: 1;
  }
}
</style>