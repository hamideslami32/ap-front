<template>
    <div class="order">
        <portal to="header">
            <span>مسافرین و خریدار</span>
        </portal>
        <div class="mt-3 px-2">
            <flight-order-card :available="available" :flight="flights[0]" />
            <p class="my-3 text-center text-gray-700 text-3">
                وارد کردن اطلاعات مسافرین
            </p>

            <passenger-field v-for="(passenger, i) in passengers" :key="i" v-model="passengers[i]" :index="i + 1" />


            <template v-if="$auth.user">
                <p class="my-3 text-center text-gray-700 text-3">
                    اطلاعات خریدار
                </p>

                <div class="user p-3 d-flex align-items-center justify-content-between">
                    <span class="text-3 text-gray-900 text-weight-600 pr-3">
                        {{ $auth.user.firstName + ' ' + $auth.user.lastName }}
                    </span>
                    <div class="user__contact text-left text-2 text-weight-500 text-gray-700">
                        <p class="mb-1">
                            {{ $auth.user.email }}
                        </p>
                        <p class="mb-0">
                            {{ $auth.user.phone }}
                        </p>
                    </div>
                </div>
            </template>
            <template v-else>
                <form :class="{ 'buyer-border': buyer.value }" class="buyer p-2 my-3">
                    <p class="my-3 text-center text-gray-700 text-3">
                        اطلاعات خریدار
                    </p>
                    <div class="buyer__main">
                        <div class="checkbox bg-gray-500 d-flex px-1 align-items-center" :class="{ 'bg-light-primary': buyer.value }">
                            <b-form-checkbox
                                id="checkbox"
                                v-model="buyer.value"
                                name="checkbox"
                            />
                            <label class="mr-2 mb-0 text-2 text-weight-500 text-gray-800" for="checkbox">بلیط به ایمیل و شماره همراه فرد دیگری هم ارسال شود</label>
                        </div>
                        <div v-if="buyer.value" class="form mt-1">
                            <p class="my-3 text-center text-gray-700 text-3">
                                شماره همراه و ایمیل
                            </p>
                            <custom-input
                                v-model="buyer.mobile"
                                class="px-4 mb-2"
                                type="tel"
                                maxlength="11"
                                title="شماره همراه"
                            />
                            <custom-input
                                v-model="buyer.email"
                                class="px-4 mb-2"
                                type="email"
                                title="ایمیل"
                            />
                        </div>
                    </div>
                </form>
            </template>
            <charity tag="Charity" tag-color="#e3469a" />
        </div>

        <flight-details-toast>
            <b-button class="text-3 py-2 px-4" variant="success" @click="pay">
                تائید و پرداخت
            </b-button>
        </flight-details-toast>
    </div>
</template>

<script>

import CustomInput from '~/components/ui/form/CustomInput'
import PassengerField from '~/components/passenger/PassengerField'
import Charity from '~/components/flight/order/Charity'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import {flightApi} from '~/api/flight'

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
    components: {
        FlightOrderCard,
        FlightDetailsToast, 
        PassengerField,
        CustomInput,
        Charity
    },
    layout: 'page',

    data() {
        const { adult, child, infant } = this.$flight.session
        return {
            nationalPassenger: true,
            passengers: [
                ...new Array(adult || 0).fill(1).map(() => passengerFactory('adult')),
                ...new Array(child || 0).fill(1).map(() => passengerFactory('child')),
                ...new Array(infant || 0).fill(1).map(() => passengerFactory('infant'))
            ],
            buyer: {
                value: false,
                mobile: '',
                email: ''
            }
        }
    },

    computed: {
        user() {
            return this.$auth.user
        },
        available() {
            return this.$flight.available
        },
        flights() {
            return this.$route.query.flights.split('-').map((flightIndex, i) => this.available.routes[i].flights[flightIndex])
        }
    },

    methods: {
        async pay() {
            const { paymentUrl } = await flightApi.pay(this.$route.query.orderId)
            window.location = paymentUrl
        }
    }
}
</script>

<router>
    {
      "meta": {
         "fullUser": true
      }
    }
</router>

<style lang="scss" scoped>
.order {
    padding-bottom: 130px;
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
    .buyer {
        border: 1px solid transparent;
        &__main {
            .checkbox {
                border-radius: $borderRadius10;
                height: 50px;
            }
            .bg-light-primary {
                background-color: $pinkColor;
            }
        }
    }
    .buyer-border {
        border: 1px solid $borderColor;
        border-radius: $borderRadius10;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
    }
}
</style>
