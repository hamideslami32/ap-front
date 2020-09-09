<template>
    <div class="a-slider" :class="{ disabled, active: focus != null, 'a-slider--sticky-tooltip': stickyTooltip }">
        <slot :progress-style="progressStyle" />
        <div ref="bar" class="a-slider__bar">
            <span
                ref="startDot"
                class="a-slider__dot"
                :class="{ active: focus === 0 }"
                :style="{ left: startDotLeft + '%' }"
                :tabindex="disabled ? false : tabindex"
                :aria-disabled="disabled"
                @keydown="dotKeydown"
            />
            <span class="a-slider__progress" style="width: 100%; backgroundColor: #e7def7;" />
            <span class="a-slider__progress" :style="progressStyle" />
            <span
                ref="endDot"
                class="a-slider__dot"
                :class="{ active: focus === 1 }"
                :style="{ left: endDotLeft + '%' }"
                :tabindex="disabled ? false : tabindex"
                :aria-disabled="disabled"
                @keydown="dotKeydown"
            />

            <span
                v-show="!merged"
                ref="startTooltip"
                class="a-slider__tooltip"
                data-tooltip="1"
                :style="stickyTooltip ? { left: startDotLeft + '%' } : { left: '-12px' }"
            >
                <slot :value="localValue[0]" :index="0" name="tooltip">
                    {{ localValue[0] }}
                </slot>
            </span>
            <span
                v-show="!merged"
                ref="endTooltip"
                class="a-slider__tooltip"
                data-tooltip="2"
                :style="stickyTooltip ? { left: endDotLeft + '%' } : { right: '-12px' }"
            >
                <slot :value="localValue[1]" :index="1" name="tooltip">
                    {{ localValue[1] }}
                </slot>
            </span>
            <span v-show="merged" class="a-slider__tooltip" dir="ltr" :style="{ left: (startDotLeft + endDotLeft) / 2 + '%' }">
                <slot :value="localValue[0]" :index="0" name="tooltip">
                    {{ localValue[0] }}
                </slot>
                <slot :value="localValue[1]" :index="1" name="tooltip">
                    {{ localValue[1] }}
                </slot>
            </span>
        </div>
    </div>
</template>

<script>
const addEventListener = (el, handler, ...events) => events.forEach(ev => el.addEventListener(ev, handler, {passive: false}))
const removeEventListener = (el, handler, ...events) => events.forEach(ev => el.removeEventListener(ev, handler))

const getPos = (e, elem) => {
    e = 'targetTouches' in e ? e.targetTouches[0] : e

    const { body, documentElement } = document
    const rect = elem.getBoundingClientRect()

    return e.pageX - rect.left +
            (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || body.clientLeft || 0)
}

const clamp = (x, min, max) => Math.max(min, Math.min(max, x))

const round = (number, increment) => Math.round((number) / increment ) * increment

