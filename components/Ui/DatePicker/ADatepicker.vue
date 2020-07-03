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
        <div class="px-sm-0 font-weight-normal py-md-2">
          <div>
            <a-btn class="text-secondary py-2" flat @click="setJalaali(!jalaali)">
              <small>{{ jalaali ? 'تغییر به میلادی' : 'تغییر به شمسی' }}</small>
            </a-btn>
          </div>
          <div class="text-center">
            {{ !jalaali ? 'تقویم میلادی' : 'تقویم شمسی' }}
          </div>
          <div>
            <a-btn
              class="btn-today d-none d-sm-inline-block float-left py-2"
              @click="goToday"
            >
              برو به امروز
            </a-btn>

            <button
              class="d-sm-none text-muted float-left p-2 m-1"
              @click="close"
            >
              <a-icon src="@hydra/icons/dist/components/close" size="24px" />
            </button>
          </div>
        </div>
        <div
          v-if="isMobile"
          class="a-datepicker__weekdays"
        >
          <span v-for="i in 7" :key="i" class="text-center">{{ weekday(i - 1) }}</span>
        </div>
      </header>

      <div v-if="!isMobile && $slots.before" class="mb-2">
        <slot name="before" />
      </div>

      <div v-if="!isMobile" class="a-datepicker__arrows">
        <a-btn
          :disabled="disablePreviousMonth"
          @click="next(-1)"
        >
          <a-icon v-if="jalaali" size="18" src="@hydra/icons/dist/components/chevron-right" class="d-block" />
          <a-icon v-else size="18" src="@hydra/icons/dist/components/chevron-left" class="d-block" />
        </a-btn>
        <a-btn
          :disabled="disableNextMonth"
          @click="next(1)"
        >
          <a-icon v-if="jalaali" size="18" src="@hydra/icons/dist/components/chevron-left" class="d-block" />
          <a-icon v-else size="18" src="@hydra/icons/dist/components/chevron-right" class="d-block" />
        </a-btn>
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
          class="pb-0-md px-2 pb-4"
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

      <hr v-if="!isMobile" class="mt-0 mb-2">
      <footer class="a-datepicker__footer" dir="rtl">
        <b-row v-if="isMobile" class="flex-nowrap mb-2" no-gutters>
          <b-col
            class="d-flex align-items-center min-width-0"
            :class="{ 'focus': focus === 0 }"
            @click="focus = 0"
          >
            <a-icon class="flex-shrink-0 mx-1" size="26" src="@hydra/icons/dist/components/check-in" />
            <div class="flex-grow-1 min-width-0">
              <div class="text-muted">
                <slot name="date-text" :index="0">
                  تاریخ رفت
                </slot>
              </div>
              <div class="font-weight-normal text-ellipsis">
                {{ value[0] ? value[0].format('D MMMM, dddd') : focus === 0 ? 'انتخاب کنید' : '--' }}
              </div>
            </div>
          </b-col>
          <b-col
            v-if="range"
            class="d-flex align-items-center min-width-0"
            :class="{ 'focus': focus === 1 }"
            @click="focus = 1"
          >
            <a-icon class="flex-shrink-0 mx-1" size="26" src="@hydra/icons/dist/components/check-out" />
            <div class="flex-grow-1 min-width-0">
              <div class="text-muted">
                <slot name="date-text" :index="1">
                  تاریخ برگشت
                </slot>
              </div>
              <div class="font-weight-normal text-ellipsis">
                {{ value[1] ? value[1].format('D MMMM, dddd') : focus === 1 ? 'انتخاب کنید' : '--' }}
              </div>
            </div>
            <button
              v-if="isRangePropSync"
              type="button"
              class="btn btn-clear mr-auto"
              @click.stop="setRange(false)"
            >
              <a-icon src="@hydra/icons/dist/components/close-circle-filled" size="18" />
            </button>
          </b-col>
          <b-col
            v-else-if="isRangePropSync"
            class="d-flex align-items-center"
            @click.stop="setRange(true)"
          >
            <b-checkbox :value="false" switch>
              <strong
                class="w-500 text-dark"
              >بلیط برگشت
              </strong>
            </b-checkbox>
          </b-col>
        </b-row>
        <div v-else>
          <p class="font-weight-normal mb-1">
            روز انتخابی شما:
          </p>
          <strong
            v-if="(value || []).filter(Boolean).length"
            class="text-ellipsis font-weight-light small"
          >
            <span v-for="(d, i) in value" :key="i">
              <template v-if="d">
                <span
                  v-if="i !== 0 && value[0]"
                  class="separator"
                />
                <button
                  type="button"
                  class="btn btn-clear ml-1"
                  @click.stop="clear(i)"
                >
                  <a-icon src="@hydra/icons/dist/components/close-circle-filled" size="18" />
                </button>
                <slot name="date-text" :index="i">
                  تاریخ {{ i ? 'برگشت' : 'رفت' }}
                </slot>
                <span>
                  {{ d.format('D MMMM') | localizeNumber }}
                </span>
              </template>
            </span>
            <slot name="after-date-text" />
          </strong>
          <em v-else>---</em>
        </div>

        <a-btn
          v-if="!autoClose"
          variant="secondary"
          class="py-sm-2 px-6 py-3 my-1"
          :disabled="(value || []).filter(Boolean).length !== (range ? 2 : 1)"
          :block="isMobile"
          @click="close(true)"
        >
          <slot name="confirm-button-caption" :open="isOpen">
            تائید
          </slot>
        </a-btn>
      </footer>
    </div>
  </a-dropdown>
