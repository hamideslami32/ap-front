<template>
    <div class="position-relative" @click="focus">
        <slot />
        <b-modal v-model="showModal" title="انتخاب مسافران" hide-footer @hide="updateValue">
            <template v-slot:modal-header-close>
                <svgicon name="arrow-left" width="20" height="20" />
            </template>
            <div class="passenger-modal">
                <h5 class="text-3 text-gray-700 mb-4">
                    انتخاب مسافر
                </h5>
                <div class="d-flex align-items-center mb-3">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <span class="ml-2">بزرگسال</span>
                            <small class="text-muted">(12 سال به بالا)</small>
                        </div>
                    </div>
                    <number-spinner :value="localValue.adult" class="mr-auto" @input="setValue('adult', $event)" />
                </div>
                <div class="d-flex align-items-center mb-3">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <span class="ml-2">کودک</span>
                            <small class="text-muted">(2 سال تا 12 سال)</small>
                        </div>
                    </div>
                    <number-spinner :value="localValue.child" class="mr-auto" @input="setValue('child', $event)" />
                </div>
                <div class="d-flex align-items-center mb-3">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <span class="ml-2">نوزاد</span>
                            <small class="text-muted">(10 روز تا 2 سال)</small>
                        </div>
                    </div>
                    <number-spinner :value="localValue.infant" class="mr-auto" @input="setValue('infant', $event)" />
                </div>
            </div>

            <div v-if="isInternational" class="passenger-class">
                <hr class="my-4">
                <h5 class="text-3 mb-4 text-gray-700">
                    کلاس پروازی
                </h5>
                <b-form-group class="en font-weight-medium">
                    <b-form-radio
                        v-for="x in classTypes"
                        :key="x.value"
                        v-model="classSelect"
                        class="mb-2 mx-1"
                        :class="{ active: classSelect === x.value }"
                        checked="flightClass"
                        name="flight_class"
                        :value="x.value"
                        inline
                    >
                        {{ x.title }}
                    </b-form-radio>
                </b-form-group>
            </div>

            <div class="passengers__actions">
                <a-btn variant="primary" class="px-5" @click="showModal = false">
                    تائید
                </a-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
import NumberSpinner from '~/components/ui/form/NumberSpinner'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

export default {
    components: {
        NumberSpinner
    },
    props: {
        flightClass: {
            type: String,
            default: null
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
            showModal: false,
            localValue: cloneDeep(this.value),
            classTypes: [
                { value: 'economy', title: 'Economy' },
                { value: 'business', title: 'Business' },
                { value: 'first', title: 'First' }
            ]
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
        }
    },
    watch: {
        value(t) {
            this.localValue = cloneDeep(t)
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
            const newValue = {...this.localValue}
            newValue[type] = value
            try {
                this.validate(newValue)
                this.localValue = newValue
            } catch (e) {
                this.$toast.alert(this.$createElement('span', {}, e.message), {
                    solid: false,
                    autoHideDelay: 10000
                })
            }
        },
        updateValue() {
            !isEqual(this.localValue, this.value) && this.$emit('input', this.localValue)
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
        background: map-get($grays, '250');

        &__actions {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 15px;
        }
    }

    .passenger-modal {
        &__title {
            color: map_get($grays, '700');
            font-size: 0.9rem;
        }
    }

    .passenger-class {
        color: map_get($grays, '800');

        &__title {
            color: map_get($grays, '700');
            font-size: 0.9rem;
        }
    }

</style>
