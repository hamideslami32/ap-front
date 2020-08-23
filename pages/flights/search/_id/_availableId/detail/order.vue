<template>
    <div>
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
        </div>

        <flight-details-toast>
            <b-button class="text-3 py-2 px-4" variant="success" @click="pay">
                تائید و پرداخت
            </b-button>
        </flight-details-toast>
    </div>
</template>

<script>

import PassengerField from '~/components/passenger/PassengerField'
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
    components: {FlightOrderCard, FlightDetailsToast, PassengerField},
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