</template>

<script>
import ACalendar from './ACalendar'
import calendarMixin from './calendarMixin'

export default {
    components: {
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
            const process = process || undefined
            if (process && process.server) return []
            const baseMonth = this.currentDate
            if (!this.isMobile) {
                return [baseMonth, baseMonth.add(1, 'month')]
            }

            return new Array(this.dayjs(this.maxDate).diff(this.minDate, 'month'))
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
                focus({ target }) {
                    self.open(target.getAttribute('data-datepicker') * 1)
                },
                input(value) {
                    self.open(self.focus)
                    if ((value || '').trim().match(/^\d{4}\/\d{2}\/\d{2}$/i)) {
                        value = self.dayjs(value, { jalali: self.jalaali }).startOf('day')
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
        this._clickOutsideListener = ({ target }) => {
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
            let { focus, minRange } = this
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
                    const { dropdown } = this.$refs
                    let el =
                        dropdown.querySelector('.calendar__day.selected') ||
                        dropdown.querySelector('.calendar__day.today')
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
  border: 1px solid  map_get($grays, '200');
  position: relative;
  border-radius: 4px;
  box-shadow: none;

  &::before {
    $width: 6px;

    content: ' ';
    display: block;
    position: absolute;
    top: -$width;
    right: -$width;
    border: $width solid transparent;
    border-bottom-color: inherit;
    transform: rotate(45deg);
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
  color: map_get($grays, '200');
  box-shadow: none;
  vertical-align: middle;

  &:hover {
    color: map_get($grays, '400');
  }
}

.a-datepicker-tooltip {
  z-index: 5000;

  .tooltip-inner {
    background-color: map_get($secondary, '700');
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
    padding: 90px 10px 40px;
    overflow: auto;
    z-index: 5000;
    box-shadow: 0 8px 16px rgba($black, 0.15);
    border-radius: 4px;
    color: map_get($grays, '700');

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
    bottom: 105px;
    overflow: auto;
    padding: 0 10px 20px;
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
    background-color: $white;
    display: flex;
    color: map_get($grays, '400');
    padding: 5px 20px 10px;
    z-index: 10;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border-bottom: 1px solid map_get($grays, '150');

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
      color: map_get($grays, '500');
      background-color: map_get($grays, '100');
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
        background-color: map_get($grays, '100');
        color: map_get($grays, '200');
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
    font-size: 0.875rem;

    > div {
      display: flex;
      position: relative;
      z-index: 14;
      align-items: center;

      > div,
      > button {
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

  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $white;
    padding: 10px;
    z-index: 12;
    box-shadow: 0 0 24px -4px rgba($black, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    font-size: 0.875rem;

    .btn {
      font-size: 1.23em;
    }

    .a-icon {
      color: map_get($grays, '300');
    }

    .focus > .a-icon {
      color: $primary;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      position: static;
      padding: 0;
      box-shadow: none;

      .btn {
        font-size: 1em;
      }
    }
  }

  hr {
    border-color: rgba($black, 0.1);
  }

  .min-width-0 {
    min-width: 0;
  }
}

.separator {
  display: inline-block;
  width: 10px;
  height: 1px;
  background-color: map_get($grays, '700');
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

<docs>
    Datepicker Example:
    ```vue
    <template>
        <a-datepicker
                v-slot="{ on, value }"
                v-model="date"
                alignment="start"
                :jalaali.sync="jalaali"
                :range.sync="range"
        >
            <b-row style="max-width: 550px;">
                <b-col>
                    <a-input
                            placeholder="از تاریخ"
                            :value="value[0] ? value[0].format('YYYY/MM/DD') : null"
                            dir="ltr"
                            v-on="on"
                    />
                </b-col>
                <b-col>
                    <a-input
                            placeholder="تا تاریخ"
                            :value="value[1] ? value[1].format('YYYY/MM/DD') : null"
                            data-datepicker="1"
                            dir="ltr"
                            v-on="on"
                    />
                </b-col>
            </b-row>
        </a-datepicker>
    </template>

    <script>
    export default {
        data: () => ({
            date: [],
            jalaali: true,
            range: true,
        })
    }
    </script>
    ```
</docs>
