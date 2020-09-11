<template>
    <div class="flight-card" @click="$emit('click', $event)">
        <div class="d-flex align-items-center flight-card__top">
            <span class="flight-card__price">{{ Math.floor(available.totalFare / $flight.passengersCount) | separateNumber }}</span>
            <span class="text-weight-400 text-2 mr-1 pb-1 text-gray-700">برای هر نفر (تومان)</span>
        </div>
        <div class="flight-tag">
            <span>ارزان ترین</span>
        </div>
        <div class="flight-card__items">
            <flight-item
                v-for="(route, i) in available.routes"
                :key="i"
                :available="available"
                :flight="route.flights[0]"
                :title="i === 0 ? 'رفت' : 'برگشت'"
            />
        </div>
        <div class="clearfix">
            <div v-if="similarFlightsCount" class="alternative-holder">
                <div class="alternative">
                    <div class="shape" />
                    <span>{{ similarFlightsCount }} پرواز مشابه</span>
                </div>
            </div>
            <div class="float-left d-flex align-items-center">
                <span class="flight-card__select-text ml-2">انتخاب</span>
                <div class="circle">
                    <svgicon name="arrow-long-right" width="18" height="20" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FlightItem from '~/components/flight/available/FlightItem'

export default {
    components: {
        FlightItem
    },
    props: {
        available: {
            type: Object,
            required: true
        }
    },
    computed: {
        similarFlightsCount() {
            const { routes, totalFare } = this.available
            if (routes.length === 1) {
                return routes[0].flights.length - 1
            }
            if (routes.length === 2) {
                let count = 0
                routes[0].flights.forEach(f1 => {
                    routes[1].flights.forEach(f2 => {
                        count += this.$flight.flightPrice(f1) + this.$flight.flightPrice(f2) === totalFare ? 1 : 0
                    })
                })
                return count - 1
            }
            return 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-card {
        border-radius: 10px;
        border: 1px solid map_get($grays, '400');
        padding: 15px 10px 10px;
        font-weight: 600;
        position: relative;
        box-shadow: 0 3px 8px rgba($black, 0.1);


        &__top {
            background: white;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            margin: -15px -10px -10px;
            padding: 15px 10px;
        }

        &__price {
            font-size: 1.2em;
            color: $secondary;
        }

        &__items {
            background-color: $white;
            margin: 8px -10px 15px;
            box-shadow: 0 3px 5px rgba($black, 0.1);
            border-radius: 0 0 10px 10px;
            border-top: 1px solid $modalBorder;
        }

        .alternative-holder {
            position: absolute;
            right: 0;
            bottom: 13px;

            .alternative {
                padding: 5px 10px 5px 15px;
                text-align: right;
                font-size: 0.7em;
                border-top-left-radius: 30px;
                border-bottom-left-radius: 30px;
                border-bottom-right-radius: 25px;
                font-weight: 600;
                color: $white;
                background: $secondary;
                position: relative;

                .shape {
                    content: '';
                    position: absolute;
                    width: 21px;
                    height: 15px;
                    top: -15px;
                    background: #f5f5f5;
                    border-bottom-right-radius: 30px;
                    right: 0;
                }

                &:before {
                    content: '';
                    width: 17px;
                    height: 10px;
                    position: absolute;
                    background: #e3469a;
                    right: 0;
                    top: -9px;
                }
            }
        }

        &__select-text {
            font-weight: 600;
            color: $primary;
            font-size: 0.8em;
        }

        .circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: $primary;
            display: flex;
            align-items: center;

            svg {
                transform: rotate(180deg);
                color: $white;

            }
        }

        .flight-tag {
            position: absolute;
            left: 20px;
            top: -1px;
            height: 24px;
            width: 80px;
            background: map_get($grays, '200');
            border: 1px solid #dddddd;
            border-top-color: $body-bg;
            border-bottom-left-radius: 12px 20px;
            border-bottom-right-radius: 12px 20px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 0.6em;
                color: $secondary;
            }
        }
    }
</style>
