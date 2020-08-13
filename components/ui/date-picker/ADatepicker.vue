<template>
    <a-dropdown ref="dropdown" class="a-datepicker">
        <template #button>
            <slot
                :on="on"
                :open="open"
                :focus="focus"
                :value="value"
                :clear="clear"
            />
        </template>
        <span
            v-if="isMobile"
            class="a-datepicker__backdrop"
        />
        <div
            class="a-datepicker__wrapper"
            :dir="jalaali ? 'rtl' : 'ltr'"
            :class="alignment"
        >
            <header class="a-datepicker__header" dir="rtl">
                <div class="px-3 px-sm-0 py-md-2">
                    <div>
                        <b-btn-close class="d-sm-none" @click="close">
                            <svgicon name="arrow-long-right" />
                        </b-btn-close>
                    </div>
                    <b class="text-center">
                        انتخاب تاریخ
                    </b>
                    <div>
                        <b-btn
                            class="btn-today d-none d-sm-inline-block float-left py-2"
                            @click="goToday"
                        >
                            برو به امروز
                        </b-btn>
                    </div>
                </div>
            </header>

            <div v-if="$slots.before || $scopedSlots.before" class="mb-2">
                <slot name="before" :open="open" :value="value" />
            </div>

            <div
                v-if="isMobile"
                class="a-datepicker__weekdays"
            >
                <span v-for="i in 7" :key="i" class="text-center">{{ weekday(i - 1) }}</span>
            </div>

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

            <transition-group
                :name="transition"
                tag="div"
                class="a-datepicker__container"
                tabindex="0"
                :class="transition"
            >
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
            </transition-group>

            <slot v-if="!isMobile" name="after" />
            <div class="a-datepicker__actions text-nowrap">
                <a-datepicker-switch :jalaali="jalaali" @click="setJalaali(!jalaali)" />
                <b-btn variant="primary" @click="close(true)">
                    تایید
                </b-btn>
            </div>
        </div>
    </a-dropdown>
</template>

<script>
import ADropdown from '../ADropdown'
import ACalendar from './ACalendar'
import calendarMixin from './calendarMixin'
import ADatepickerSwitch from '~/components/ui/date-picker/ADatepickerSwitch'

export default {
    components: {
        ADatepickerSwitch,
        ADropdown,
        ACalendar
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
            transition: 'slide-left',
            isOpen: false
        }
    },

    computed: {
        months() {
            if (process.server) return []
            const baseMonth = this.currentDate
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
            this.isMobile && this.$store.commit('setOverflow', t)
            this.scrollIntoView()
        },
        range(t) {
            if (this.isOpen) {
                if (!t && this.focus === 1) this.focus = 0
                if (t && this.value[0]) this.focus = 1
            }
        }
    },

    mounted() {
        this._clickOutsideListener = ({target}) => {
            if (
                (target && this.$el.contains(target)) ||
                target.hasAttribute('data-dropdown-prevent')
            )
                return
            this.close()
        }
        window.addEventListener('click', this._clickOutsideListener)
    },

    beforeDestroy() {
        window.removeEventListener('click', this._clickOutsideListener)
    },

    methods: {
        open(i) {
            this.$refs.dropdown.open()
            this.focus = typeof i === 'number' ? i : 0
            this.$emit('open')
        },

        close(done) {
            this.$refs.dropdown.close()
            this.focus = null
            done === true && this.$emit('done')
        },

        next(step = 1) {
            if (this.jalaali) {
                this.transition = step > 0 ? 'slide-left' : 'slide-right'
            } else {
                this.transition = step > 0 ? 'slide-right' : 'slide-left'
            }
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
                this.transition = (this.jalaali
                    ? diff > 0
                    : diff < 0)
                    ? 'slide-right'
                    : 'slide-left'
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
        background-color: $secondary;
        padding: 2px 4px;
    }
}
</style>

<style lang="scss">
.a-datepicker {
    z-index: auto;
    user-select: none;

    @media (min-width: 768px) {
        position: relative;
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
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: $white;
        padding: 70px 10px 40px;
        overflow: auto;
        z-index: 5000;
        box-shadow: 0 8px 16px rgba($black, 0.15);
        color: $gray-700;

        @media (min-width: 370px) {
            width: auto;
            height: auto;
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
        }

        @media (min-width: 768px) {
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
        position: absolute;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        padding: 20px 10px;
        outline: none !important;

        &.slide-left {
            justify-content: flex-end;
        }

        .a-datepicker__wrapper[dir=ltr] &.slide-right {
            justify-content: flex-end;
        }

        .a-datepicker__wrapper[dir=ltr] &.slide-left {
            justify-content: flex-start;
        }

        > div {
            flex: 100% 1 1;
            position: relative;

            @include transition(transform 240ms ease);
        }

        .a-datepicker__wrapper[dir=ltr] & > div::after {
            left: auto;
            right: 0;
        }

        @media (min-width: 768px) {
            position: static;
            overflow: hidden;
            flex-wrap: nowrap;
            padding: 0;
            margin: 0 -10px;

            > div {
                flex: 50% 0 0;
            }
        }
    }

    &__weekdays {
        background-color: #eee;
        display: flex;
        color: #888;
        padding: 5px 0 5px;
        z-index: 10;
        border-radius: 8px;
        font-size: 0.8em;

        > span {
            flex: 1;
        }
    }

    &__arrows {
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        z-index: 8;
        justify-content: space-between;
        padding: 0 15px;

        > button {
            display: inline-block;
            color: $gray-500;
            background-color: $gray-100;
            border: 0;
            padding: 6px;
            border-radius: 50%;
            box-shadow: none;

            &:hover,
            &:active {
                border-color: $primary;
                background-color: $primary;
                color: $white;
            }

            &:disabled {
                background-color: $gray-100;
                color: $gray-200;
                cursor: not-allowed;
            }
        }
    }

    &__header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 12;
        font-size: 1rem;
        border-bottom: 1px solid #e0e0e0;

        > div {
            display: flex;
            position: relative;
            z-index: 14;
            align-items: center;

            > div {
                flex: 1;
            }
        }

        .close {
            font-size: 32px;
            padding: 12px;
            opacity: 1;
            color: $primary;
            position: static;
        }

        .form-control.focus {
            border-color: $primary;
        }

        @media (min-width: 768px) {
            position: static;
            border-bottom: 1px solid rgba($black, 0.1);
            margin-bottom: 15px;
            font-size: 0.875rem;
        }
    }

    .btn {
        font-size: inherit;
    }

    hr {
        border-color: rgba($black, 0.1);
    }

    .min-width-0 {
        min-width: 0;
    }

    &__actions {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        direction: rtl;

        .btn {
            width: 120px;
            font-size: 13px;
            max-width: 100%;
        }
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

@media (min-width: 768px) {
    .slide-left {
        &-enter {
            transform: translate3d(-100%, 0, 0);
        }

        &-leave-to {
            transform: translate3d(100%, 0, 0);
        }
    }

    .slide-right {
        &-enter {
            transform: translate3d(100%, 0, 0);
        }

        &-leave-to {
            transform: translate3d(-100%, 0, 0);
        }
    }
}
</style>
