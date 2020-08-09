<template>
    <div class="flight-card">
        <span class="flight-card__price">{{ available.totalFare | separateNumber }}</span>
        <span class="flight-card__price__text">برای هر نفر (تومان)</span>
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
            <div class="alternative-holder">
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
            return this.available.routes.reduce((carry, item) => Math.max(carry, item.flights.length), 0)
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-card {
        border-radius: 10px;
        border: 1px solid #dddddd;
        padding: 15px 10px 10px;
        font-weight: 600;
        position: relative;
        box-shadow: 0 3px 8px rgba($black, 0.1);

        &__price {
            font-size: 1.2em;
            color: $info;

            &__text {
                font-size: 0.6em;
                color: #888888;
                font-weight: 400;
            }
        }

        &__items {
            background-color: $white;
            margin: 8px -10px 15px;
            box-shadow: 0 3px 5px rgba($black, 0.1);
            border-radius: 0 0 10px 10px;
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
                background: $info;
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
            background: transparent;
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
                color: $info;
            }
        }
    }
</style>
