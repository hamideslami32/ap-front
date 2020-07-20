<template>
    <div class="container flight-available">
        <div class="header">
            <div class="header__top mb-4">
                <hamburger-menu />
                <div class="flight-available__reverse-section">
                    <input-pair>
                        <custom-input value="تهران" class="flight-available__reverse-section__input--origin" />
                        <custom-input value="پاریس" class="flight-available__reverse-section__input--destination" />
                    </input-pair>
                </div>
                <svgicon name="arrow-left" width="30" class="header__icon" height="30" />
            </div>
            <div class="header__bottom">
                <custom-input class="passenger-input passenger-input--class" value="اکونومی" />
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
                <custom-input class="passenger-input passenger-input--passenger" value="اکونومی" />
            </div>
        </div>
    </div>
</template>

<script>
import HamburgerMenu from '~/components/layouts/HamburgerMenu'
import InputPair from '~/components/ui/form/InputPair'
import CustomInput from '~/components/ui/form/CustomInput'
import ADatepicker from '~/components/ui/date-picker/ADatepicker'
import FormInput from '~/components/ui/form/FormInput'

export default {
    layout: 'desktop',
    components: {
        CustomInput,
        HamburgerMenu,
        InputPair,
        ADatepicker,
        FormInput
    },
    data() {
        return {
            jalaaliDatepicker: true
        }
    }
}
</script>

<style lang="scss" scoped>
.flight-available {
    .header {
        padding: 15px 10px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        background: linear-gradient(90deg, $primary 0%, #6d4ea3 100%);

        &__top {
            display: flex;
            align-items: center;


            .hamburger-menu {
                /deep/ span {
                    background-color: $white;
                }
            }

            svg {
                color: $white;
                transform: scale(1.5);
            }

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

            /deep/ .date-input-pair{
                margin: 0 10px;
                display: flex;
                background: #6d4ea3;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-sizing: border-box;
                box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
                border-radius: 5px;
                svg{
                    display: none;
                }
                label{
                    display: none;
                }
                input {
                    background: transparent;
                    color: $white;
                    font-size: 13px;
                    text-align: center;
                    height: 100%;
                }

                .form-input{
                    padding: 0 !important;
                    border: none;
                    background: transparent;
                    box-shadow: none;
                    &:first-child{
                        position: relative;
                        &::before{
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

    }

    &__reverse-section {
        /deep/ .custom-input {
            margin-bottom: 0;

            input {
                background: transparent;
                box-shadow: none;
                border: none;
                height: 30px;
                color: $white;
                text-align: center;
                font-size: 17px;
            }
        }

        /deep/ .input-pair__switch {
            background: transparent;
            border: none;

            &:before {
                display: none;
            }
        }

        &__input {
            &--origin {
                padding-left: 45px;

                /deep/ > input {
                    text-align: left !important;
                }
            }

            &--destination {
                /deep/ > input {
                    text-align: right !important;
                }
            }
        }
    }
}
</style>