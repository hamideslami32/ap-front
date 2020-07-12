<template>
    <div class="passenger-select">
        <div class="passenger-select__count">
            <Passenger v-for="passenger in passengers" :key="passenger.name" :data="passenger" />
        </div>
        <div class="passenger-select__class-type">
            <PassengerClass>
                <b-form-group>
                    <b-form-radio v-model="flightClass" name="some-radios" value="economy">
                        اکونومی کلاس
                    </b-form-radio>
                    <b-form-radio v-model="flightClass" name="some-radios" value="business">
                        بیزنس کلاس
                    </b-form-radio>
                    <b-form-radio v-model="flightClass" name="some-radios" value="first">
                        فرست کلاس
                    </b-form-radio>
                </b-form-group>
            </PassengerClass>
        </div>
    </div>
</template>

<script>
import Passenger from '~/components/Ui/Form/Passenger'
import PassengerClass from '~/components/Ui/Form/PassengerClass'

export default {
    components: {PassengerClass, Passenger},
    props: {
        flightClass: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            passengers: [
                {
                    name: 'بزرگسال',
                    tip: '(12 سال به بالا)',
                    count: 0
                },
                {
                    name: 'کودک',
                    tip: '(2 سال تا 12 سال)',
                    count: 0
                },
                {
                    name: 'نوزاد',
                    tip: '(10 روز تا 2 سال)',
                    count: 0
                }
            ],
            selected: 'economy'
        }
    }
}
</script>

<style lang="scss" scoped>
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