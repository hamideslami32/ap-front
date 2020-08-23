<template>
    <div class="flight-detail mt-3 mx-2">
        <portal to="header">
            <span>جزئیات پرواز</span>
        </portal>
        <div class="d-flex align-items-center justify-content-center mb-2">
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].origin.city | translate }}</span>
            <span class="mx-3">-</span>
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].destination.city | translate }}</span>
        </div>

        <!--<div class="d-flex align-items-center justify-content-center text-2 text-gray-800 mb-3">
            <span>{{ $dayjs($flight.session.routes[0].date).format('dddd D MMMM YY') }}</span>
            <span class="px-1">-</span>
            <span>توقف لندن</span>
            <span class="px-1">-</span>
            <span class="font-en text-weight-500">Economy(H)</span>
        </div>-->

        <div v-for="flight in flights" :key="flight._id" class="flight-detail__card-holder mt-3 mb-3">
            <flight-detail-card :flight="flight" @show-flight-rule="showFlightRule = true" />
        </div>

        <risk-free-card />
        <price-detail />

        <template>
            <b-modal v-model="showFlightRule" body-class="px-0" hide-footer>
                <template v-slot:modal-title>
                    قوانین استرداد
                </template>
                <template v-slot:modal-header-close>
                    <svgicon name="arrow-long-right" width="20" height="20" @click="showFlightRule = false" />
                </template>
                <div class="flight d-flex px-2 justify-content-between">
                    <span class="text-gray-800">تهران به پاریس</span>
                    <div class="d-flex">
                        <span class="text-2 text-left text-gray-700 font-en text-weight-500">
                            <div>A320</div>
                            <div>Economy</div>
                        </span>
                        <div class="line mx-2" />
                        <span>
                            <span class="ml-1 text-weight-500 text-gray-800">ترکیش ایرلاینز</span>
                            <span><img src="https://apro-dev.ir/static/ad/airlines/logo/B9.png" alt="" width="40px"></span>
                        </span>
                    </div>
                </div>
                <div class="rules mt-3 mx-2" />
                <div class="action">
                    <b-btn class="btn" variant="outline-secondary">
                        قوانین ویزا
                    </b-btn>
                </div>
            </b-modal>
        </template>

        <div class="py-5" />
        <div class="py-4" />

        <flight-details-toast>
            <b-button class="text-3 py-2 px-4" variant="secondary" @click="submit">
                رزرو کنید
            </b-button>
        </flight-details-toast>
    </div>
</template>

<script>
import FlightDetailCard from '~/components/flight/detail/FlightDetailCard'
import RiskFreeCard from '~/components/flight/detail/RiskFreeCard'
import PriceDetail from '~/components/flight/PriceDetail'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'
import {flightApi} from '~/api/flight'

export default {
    components: {
        FlightDetailsToast,
        FlightDetailCard,
        RiskFreeCard,
        PriceDetail
    },
    layout: 'page',
    data() {
        return {
            showFlightRule: true
        }
    },
    computed: {
        available() {
            return this.$flight.available
        },
        flights() {
            return this.$route.query.flights.split('-').map((flightIndex, i) => this.available.routes[i].flights[flightIndex])
        }
    },

    methods: {
        async submit() {
            const { order } = await flightApi.createOrder({
                sessionId: this.$flight.session.id,
                availableId: this.available._id,
                flightIds: this.flights.map(fl => fl._id)
            })
            await this.$router.push({
                path: this.$route.path + '/order',
                query: {
                    ...this.$route.query,
                    orderId: order._id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.flight {
    height: 50px;
    background: #f5f5f5;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
    // position: fixed;
    // width: 100%;
}
.line {
    height: 30px;
    border: 1px solid #e6e6e6;
}
.rules {
    background-color: $white;
    border: 1px solid #dddddd;
    height: 90%;
    border-radius: $borderRadius10;
}
.action {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;
    white-space: nowrap;
    .btn {
        min-width: 120px;
        height: 40px;
        &::after {
            content: '';
            width: 6px;
            height: 6px;
            display: inline-block;
            background: #e3469a;
            margin-right: 5px;
            border-radius: 50%;
        }
    }
}
</style>
