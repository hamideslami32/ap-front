<template>
    <div class="flight-detail mt-3 mx-2">
        <portal to="title">
            <span>جزئیات پرواز</span>
        </portal>
        <portal to="right-header">
            <svgicon name="share" width="30" height="30" />
        </portal>
        <div v-if="$flight.session" class="d-flex align-items-center justify-content-center mb-2">
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].origin.city | translate }}</span>
            <gradient-wrapper class="mx-2">
                <svgicon class="position-relative d-block icon-detail" name="single-arrow" width="30" height="20" />
            </gradient-wrapper>
            <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[0].destination.city | translate }}</span>
        </div>

        <template v-if="$fetchState.pending">
            <flight-placeholder v-for="i in 3" :key="i" />
        </template>
        <template v-else-if="!$fetchState.error">
            <div dir="ltr" class="d-flex align-items-center justify-content-center flex-row-reverse text-2 text-gray-800 mb-3">
                <span>{{ $dayjs($flight.session.routes[0].date).format('dddd D MMMM YY') }}</span>
                <span class="px-1">-</span>
                <span>
                    <template v-if="flights[0].stops.length > 1">
                        {{ flights[0].stops.length - 1 }}
                        توقف
                        <template v-if="flights[0].stops.length === 2">
                            در {{ flights[0].stops[0].arrivalCityName }}
                        </template>
                    </template>
                    <template v-else>
                        بدون توقف
                    </template>
                </span>
                <span class="px-1">-</span>
                <span class="en text-weight-500 text-capitalize text-left">{{ flights[0].flightClass }} ({{ flights[0].priceClass }})</span>
            </div>

            <div class="flight-detail__card-holder mt-3 mb-3">
                <flight-detail-card :flight="flights[0]" />
            </div>

            <template v-if="$flight.session.routes[1]">
                <div class="d-flex align-items-center justify-content-center mb-2 mt-1">
                    <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[1].origin.city | translate }}</span>
                    <gradient-wrapper class="mx-2">
                        <svgicon class="position-relative d-block icon-detail" name="single-arrow" width="30" height="20" />
                    </gradient-wrapper>
                    <span class="text-gray-900 text-weight-500">{{ $flight.session.routes[1].destination.city | translate }}</span>
                </div>

                <div dir="ltr" class="d-flex align-items-center justify-content-center flex-row-reverse text-2 text-gray-800 mb-3">
                    <span>{{ $dayjs($flight.session.routes[1].date).format('dddd D MMMM YY') }}</span>
                    <span class="px-1">-</span>
                    <span>
                        <template v-if="flights[1].stops.length > 1">
                            {{ flights[1].stops.length - 1 }}
                            توقف
                            <template v-if="flights[1].stops.length === 2">
                                در {{ flights[1].stops[0].arrivalCityName }}
                            </template>
                        </template>
                        <template v-else>
                            بدون توقف
                        </template>
                    </span>
                    <span class="px-1">-</span>
                    <span class="en text-weight-500">{{ flights[1].flightClass }} ({{ flights[1].priceClass }})</span>
                </div>

                <div class="flight-detail__card-holder mt-3 mb-3">
                    <flight-detail-card :flight="flights[1]" />
                </div>
            </template>


            <risk-free-card tag="Risk Free" tag-color="#45c6d4" />
            <price-detail :flights="flights" :session="$flight.session" />

            <div class="py-5" />
            <div class="py-4" />

            <flight-details-toast>
                <a-btn class="text-3 py-2 px-4" variant="secondary" :loading="loading" @click="submit">
                    رزرو کنید
                </a-btn>
            </flight-details-toast>
        </template>
        <template v-else>
            <p>خطایی رخ داده است.</p>
        </template>
    </div>
</template>

<script>
import FlightDetailCard from '~/components/flight/detail/FlightDetailCard'
import RiskFreeCard from '~/components/flight/detail/RiskFreeCard'
import PriceDetail from '~/components/flight/PriceDetail'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'
import {flightApi} from '~/api/flightApi'
import FlightPlaceholder from '~/components/flight/available/FlightPlaceholder'
import GradientWrapper from '~/components/ui/GradientWrapper'

export default {
    components: {
        GradientWrapper,
        FlightPlaceholder,
        FlightDetailsToast,
        FlightDetailCard,
        RiskFreeCard,
        PriceDetail
    },
    fetchOnServer: false,
    async fetch() {
        try {
            this.flights = await flightApi.getFlights(this.$flight.session.id, this.available._id, this.$route.query.flights.split(','))
        } catch (err) {
            if (err.response?.status === 440) {
                this.$flight.expireSession(() => {
                    this.$router.push('/flights')
                }, 'پرواز مورد نظر دیگر موجود نمی‌باشد.')
            }
        }
    },
    data() {
        return {
            flights: [],
            loading: false
        }
    },
    computed: {
        available() {
            return this.$flight.available
        }
    },

    methods: {
        async submit() {
            this.loading = true
            try {
                const {order} = await flightApi.createOrder({
                    sessionId: this.$flight.session.id,
                    availableId: this.available._id,
                    flightIds: this.flights.map(fl => fl._id),
                    callbackURL: this.$config.DOMAIN_URL + this.$router.resolve({name: 'issue'}).href
                })
                await this.$router.push({
                    path: this.$route.path + '/order',
                    query: {
                        ...this.$route.query,
                        orderId: order._id
                    }
                })
            } catch (e) {
                this.$toast.alert(e.response ? e.response.data.message : e.message)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .icon-detail {
        z-index: 1;
        background: map_get($grays, '500');
        border-radius: 5px;
        color: $secondary;
    }
</style>
