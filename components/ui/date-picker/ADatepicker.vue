<template>
    <div class="a-datepicker">
        <slot
            :on="on"
            :open="open"
            :focus="focus"
            :value="value"
            :clear="clear"
        />
        <b-modal-static
            :visible="isOpen"
            hide-footer
            header-class="p-0"
            body-class="p-0 no-scroll"
            no-close-on-backdrop
            no-fade
        >
            <template #modal-header>
                <div class="w-100">
                    <div class="px-2 py-3 text-center">
                        <div class="d-flex justify-content-end float-left">
                            <button type="button" class="btn-raw" @click="close()">
                                <svgicon name="arrow-left" />
                            </button>
                        </div>
                        <b>
                            انتخاب تاریخ
                        </b>
                    </div>
                    <div v-if="$slots.before || $scopedSlots.before">
                        <slot name="before" :open="open" :value="value" :focus="focus" />
                    </div>
                    <div
                        v-if="isMobile"
                        class="a-datepicker__weekdays"
                    >
                        <span v-for="i in 7" :key="i" class="text-center">{{ weekday(i - 1) }}</span>
                    </div>
                </div>
            </template>
            <div
                class="a-datepicker__wrapper"
                :dir="jalaali ? 'rtl' : 'ltr'"
                :class="[alignment, isMobile ? 'a-datepicker--mobile' : 'a-datepicker--desktop']"
            >
                <div v-if="!isMobile" class="a-datepicker__arrows">
                    <b-btn
                        :disabled="disablePreviousMonth"
                        @click="next(-1)"
                    >
                        <svgicon v-if="jalaali" size="18" name="arrow-right" class="d-block" />
                        <svgicon v-else size="18" src="arrow-left" class="d-block" />
                    </b-btn>
                    <b-btn
                        :disabled="disableNextMonth"
                        @click="next(1)"
                    >
                        <svgicon v-if="jalaali" size="18" src="arrow-left" class="d-block" />
                        <svgicon v-else size="18" src="arrow-right" class="d-block" />
                    </b-btn>
                </div>

                <div class="a-datepicker__container" tabindex="0">
                    <div
                        v-for="month in months"
                        :key="month.unix()"
                        class="pb-0-md pb-4"
                    >
                        <a-calendar
                            ref="calendar"
                            class="mx-auto"
                            :date="month"
                            :value="value"
                            :jalaali="jalaali"
                            :range="range"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :day-classes="dayClasses"
                            @input="onDayClick"
                        >
                            <template v-if="$scopedSlots.day" slot-scope="props">
                                <slot
                                    name="day"
                                    v-bind="props"
                                    :focus="focus"
                                    :open="isOpen"
                                />
                            </template>
                        </a-calendar>
                    </div>
                </div>

                <slot v-if="!isMobile" name="after" />
            </div>

            <sticky-bottom class="text-3">
                <a-datepicker-switch :jalaali="jalaali" @click="setJalaali(!jalaali)" />
                <a-btn wrapper-class="mr-2" variant="primary" shadow @click="close(true)">
                    تایید
                </a-btn>
            </sticky-bottom>
        </b-modal-static>
    </div>
</template>

<script>
import ACalendar from './ACalendar'
import calendarMixin from './calendarMixin'
import ADatepickerSwitch from '~/components/ui/date-picker/ADatepickerSwitch'
import StickyBottom from '@/components/ui/StickyBottom'
import BModalStatic from '~/components/ui/b-modal-static'

