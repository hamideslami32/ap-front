<template>
    <div>
        <portal to="header">
            <span>مسافرین و خریدار</span>
        </portal>
        <div class="mt-2 px-2">
            <b-row dir="ltr" class="ticket font-en" no-gutters>
                <b-col cols="9" class="p-3 ticket__destination d-flex align-items-center">
                    <div class="ticket__destination__arrow text-1">
                        <span class="d-block mx-auto" />
                        <svgicon name="arrows-round" class="my-3" width="24" height="20" />
                        <span class="d-block mx-auto" />
                    </div>
                    <div class="ticket__destination__info flex-grow-1 text-left px-2">
                        <div class="d-flex align-items-center text-weight-500">
                            <span class="text-2 py-1 px-2">10:20</span>
                            <span class="text-3 ml-2">Tehran</span>
                            <span class="text-2 text-weight-400 ml-2">(4 February 20)</span>
                        </div>
                        <p class="my-2 text-info text-weight-500 text-1">
                            Round Trip
                        </p>
                        <div class="d-flex align-items-center text-weight-500">
                            <span class="text-2 py-1 px-2">10:20</span>
                            <span class="text-3 ml-2">Tehran</span>
                            <span class="text-2 text-weight-400 ml-2">(4 February 20)</span>
                        </div>
                    </div>
                </b-col>
                <b-col cols="3" class="p-3 ticket__info  text-center">
                    <div class="mt-2">
                        <div class="mb-2">
                            img
                        </div>
                        <div class="ticket__info__class-type text-center text-weight-500">
                            <p class="text-1 mb-0 py-1">
                                Economy
                            </p>
                            <p class="text-0 mb-0 py-1">
                                2 Traveller
                            </p>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <p class="my-3 text-center text-gray-700 text-3">
                وارد کردن اطلاعات مسافرین
            </p>

            <passenger-field v-for="(passenger, i) in passengers" :key="i" v-model="passengers[i]" :index="i + 1" />

            <p class="my-3 text-center text-gray-700 text-3">
                اطلاعات خریدار
            </p>

            <div class="user p-3 d-flex align-items-center justify-content-between">
                <span class="text-3 text-gray-900 text-weight-600 pr-3">
                    سید حسین حسینی
                </span>
                <div class="user__contact text-left text-2 text-weight-500 text-gray-700">
                    <p class="mb-1">
                        hosein.sharifinia@gmail.com
                    </p>
                    <p class="mb-0">
                        09356821973
                    </p>
                </div>
            </div>
        </div>

        <portal to="toast">
            <toast-card variant="light">
                <div class="text-center">
                    <svgicon name="arrow-left" width="20" height="20" />
                    <span>
                        قیمت برای هر نفر 15,000,000 تومان
                    </span>
                </div>
            </toast-card>

            <toast-card>
                <div class="d-flex align-items-center justify-content-between p-1">
                    <div>
                        <p class="mb-2">
                            مجموع قیمت برای 2 نفر
                        </p>
                        <p class="mb-0 text-4">
                            30,000,000 تومان
                        </p>
                    </div>
                    <b-button class="text-3 py-2 px-4" variant="success">
                        جز‌ئیات پرواز
                    </b-button>
                </div>
            </toast-card>
        </portal>
    </div>
</template>

<script>

import PassengerField from '~/components/order/PassengerField'
import ToastCard from '~/components/ui/ToastCard'

const passengerFactory = (type = 'adult') => ({
    name: '',
    type,
    lastName: null,
    gender: null,
    nationalCode: null,
    birthdate: null,
    passportCode: null,
    passportDate: null,
    passportCity: null
})

export default {
    components: { ToastCard, PassengerField},
    layout: 'page',
    data() {
        const { adult, child, infant } = this.$flight.session
        return {
            nationalPassenger: true,
            passengers: [
                ...new Array(adult || 0).fill(1).map(() => passengerFactory('adult')),
                ...new Array(child || 0).fill(1).map(() => passengerFactory('child')),
                ...new Array(infant || 0).fill(1).map(() => passengerFactory('infant'))
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

    @mixin line {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        width: 1px;
        background: $white;
        height: 15px;
        margin: 0 auto;
    }

    .ticket {
        background: linear-gradient(90deg, $primary 0%, #6d4ea3 100%);
        border-radius: 10px;
        color: $white;

        &__info {

            border-left: 1px dashed rgba(255, 255, 255, 0.2);

            &__class-type {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                padding: 2px;

                p {
                    &:first-child {
                        border-radius: 5px;
                        background: #6b4ba2;
                    }
                }
            }
        }

        &__destination {
            &__info {

                > div {
                    span {
                        &:last-child {
                            color: #ae90e3;
                        }

                        &:first-child {
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 5px;
                        }
                    }
                }

            }

            &__arrow {
                span {
                    width: 9px;
                    height: 9px;
                    background: transparent;
                    border: 1px solid $white;
                    border-radius: 50%;
                    position: relative;

                    &:first-child {
                        &:after {
                            @include line;
                            bottom: -15px;
                        }
                    }

                    &:last-child {
                        &:before {
                            @include line;
                            top: -15px;
                        }
                    }
                }

                svg {
                    color: #ae90e3;
                    transform: rotate(90deg);
                }
            }
        }
    }


    .user {
        background: $white;
        border: 1px solid map_get($grays, '400');
        border-radius: 10px;
        position: relative;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

        &:after {
            width: 6px;
            height: 6px;
            background: #bee16c;
            border-radius: 50%;
            position: absolute;
            content: '';
            top: 7px;
            left: 7px;
        }
    }
</style>