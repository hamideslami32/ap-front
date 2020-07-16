<template>
    <div class="passengers" @click="focus">
        <span class="passengers__icon-holder">
            <svgicon class="passengers__icon-holder--icon" width="24" height="24" name="user" />
        </span>
        <div class="passengers__input-holder">
            <span class="passengers__input-holder--before">
                <svgicon class="passengers__input-holder--before__icon" width="24" height="24" name="chair" />
            </span>
            <input
                ref="input"
                name="passengers"
                :value="passengerCounts"
                class="passengers__input-holder--input"
                type="text"
                @focus="openModal"
            >
            <span class="passengers__input-holder--after">
                <svgicon class="passengers__input-holder--after__icon" width="24" height="24" name="arrow-down" />
            </span>
        </div>
        <b-modal v-model="showModal" title="انتخاب مسافران" hide-footer>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>

            <div>
                <div class="d-flex align-items-center mb-3">
                    <span>بزرگسال</span>
                    <small class="text-muted mr-2">(12 سال به بالا)</small>
                    <number-spinner :value="value.adult" class="mr-auto" @input="setValue('adult', $event)" />
                </div>
                <div class="d-flex align-items-center mb-3">
                    <span>کودک</span>
                    <small class="text-muted mr-2">(2 سال تا 12 سال)</small>
                    <number-spinner :value="value.child" class="mr-auto" @input="setValue('child', $event)" />
                </div>
                <div class="d-flex align-items-center mb-3">
                    <span>نوزاد</span>
                    <small class="text-muted mr-2">(10 روز تا 2 سال)</small>
                    <number-spinner :value="value.infant" class="mr-auto" @input="setValue('infant', $event)" />
                </div>
            </div>

            <div v-if="isInternational">
                <hr class="my-4">
                <b-form-group>
                    <b-form-radio
                        v-model="classSelect"
                        class="py-2 mb-1"
                        checked="flightClass"
                        name="flight_class"
                        value="economy"
                    >
                        اکونومی کلاس
                    </b-form-radio>
                    <b-form-radio
                        v-model="classSelect"
                        class="py-2 mb-1"
                        checked="flightClass"
                        name="flight_class"
                        value="business"
                    >
                        بیزنس کلاس
                    </b-form-radio>
                    <b-form-radio
                        v-model="classSelect"
                        class="py-2 mb-1"
                        checked="flightClass"
                        name="flight_class"
                        value="first"
                    >
                        فرست کلاس
                    </b-form-radio>
                </b-form-group>
            </div>
        </b-modal>
    </div>
</template>

<script>
import {translateFlightClass} from '~/utils/flightHelpers'
import NumberSpinner from '~/components/ui/form/NumberSpinner'

export default {
    components: {
        NumberSpinner
    },
    props: {
        flightClass: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            required: true
        },
        isInternational: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: false
        }
    },
    computed: {
        classSelect: {
            get() {
                return this.flightClass
            },
            set(value) {
                this.$emit('update:flightClass', value)
            }
        },
        passengerCounts() {
            const allPassengerCount = this.value.adult + this.value.child + this.value.infant
            return `${allPassengerCount} مسافر${this.isInternational ? ', ' + translateFlightClass(this.flightClass) : ''}`
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus()
        },
        openModal() {
            this.$refs.input.blur()
            this.showModal = true
        },
        setValue(type, value) {
            const newValue = {...this.value}
            newValue[type] = value
            try {
                this.validate(newValue)
                this.$emit('input', newValue)
            } catch (e) {
                e.message && this.$emit('error', e.message)
            }
        },
        validate({ adult, child, infant }) {
            const MAX_PASSENGERS = 9
            if (adult < 1) {
                throw new Error('تعداد بزرگسالان نمی‌تواند کمتر از ۱ باشد.')
            }
            if (adult + child + infant > MAX_PASSENGERS) {
                throw new Error(`حداکثر تعداد مسافران ${MAX_PASSENGERS} نفر است.`)
            }
            if (infant < 0 || child < 0) {
                throw new Error('')
            }

            if (child + infant > adult * 3) {
                throw new Error('به ازای هر بزرگسال، ۳ کودک، یا ۲ کودک و یک نوزاد مجاز است.')
            }
            if (infant > adult) {
                throw new Error('تعداد نوزادها نمی‌تواند بیشتر از تعداد بزرگسالان باشد.')
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.passengers {
    margin-bottom: 20px;
    border: 1px solid $borderColor;
    border-radius: 5px;
    position: relative;
    height: 50px;

    &__icon-holder {
        position: absolute;
        right: 15px;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;

        &::before {
            content: '';
            height: 24px;
            position: absolute;
            left: -10px;
            width: 1px;
            background: $borderColor;
        }

        &--icon {
            color: $grayColor;
            position: relative;
        }
    }

    &__input-holder {
        height: 100%;
        position: relative;
        margin-right: 70px;

        &--input {
            height: 100%;
            width: 80%;
            outline: none;
            border: none;
            background: transparent;
            padding: 0 40px 0 30px;
            font-size: 15px;
            line-height: 52px;
            background-clip: padding-box;
        }

        &--before {
            position: absolute;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 100%;

            &__icon {
                color: $grayColor;
            }
        }

        &--after {
            position: absolute;
            left: 15px;
            transform: translateY(50%);
            height: 24px;

            &__icon {
                color: $darkGrayColor;
            }
        }
    }
}

.passenger-select {
    padding-top: 20px;

    &__count {
        padding-bottom: 20px;
        border-bottom: 1px solid $modalBorder;
    }

    &__class-type {
        padding-top: 20px;
    }
}


</style>