export default {
    components: {
        StickyBottom,
        ADatepickerSwitch,
        ACalendar,
        BModalStatic
    },

    mixins: [calendarMixin],

    props: {
        value: {
            type: Array,
            default: () => []
        },

        range: {
            type: Boolean,
            default: false
        },

        minRange: {
            type: Number,
            default: 0
        },

        // Auto close after select (no confirm button)
        autoClose: {
            type: Boolean,
            default: false
        },

        // Align date picker to the 'start, end or null (center)' container
        alignment: {
            type: String,
            default: null
        }
    },

    data() {
        const [v] = this.value || []
        return {
            currentDate: v || this.dayjs().startOf('month').startOf('day'),
            focus: null,
            isOpen: false
        }
    },

    computed: {
        months() {
            if (process.server) return []
            const baseMonth = this.dayjs(this.currentDate.toDate())
            if (!this.isMobile) {
                return [baseMonth, baseMonth.add(1, 'month')]
            }

            const monthLength = this.dayjs(this.maxDate).diff(this.dayjs(this.minDate), 'month')
            return new Array(monthLength)
                .fill(1)
                .map((el, i) => this.dayjs(this.minDate).startOf('month').add(i, 'month'))
        },

        disablePreviousMonth() {
            const month = this.months[0]
            return !month || month.isBefore(this.dayjs(this.minDate), 'month')
        },

        disableNextMonth() {
            const month = this.months[this.months.length - 1]
            return !month || month.isAfter(this.dayjs(this.maxDate), 'month')
        },

        isRangePropSync() {
            return !!this.$listeners['update:range']
        },

        on() {
            const self = this
            return {
                focus(e) {
                    self.open(e ? e.target.getAttribute('data-datepicker') * 1 : 0)
                    e && e.target.blur && e.target.blur()
                    e && e.preventDefault()
                },
                input(value) {
                    self.open(self.focus)
                    if ((value || '').trim().match(/^\d{4}\/\d{2}\/\d{2}$/i)) {
                        value = self.dayjs(value, {jalali: self.jalaali}).startOf('day')
                        const newValue = self.value.slice()
                        newValue[self.focus] = value
                        self.$emit('input', newValue, self)

                        const diff = value.diff(self.currentDate, 'month')
                        if (diff > 1 || diff < 0) {
                            self.currentDate = value.startOf('month')
                        }
                    }
                    if (!value) {
                        self.clear(self.focus)
                    }
                },
                keyup(e) {
                    if (!self.value[self.focus]) return
                    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                        e.preventDefault()
                        const newValue = self.value.slice()
                        newValue[self.focus] = newValue[self.focus].add(e.key === 'ArrowUp' ? 1 : -1, 'day')
                        self.$emit('input', newValue, self)
                    }
                }
            }
        }
    },

    watch: {
        minDate(t) {
            if (t) {
                const indexes = (this.value || [])
                    .map((d, i) => this.dayjs(d).isBefore(t, 'day') ? i : null)
                    .filter((el) => el != null)
                indexes.length > 1 ? this.clear() : indexes.forEach(this.clear)
            }
        },
        maxDate(t) {
            if (t) {
                const indexes = (this.value || [])
                    .map((d, i) => this.dayjs(d).isAfter(t, 'day') ? i : null)
                    .filter((el) => el != null)
                indexes.length > 1 ? this.clear() : indexes.forEach(this.clear)
            }
        },
        jalaali() {
            this.currentDate = (this.value[0] || this.dayjs()).startOf('month')
            setTimeout(this.scrollIntoView, 500)
        },
        isOpen(t) {
            !this.isMobile &&
            !t &&
            this.value[0] &&
            setTimeout(() => {
                this.currentDate = this.value[0]
                    .startOf('month')
                    .startOf('day')
            }, 200)

            // Scroll to month on mobile view;
            this.scrollIntoView()
        },
        range(t) {
            if (this.isOpen) {
                if (!t && this.focus === 1) this.focus = 0
                if (t && this.value[0]) this.focus = 1
            }
        }
    },

    methods: {
        open(i) {
            this.isOpen = true
            this.focus = typeof i === 'number' ? i : 0
            this.$emit('open')
        },

        close(done) {
            this.isOpen = false
            this.focus = null
            done === true && this.$emit('done')
        },

        next(step = 1) {
            this.currentDate = this.currentDate
                .add(step, 'month')
                .startOf('month')
        },

        onDayClick(day, vm, classes) {
            if (classes.before) return
            let {focus, minRange} = this
            focus = focus != null ? focus : 0
            const value = (this.value || []).slice()

            if (focus === 0 && value[1] && value[1].isBefore(day)) {
                value[1] = null
            }
            if (focus === 1 && value[0] && value[0].isAfter(day)) {
                this.focus = focus = 0
            }

            // Check minimum valid range
            if (
                focus === 1
                    ? value[0] && day.diff(value[0], 'days') < minRange
                    : value[1] && value[1].diff(day, 'days') < minRange
            ) {
                if (!focus) value[1] = null
                else return
            }

            value[focus] = day
            this.$emit('input', value, vm)

            // Switch to next
            if (focus === 0 && this.range) {
                this.focus = 1
            }
            if (focus === 1 || (!this.range && focus === 0)) this.focus = null

            // Auto close
            if (
                this.autoClose &&
                value.filter(Boolean).length === (this.range ? 2 : 1)
            ) {
                this.close(true)
            }
        },

        clear(i) {
            if (typeof i === 'number') {
                const value = this.value.slice()
                value[i] = null
                this.$emit('input', value)
                this.focus = value.findIndex((el) => el === null)
                this.$emit('clear', i)
            } else {
                this.range
                    ? this.$emit('input', [null, null])
                    : this.$emit('input', [null])
                this.$emit('clear')
            }
        },

        goToday() {
            const today = this.dayjs().startOf('day')
            const diff = Math.ceil(this.currentDate.diff(today, 'month', true))
            if (diff !== 0 && diff !== -1) {
                this.currentDate = today
                    .startOf('month')
            }
            // this.onDayClick(today);

            // F
            setTimeout(this.flashToday, 100)
        },

        flashToday() {
            const el = this.$el.querySelector('.calendar__day .btn-today')
            if (el) {
                const animation = 'flashing'
                el.classList.add(animation)
                el.addEventListener('animationend', () =>
                    el.classList.remove(animation))
            }
        },

        scrollIntoView() {
            if (this.isMobile) {
                this.$nextTick(() => {
                    let el =
                        this.$el.querySelector('.calendar__day.selected') ||
                        this.$el.querySelector('.calendar__day.today')
                    for (let i = 0; i < 4; i++)
                        el = el && el.parentNode ? el.parentNode : null
                    el && el.scrollIntoView()
                })
            }
        },

        setJalaali(x) {
            this.$emit('update:jalaali', x)
        },

        setRange(x) {
            this.$emit('update:range', x)
        }
    }
}
</script>

