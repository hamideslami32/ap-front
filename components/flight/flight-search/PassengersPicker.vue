<template>
    <div class="position-relative" @click="focus">
        <slot />
        <b-modal v-model="showModal" title="انتخاب مسافران" hide-footer>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <div class="passenger-modal">
                <p class="passenger-modal__title mb-4">
                    انتخاب مسافر
                </p>
                <div class="d-flex passenger-section-holder align-items-center mb-3">
                    <div class="passenger-section d-flex">
                        <div class="icon ml-2" style="width: 40px; height: 40px; background: gray;" />
                        <div class="d-flex flex-column">
                            <span class="passenger-section__name">بزرگسال</span>
                            <small class="passenger-section__tip text-muted">(12 سال به بالا)</small>
                        </div>
                    </div>
                    <number-spinner :value="value.adult" class="mr-auto" @input="setValue('adult', $event)" />
                </div>
                <div class="d-flex align-items-center mb-3">
                    <div class="passenger-section d-flex">
                        <div class="icon ml-2" style="width: 40px; height: 40px; background: gray;" />
                        <div class="d-flex flex-column">
                            <span class="passenger-section__name">کودک</span>
                            <small class="text-muted">(2 سال تا 12 سال)</small>
                        </div>
                    </div>
                    <number-spinner :value="value.child" class="mr-auto" @input="setValue('child', $event)" />
                </div>
                <div class="d-flex align-items-center mb-3">
                    <div class="passenger-section d-flex">
                        <div class="icon ml-2" style="width: 40px; height: 40px; background: gray;" />
                        <div class="d-flex flex-column">
                            <span class="passenger-section__name">نوزاد</span>
                            <small class="text-muted">(10 روز تا 2 سال)</small>
                        </div>
                    </div>
                    <number-spinner :value="value.infant" class="mr-auto" @input="setValue('infant', $event)" />
                </div>
            </div>

            <!--            <div v-if="isInternational">-->
            <div class="passenger-class">
                <hr class="my-4">
                <p class="passenger-class__title mb-4">
                    کلاس پروازی
                </p>
                <b-form-group class="en">
                    <b-form-radio
                        v-model="classSelect"
                        class="mb-2"
                        :class="{ active: classSelect === 'economy' }"
                        checked="flightClass"
                        name="flight_class"
                        value="economy"
                    >
                        Economy
                    </b-form-radio>
                    <b-form-radio
                        v-model="classSelect"
                        class="mb-2"
                        :class="{ active: classSelect === 'business' }"
                        checked="flightClass"
                        name="flight_class"
                        value="business"
                    >
                        Business
                    </b-form-radio>
                    <b-form-radio
                        v-model="classSelect"
                        class="mb-2"
                        checked="flightClass"
                        name="flight_class"
                        value="first"
                        :class="{ active: classSelect === 'first' }"
                    >
                        First Class
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

    .passenger-section-holder {
        &:focus, &:active {
            background: #ffffff;
            border: 1px solid #dddddd;
            box-sizing: border-box;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            padding: 10px;


            .passenger-select {
                padding-top: 20px;

                &__count {
                    padding-bottom: 20px;
                    border-bottom: 1px solid $modalBorder;
                }

                .passenger-section {
                    &__name {
                        color: map_get($gray-colors, 'gray-800');
                        font-size: 0.8em;
                        font-weight: 600;
                    }
                }

            }
        }
    }

    .passenger-modal {
        &__title {
            color: map_get($gray-colors, 'gray-700');
            font-size: 0.9rem;
        }
    }

    .passenger-class {
        color: map_get($gray-colors, 'gray-800');

        &__title {
            color: map_get($gray-colors, 'gray-700');
            font-size: 0.9rem;
        }
    }

</style>
