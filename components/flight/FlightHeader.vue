<template>
    <b-container tag="header" class="flight-header" fluid>
        <div class="flight-header__top mb-4">
            <hamburger-menu class="white" />
            <div class="flight-header__destinations">
                <input-pair>
                    <custom-input value="تهران" />
                    <custom-input value="پاریس" />
                </input-pair>
            </div>
            <svgicon name="arrow-left" width="30" height="30" />
        </div>
        <div class="flight-header__bottom">
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
            >
                <custom-input class="passenger-input passenger-input--passenger" value="اکونومی" />
            </passengers-picker>
            <a-datepicker
                v-model="date"
                class="date-input-pair"
                :jalaali.sync="jalaaliDatepicker"
                :range.sync="isDatepickerRange"
            >
                <template v-slot:before="{ on, value }">
                    <span class="date-input-pair" dir="rtl">
                        <form-input
                            label="تاریخ رفت"
                            icon="calendar"
                            value="20 خرداد"
                            readonly
                            v-on="on"
                        />
                        <form-input
                            label="تاریخ برگشت"
                            :value="value[1] ? value[1].format('DD MMMM YY') : null"
                            readonly
                            data-datepicker="1"
                            v-on="on"
                        />
                    </span>
                </template>
                <template v-slot="{ open, value }">
                    <form-input
                        label="تاریخ رفت"
                        icon="calendar"
                        :value="value[0] ? value[0].format('DD MMMM YY') : null"
                        readonly
                        @focus="open(0)"
                    />
                    <form-input
                        label="تاریخ برگشت"
                        :value="value[1] ? value[1].format('DD MMMM YY') : null"
                        data-datepicker="1"
                        readonly
                        @focus="open(1)"
                    />
                </template>
            </a-datepicker>
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
            >
                <custom-input class="passenger-input passenger-input--class" value="اکونومی" />
            </passengers-picker>
            <a-datepicker
                v-model="date"
                class="date-input-pair"
                :jalaali.sync="jalaaliDatepicker"
                :range="isDatepickerRange"
            >
                <template v-slot:before="{ on, value }">
                    <span class="date-input-pair" dir="rtl">
                        <form-input
                            label="تاریخ رفت"
                            icon="calendar"
                            value="20 خرداد"
                            readonly
                            v-on="on"
                        />
                        <form-input
                            label="تاریخ برگشت"
                            :value="value[1] ? value[1].format('DD MMMM') : null"
                            readonly
                            data-datepicker="1"
                            v-on="on"
                        />
                    </span>
                </template>
                <template v-slot="{ open, value }">
                    <form-input
                        label="تاریخ رفت"
                        icon="calendar"
                        :value="value[0] ? value[0].format('DD MMMM') : null"
                        readonly
                        @focus="open(0)"
                    />
                    <form-input
                        label="تاریخ برگشت"
                        :value="value[1] ? value[1].format('DD MMMM') : null"
                        data-datepicker="1"
                        readonly
                        @focus="open(1)"
                    />
                </template>
            </a-datepicker>
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
            >
                <custom-input class="passenger-input passenger-input--passenger" value="۲ مسافر" />
            </passengers-picker>
        </div>
    </b-container>
</template>

<script>
import CustomInput from '~/components/ui/form/CustomInput'
import HamburgerMenu from '~/components/layouts/HamburgerMenu'
import InputPair from '~/components/ui/form/InputPair'
import ADatepicker from '~/components/ui/date-picker/ADatepicker'
import FormInput from '~/components/ui/form/FormInput'
import PassengersPicker from '~/components/flight/flight-search/PassengersPicker'
import {childrenCheck, infantCheck, maxPassenger, minAdult} from '~/utils/flightHelpers'

export default {
    components: {
        CustomInput,
        HamburgerMenu,
        InputPair,
        ADatepicker,
        FormInput,
        PassengersPicker
    },

    data() {
        return {
            jalaaliDatepicker: true,
            isDatepickerRange: false,
            date: [null, null],
            search: {
                type: 'roundTrip', // oneWay, roundTrip, multiDestination,
                origin: null, //object  i, title, value
                destination: null, //object  i, title, value
                departing: null,
                returning: null,
                adult: 1,
                child: 0,
                infant: 0,
                classType: 'economy' // business first
            }
        }
    },
    computed: {
        passengers: {
            get() {
                return {
                    adult: this.search.adult,
                    child: this.search.child,
                    infant: this.search.infant
                }
            },
            set(value) {
                const {adult, child, infant} = value
                if (!maxPassenger(adult, child, infant)) {
                    return
                }

                if (minAdult(adult, child, 'domestic')) {
                    this.search.adult = adult
                }

                if (childrenCheck('domestic', adult, child)) {
                    this.search.child = child
                }

                if (infantCheck(infant)) {
                    this.search.infant = infant
                }
                Object.assign(this.search, value)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-header {
        padding: 15px 10px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        background: linear-gradient(90deg, $primary 0%, #6d4ea3 100%);

        &__top {
            display: flex;
            align-items: center;
            color: $white;
        }

        &__bottom {
            display: flex;

            .passenger-input {
                margin-bottom: 0;

                /deep/ input {
                    text-align: center;
                    color: $white;
                    background: #6d4ea3;
                    height: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
                    width: 80px;
                }

                &--class {
                    /deep/ input {
                        border-radius: 5px 10px 10px 5px;
                    }
                }

                &--passenger {
                    /deep/ input {
                        border-radius: 10px 5px 5px 10px;
                    }
                }
            }

            /deep/ .date-input-pair {
                margin: 0 10px;
                display: flex;
                background: #6d4ea3;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-sizing: border-box;
                box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
                border-radius: 5px;

                svg {
                    display: none;
                }

                label {
                    display: none;
                }

                input {
                    background: transparent;
                    color: $white;
                    font-size: 13px;
                    text-align: center;
                    height: 100%;
                }

                .form-input {
                    padding: 0 !important;
                    border: none;
                    background: transparent;
                    box-shadow: none;

                    &:first-child {
                        position: relative;

                        &::before {
                            content: '';
                            width: 1px;
                            height: 16px;
                            position: absolute;
                            top: 50%;
                            left: 0;
                            transform: translateY(-50%);
                            background: rgba(255, 255, 255, 0.15);
                        }
                    }

                    > div {
                        height: 100%;
                    }
                }

            }
        }


        &__destinations {
            /deep/ .custom-input {
                margin: 0 22px 0;

                input {
                    background: transparent;
                    box-shadow: none;
                    border: none;
                    height: 30px;
                    color: $white;
                    font-size: 17px;
                    text-align: left;
                }

                &:last-child input {
                    text-align: right;
                }
            }

            /deep/ .input-pair__switch {
                background: transparent;
                border: none;

                &:before {
                    display: none;
                }
            }
        }
    }
</style>
