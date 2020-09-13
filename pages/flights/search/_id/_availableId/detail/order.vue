<template>
    <div class="order">
        <portal to="header">
            <span>مسافرین و خریدار</span>
        </portal>
        <div class="mt-3 px-2">
            <flight-order-card v-if="order" :order="order.orderItems[0]" />
            <flight-placeholder v-else />
            <p class="my-3 text-center text-gray-700 text-3">
                وارد کردن اطلاعات مسافرین
            </p>

            <passenger-field v-for="(passenger, i) in passengers" :key="i" v-model="passengers[i]" :index="i + 1" />

            <template v-if="user">
                <p class="my-3 text-center text-gray-700 text-3">
                    اطلاعات خریدار
                </p>

                <div class="user p-3 d-flex align-items-center justify-content-between">
                    <span class="text-3 text-gray-900 text-weight-600 pr-1">
                        {{ user.firstName || '' }} {{ user.lastName || '' }}
                    </span>
                    <div class="user__contact text-left text-2 text-weight-500 text-gray-700">
                        <p class="mb-1">
                            {{ user.email }}
                        </p>
                        <p class="mb-0">
                            {{ user.phone }}
                        </p>
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="my-3 text-center text-gray-700 text-3">
                    اطلاعات خریدار
                </p>
                <form :class="{ 'buyer-border': buyer.value }" class="buyer p-2 my-3" @submit.prevent>
                    <div class="buyer__main">
                        <div
                            class="checkbox bg-gray-500 d-flex px-1 align-items-center"
                            :class="{ 'bg-light-primary': buyer.value }"
                        >
                            <b-form-checkbox
                                id="checkbox"
                                v-model="buyer.value"
                                name="checkbox"
                            />
                            <label class="mr-2 mb-0 text-2 text-weight-500 text-gray-800" for="checkbox">بلیط به
                                شماره همراه فرد دیگری هم ارسال شود</label>
                        </div>
                        <div v-if="buyer.value" class="form mt-1">
                            <p class="my-3 text-center text-gray-700 text-3">
                                شماره همراه
                            </p>
                            <custom-input
                                v-model="buyer.mobile"
                                class="px-4 mb-2"
                                type="tel"
                                maxlength="11"
                                title="شماره همراه"
                            />
                        </div>
                    </div>
                </form>
            </template>
            <charity tag="Charity" tag-color="#e3469a" class="my-3" />
            <payment tag="Payment" tag-color="#bee16c" :price="order ? order.orderItems[0].price : 0" />
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
import Payment from '~/components/flight/order/Payment'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import {flightApi} from '~/api/flight'
import FlightPlaceholder from '~/components/flight/available/FlightPlaceholder'


const passengerFactory = (type = 'adult') => ({
    name: null,
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
        Charity,
        Payment,
        FlightPlaceholder
    },
    layout: 'page',

    async fetch() {
        this.order = await flightApi.getOrder(this.$route.query.orderId)
    },

    data() {
        const {adult, child, infant} = this.$flight.session
        return {
            nationalPassenger: true,
            passengers: [
                ...new Array(adult || 0).fill(1).map(() => passengerFactory('adult')),
                ...new Array(child || 0).fill(1).map(() => passengerFactory('child')),
                ...new Array(infant || 0).fill(1).map(() => passengerFactory('infant'))
            ],
            order: null,
            buyer: {
                value: false,
                mobile: ''
            }
        }
    },

    computed: {
        user() {
            return this.$auth.user
        },
        isValid() {
            const keys = ['birthdate','gender', 'lastName', 'name']
            return this.passengers.every((item, i) => keys.every(key => item[key] != null) && Boolean(item.nationalCode || (item.passportCode && item.passportCity && item.passportDate)))
        }
    },

    methods: {
        async pay() {
            try {
                if(!this.isValid) {
                    this.$toast.alert(this.$createElement('span', {}, 'مسافرین را وارد کنید'), {
                        solid: false,
                        autoHideDelay: 10000
                    })
                    return
                }
                await this.$auth.authenticate()
                const {paymentUrl} = await flightApi.pay(this.$route.query.orderId)
                window.location = paymentUrl
            } catch (e) {

            }
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
