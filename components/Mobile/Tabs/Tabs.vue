<template>
  <div class="tabs" ref="elementRef">
    <app-tab
      v-for="tab in tabList"
      :key="tab.id"
      :item="tab"
      :handleClick="handleClick"
      :class="{actived: activeElement == tab.id }"
    ></app-tab>
    <span :style="{'transform': `translateX(${activeTab}px)`}" class="tabs__active"></span>
  </div>
</template>

<script>
import Tab from './Tab.vue';
export default {
  data() {
    return {
      tabList: [
        { name: 'رفت و برگشت', id: 1 },
        { name: 'یک طرفه', id: 2 },
        { name: 'چند مسیره', id: 3 }
      ],
      activeElement: 1,
      activeTab: 1
    };
  },
  components: {
    appTab: Tab
  },
  methods: {
    handleClick: function(el) {
      const elementWidth = this.$refs.elementRef.clientWidth;
      this.activeElement = el;
      if (el === 2) {
        if (this.tabList.length <= 2) {
          this.activeTab = -(elementWidth - elementWidth / 3);
          return;
        }
        this.activeTab = -(elementWidth / 3);
        return;
      }
      if (el === 3) {
        this.activeTab = -(elementWidth - elementWidth / 3);
        return;
      }
      this.activeTab = 0;
    }
  }
};
</script>

<style lang='scss' scoped>
.tabs {
  position: relative;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(17, 17, 17, 0.001);
  border: 1px solid #ddd;
  border-radius: 100px;

  &__active {
    background-color: #444;
    transition: all 250ms ease;
    position: absolute;
    right: 0;
    border-radius: 100px;
    height: 40px;
    width: 118px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    color: #fff;
  }
}
</style>