<style lang="scss">
@keyframes flashing {
    0%,
    100% {
        box-shadow: 0 0 0 0 transparent;
    }

    50% {
        box-shadow: 0 0 0 5px rgba($primary, 0.5);
    }
}

.btn-today {
    border: 1px solid $gray-300;
    position: relative;
    border-radius: 4px;
    box-shadow: none;

    &::before {
        $width: 4px;

        content: ' ';
        display: block;
        position: absolute;
        top: -$width;
        right: -$width;
        border: $width solid transparent;
        border-bottom-color: inherit;
        transform: rotate(45deg);
        z-index: 5;
    }

    &.flashing {
        animation: flashing 0.4s 3 linear;
        animation-fill-mode: both;
    }
}

.btn-clear {
    padding: 0;
    appearance: none;
    border: 0;
    outline: 0;
    color: $gray-200;
    box-shadow: none;
    vertical-align: middle;

    &:hover {
        color: $gray-400;
    }
}

.a-datepicker-tooltip {
    z-index: 5000;

    .tooltip-inner {
        background-color: map_get($grays, '800');
        padding: 2px 4px;
    }
}
</style>

<style lang="scss">
.a-datepicker {
    z-index: auto;
    user-select: none;

    .btn-wrapper {
        min-width: 120px;
        height: 40px;

        button {
            width: 100%;
            height: 100%;
        }
    }

    .input-group.focus {
        &::after {
            content: ' ';
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            height: 3px;
            z-index: 5;
            background-color: $primary;
        }
    }

    &__wrapper {
        color: $gray-700;
        overflow: scroll;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding-top: 10px;
        -webkit-overflow-scrolling: touch;

        .a-datepicker--desktop & {
            position: absolute;
            padding: 0 15px 10px;
            top: 100%;
            right: 50%;
            transform: translateX(50%);
            margin-top: 5px;
            width: 550px;
            height: auto;
            bottom: auto;
            overflow: hidden;

            &.end {
                transform: none;
                left: 0;
                right: auto;
            }

            &.start {
                transform: none;
                right: 0;
                left: auto;
            }
        }
    }

    &__container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        overflow: auto;
        padding: 0px 10px 40px;
        outline: none !important;
        z-index: 0;

        > div {
            flex: 100% 1 1;
            position: relative;
        }
    }

    &__weekdays {
        background-color: #eee;
        display: flex;
        color: #888;
        padding: 5px 2%;
        z-index: 10;
        font-size: 0.8em;
        margin: 0 auto;

        > span {
            flex: 1;
        }
    }

    .btn {
        font-size: inherit;
    }

    hr {
        border-color: rgba($black, 0.1);
    }
}

.separator {
    display: inline-block;
    width: 10px;
    height: 1px;
    background-color: $gray-700;
    vertical-align: middle;
    margin: 0 10px;
}

.a-datepicker .modal {
    animation: none !important;
}

.no-scroll {
    overflow: hidden;
}
</style>
