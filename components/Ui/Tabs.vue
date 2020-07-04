<template>
  <div class="tabs">
    <ul ref="menu" class="tabs__menu">
      <li v-for="(tab, i) in tabs" :key="i" :class="{ active: value === (tab.value || i) }" @click="selectTab(tab, i)">
        {{ tab.name }}
      </li>
    </ul>
    <span :style="{ 'right': `${tabOffset}px`, 'width': `${tabWidth}px` }" class="tabs__active" />
  </div>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            tabWidth: 0,
            tabOffset: 0
        }
    },
    watch: {
        value: 'updateWidth'
    },
    mounted() {
        this.updateWidth()
    },
    methods: {
        selectTab(tab, i) {
            this.$emit('input', tab.value || i)
        },
        updateWidth() {
            this.$nextTick(() => {
                const tabElement = this.$refs.menu.children[this.tabs.findIndex(t => t.value === this.value)]
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
        background: $lightGrayColor;
        border: 1px solid #DDDDDD;
        border-radius: 100px;
        padding: 0;
        margin: 0;

        > li {
            font-size: 13px;
            line-height: 42px;
            list-style: none;
            min-width: 100px;
            text-align: center;
            flex: 1;
            transition: color ease 250ms;

            &.active {
                font-weight: 600;
                color: #FFFFFF;
                z-index: 2;
            }
        }
    }

    &__active {
        background-color: $blackColor;
        transition: all 250ms ease;
        position: absolute;
        border-radius: 100px;
        top: 0;
        bottom: 0;
        width: 118px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        color: $whiteColor;
        z-index: 1;
    }
}
</style>
