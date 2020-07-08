<template>
    <div :is="tag" class="position-relative" :class="{ open: isOpen }">
        <slot
            name="button"
            :on="on"
            :is-open="isOpen"
            :open="open"
            :close="close"
            :toggle="toggle"
        />
        <transition :is="transition" name="v-dropdown">
            <div v-if="isOpen" ref="dropdown" class="v-dropdown">
                <slot :is-open="isOpen" />
            </div>
        </transition>
    </div>
</template>

<script>
import { BVCollapse } from 'bootstrap-vue/src/utils/bv-collapse'

export default {
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String,
            default: 'click'
        },
        togglable: {
            type: Boolean,
            default: false
        },
        overflow: {
            type: String,
            default: 'flip' // flip, scroll
        },
        slide: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: this.show
        }
    },

    computed: {
        on() {
            return this.event === 'click' ? {
                click: (e) => {
                    e.preventDefault()
                    this.togglable ? this.toggle() : this.open()
                }
            } : {
                focus: (e) => {
                    this.lock()
                    this.open()
                },
                blur: (e) => {
                    this.close()
                }
            }
        },
        transition() {
            return this.slide ? BVCollapse : 'transition'
        }
    },

    watch: {
        isOpen(t) {
            if (t) {
                setTimeout(() => {
                    this.addEventListeners()
                }, 200)
            }
            this.$emit(t ? 'open' : 'close')
        }
    },

    beforeDestroy() {
        this.removeEventListeners()
    },

    methods: {
        open() {
            this.isOpen = true
        },
        close() {
            if (this._lock) return
            this.isOpen = false
        },
        toggle() {
            this.isOpen ? this.close() : this.open()
        },
        windowListener({ target }) {
            if (target) {
                if (
                    target === this.$el ||
                    this.$el.contains(target) ||
                    target.hasAttribute('disable-dropdown')
                )
                    return
            }
            this.close()
            this.removeEventListeners()
        },
        addEventListeners() {
            window.addEventListener('click', this.windowListener)
            window.addEventListener('touchend', this.windowListener)
        },
        removeEventListeners() {
            window.removeEventListener('click', this.windowListener)
            window.removeEventListener('touchend', this.windowListener)
        },
        lock(ms = 200) {
            this._lock = true
            setTimeout(() => {
                this._lock = false
            }, ms)
        }
    }
}
</script>

<style lang="scss">
.pretty-scroll {
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: map_get($grays, '300');
        border-radius: 4px;
    }
}

.v-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: $white;
    z-index: 500;
    min-width: 100%;
    border-radius: 3px;
    box-shadow: 0 0 6px rgba($black, 0.1);

    &.up {
        top: auto;
        bottom: 100%;
    }

    @media (max-width: 767px) {
        &.full {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 2000;
            margin: 0;
            width: auto;
            max-width: none;
        }
    }

    @extend .pretty-scroll;

    &-enter-active,
    &-leave-active {
        @include transition(all 80ms linear);
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
}
</style>
