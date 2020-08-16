<template>
    <div class="tabs">
        <ul ref="menu" class="tabs__menu">
            <li v-for="(tab, i) in tabs" :key="i" :class="{ active: value === (tab.value || i), 'disable': tab.disable }">
                <a href="#" @click.prevent="selectTab(tab, i)">
                    {{ tab.name }}
                </a>
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
                if (!tabElement) {
                    // eslint-disable-next-line no-console
                    console.warn('Value not defined in tabs')
                    this.tabWidth = 0
                    return
                }
                this.tabWidth = tabElement.offsetWidth - 10
                this.tabOffset = this.$refs.menu.offsetWidth - tabElement.offsetLeft - tabElement.offsetWidth
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.tabs {
    position: relative;

    &__menu {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background: $lightGrayColor;
        border: 1px solid #dddddd;
        border-radius: 100px;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;

        > li {
            min-width: 100px;
            flex: 1;
            transition: color ease 250ms;

            > a {
                font-size: 13px;
                line-height: 42px;
                display: inline-block;
                color: inherit;
                text-decoration: none !important;
                white-space: nowrap;
            }

            &.active {
                font-weight: 600;
                color: #ffffff;
                z-index: 2;
            }

            &.disable {
                opacity: 0.5;
                pointer-events: none;
            }
        }
    }

    &__active {
        background-color: $black;
        transition: all 250ms ease;
        position: absolute;
        border-radius: 100px;
        top: 0;
        bottom: 0;
        width: 118px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        color: $white;
        z-index: 1;
        transform: translateY(5px);
        height: 75%;
        margin: 0 5px;
    }
}
</style>
