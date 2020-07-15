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
        <Modal v-model="showModal" title="مسافران">
            <div class="passenger-select">
                <div class="passenger-select__count">
                    <Passenger
                        name="بزرگسال"
                        tip="(12 سال به بالا)"
                        :count="value.adult"
                        @increase="increaseCount('adult')"
                        @decrease="decreaseCount('adult')"
                    />
                    <Passenger
                        name="کودک"
                        tip="(2 سال تا 12 سال)"
                        :count="value.child"
                        @increase="increaseCount('child')"
                        @decrease="decreaseCount('child')"
                    />
                    <Passenger
                        name="نوزاد"
                        tip="(10 روز تا 2 سال)"
                        :count="value.infant"
                        @increase="increaseCount('infant')"
                        @decrease="decreaseCount('infant')"
                    />
                </div>
                <div class="passenger-select__class-type">
                    <PassengerClass>
                        <b-form-group>
                            <b-form-radio
                                v-model="classSelect"
                                checked="flightClass"
                                name="some-radios"
                                value="economy"
                            >
                                اکونومی کلاس
                            </b-form-radio>
                            <b-form-radio
                                v-model="classSelect"
                                checked="flightClass"
                                name="some-radios"
                                value="business"
                            >
                                بیزنس کلاس
                            </b-form-radio>
                            <b-form-radio
                                v-model="classSelect"
                                checked="flightClass"
                                name="some-radios"
                                value="first"
                            >
                                فرست کلاس
                            </b-form-radio>
                        </b-form-group>
                    </PassengerClass>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from '~/components/Ui/Modals/Modal.vue'
import PassengerClass from '~/components/Ui/Form/PassengerClass'
import Passenger from '~/components/Ui/Form/Passenger'
import {translateFlightClass} from '~/utils/helpers'

export default {
    components: {
        Modal,
        PassengerClass, Passenger
    },
    props: {
        flightClass: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            required: true
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
            return `${allPassengerCount} مسافر، ${translateFlightClass(this.flightClass)}`
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
        increaseCount(type) {
            let data = {...this.value}
            data[type] = data[type] + 1
            this.$emit('input', data)
        },
        decreaseCount(type) {
            let data = {...this.value}
            if (data[type] > 0) {
                data[type] = data[type] - 1
                this.$emit('input', data)
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
            padding-right: 40px;
            padding-left: 30px;
            font-size: 15px;
            line-height: 52px;
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
