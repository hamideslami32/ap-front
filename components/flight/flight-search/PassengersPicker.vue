<template>
    <div class="passengers" @click="focus">
        <slot />
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
            this.open()
        },
        open() {
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
        validate({adult, child, infant}) {
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
        border: 1px solid #cccccc;
        border-radius: 10px;
        position: relative;
        height: 50px;
        background: #f9f9f9;
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