export default {
    props: {
        value: {
            type: Array,
            default: () => [null, null]
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        disabled: {
            type: Boolean,
            default: false
        },
        step: {
            type: Number,
            default: 1
        },
        lazy: {
            type: Boolean,
            default: true
        },
        tabindex: {
            type: [String, Number],
            default: -1
        },

        // Stick tooltip to slider dots
        stickyTooltip: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            focus: null,
            localValue: null,
            merged: false
        }
    },
    computed: {
        startDotLeft() {
            const { min, max, localValue } = this
            const v = localValue[0]
            return (((v != null ? v : min) - min) / (max - min)) * 100
        },
        endDotLeft() {
            const { min, max, localValue } = this
            const v = localValue[1]
            return (((v != null ? v : max) - min) / (max - min)) * 100
        },
        progressStyle() {
            const left = Math.min(this.startDotLeft, this.endDotLeft)
            return {
                left: left + '%',
                width: Math.abs(this.endDotLeft - this.startDotLeft) + '%'
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(t) {
                this.localValue = t.map((el, i) => el != null ? el : [this.min, this.max][i])
            }
        }
    },
    mounted() {
        this.bindEvents()
        if (this.stickyTooltip) {
            this.$nextTick(this.handleOverlap)
            this.$watch('localValue', this.handleOverlap, { deep: true })
        }
    },
    methods: {
        bindEvents() {
            const { startDot, endDot } = this.$refs;
            [startDot, endDot].forEach((dot, i) => {
                addEventListener(dot, (e) => this.dragStart(e, i), 'mousedown', 'touchstart')
            })
        },
        dragStart(e, focus) {
            e.preventDefault()
            if (this.disabled) return
            this.focus = focus
            const moveHandler = this.setValueByEvent
            const endHandler = () => {
                removeEventListener(document, moveHandler, 'mousemove', 'touchmove')
                removeEventListener(document, endHandler, 'mouseup', 'touchend')
                this.$emit('input', this.localValue.slice())
                this.focus = null
            }
            addEventListener(document, moveHandler, 'mousemove', 'touchmove')
            addEventListener(document, endHandler, 'mouseup', 'touchend')
        },
        setValueByEvent(e) {
            e.preventDefault()
            const { bar } = this.$refs
            const { min, max } = this

            let value = getPos(e, bar) / bar.offsetWidth
            value = (value * (max - min)) + min
            this.setValue(value, this.focus)
        },
        dotKeydown(e) {
            const focus = e.target === this.$refs.startDot ? 0 : 1
            const v = this.localValue[focus]
            switch (e.key) {
            case 'ArrowLeft':
                this.setValue(v - this.step, focus)
                break
            case 'ArrowRight':
                this.setValue(v + this.step, focus)
                break
            default:
                return
            }
            e.preventDefault()
        },
        setValue(value, focus) {
            const { min, max, localValue } = this

            if (Array.isArray(value)) {
                return value.forEach((el, i) => this.setValue(el, i))
            }
            value = round(value, this.step)
            value = clamp(value, min, max)

            // Swap dots if crossed
            if ((focus === 0 && value > localValue[1]) || (focus === 1 && value < localValue[0])) {
                this.$set(localValue, focus, localValue[!focus * 1])
                this.focus = focus = !focus * 1
            }

            this.$set(localValue, focus, value)
            if (!this.lazy) {
                this.$emit('input', localValue.slice())
            }
        },
        handleOverlap() {
            const [v0, v1] = this.localValue
            if (this.merged) {
                if (Math.abs(v1 - v0) > this._mergedValue) {
                    this.merged = false
                }
                return
            }
            const { startTooltip, endTooltip } = this.$refs
            const startDotRect = startTooltip.getBoundingClientRect()
            const endDotRect = endTooltip.getBoundingClientRect()
            this.merged = startDotRect.right > endDotRect.left
            this._mergedValue = Math.abs(v1 - v0)
        }
    }
}
</script>

<style lang="scss">
    .a-slider {
        $thickness: 4px;
        $dotSize: 20px;
        padding: 20px 10px  50px;

        &__bar {
            position: relative;
            height: $thickness;
            background-color: map_get($grays, '200');
            border-radius: $thickness;
        }

        &__dot {
            width: $dotSize * 3 / 2;
            height: $dotSize;
            box-shadow: 0 0 10px rgba($black, 0.05);
            border: solid 1px map_get($grays, '200');
            background-color: $white;
            border-radius: 5px;
            position: absolute;
            top: -($dotSize - $thickness) / 2;
            margin-left: -($dotSize * 3 / 2) / 2;
            z-index: 3;
            cursor: pointer;
            transition: background-color ease 150ms, border-color ease 150ms, transform ease 150ms;

            &:focus, &.active {
                outline: none;
                background-color: $primary;
                border-color: $primary;
                transform: scale(1.3);

                &::after, &::before {
                    background-color: $white;
                }
            }

            &::after, &::before {
                content: ' ';
                position: absolute;
                top: 5px;
                left: 43%;
                bottom: 5px;
                width: 2px;
                border-radius: 5px;
                background-color: $primary;
            }

            &::after {
                left: 58%;
            }
        }

        &__progress {
            position: absolute;
            top: 0;
            bottom: 0;
            background-color: rgba(73, 35, 140, 0.6);
            border-radius: $thickness;
            transition: background-color ease 150ms;
        }

        &.active &__progress {
            background-color: rgba($primary, 0.6);
        }

        &__tooltip {
            position: absolute;
            top: 100%;
            margin-top: 20px;
            font-size: 1rem;
            white-space: nowrap;
            text-align: center;
            color: map_get($grays, '800');
        }

        &--sticky &__tooltip {
            transform: translateX(-50%);
        }

        &.disabled {
            .a-slider__bar {
                background-color: map_get($grays, '100');
            }
            .a-slider__progress {
                background-color: map_get($grays, '200');
            }

            .a-slider__dot {
                pointer-events: none;
                box-shadow: none;
                cursor: not-allowed;
            }
        }
    }
</style>
