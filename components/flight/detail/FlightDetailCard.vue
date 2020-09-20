<template>
    <div class="detail-card">
        <div class="detail-card__wrapper mb-4">
            <detail-item
                v-for="(stop, i) in flight.stops"
                :key="i"
                :stop="stop"
                :show-stop="i !== flight.stops.length - 1"
            />
        </div>

        <div class="detail-card__rule">
            <div class="detail-card__rule__text">
                <svgicon name="bag" class="text-gray-700" width="20" height="20" />
                <span class="mr-1">بار مجاز : {{ flight.baggage }}</span>
            </div>
            <div v-show="false" class="detail-card__rule__type">
                <div>قابل استرداد</div>
            </div>
        </div>

        <div class="detail-card__tag" @click="flightRuleModal = true">
            <curve-badge color="#49238c" :bottom="true" :width="180">
                <span class="text-nowrap">{{ detailRefundRules }}</span>
            </curve-badge>
        </div>

        <b-modal v-model="flightRuleModal" body-class="py-1 px-0" hide-footer>
            <template v-slot:modal-title>
                {{ detailRefundRules }}
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="delete-disabled" width="30" height="30" @click="showFlightRule = false" />
            </template>
            <div class="rules-modal d-flex px-2 align-items-center justify-content-between">
                <span class="text-gray-800 text-3">{{ flight.stops[0].departureCityName }} به {{ flight.stops[flight.stops.length - 1].arrivalCityName }}</span>
                <div class="d-flex">
                    <div class="text-2 text-left text-gray-700 font-en text-weight-500">
                        <p class="mb-0">
                            {{ flight.stops[0].aircraft }}
                        </p>
                        <p class="mb-0 text-capitalize">
                            {{ flight.flightClass }}
                        </p>
                    </div>
                    <div class="rules-modal__line mx-2" />
                    <span>
                        <span class="ml-1 text-2 text-weight-500 text-gray-800">{{ flight.stops[0].airlineName }}</span>
                        <span><img :src="$flight.airlineLogoUrl(flight.stops[0].airline)" alt="" width="40px"></span>
                    </span>
                </div>
                <div class="rules-modal__action">
                    <b-btn class="btn" variant="outline-secondary">
                        قوانین ویزا
                    </b-btn>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import DetailItem from '~/components/flight/detail/FlightDetailItem'
import CurveBadge from '~/components/ui/CurveBadge'

export default {
    components: {
        DetailItem,
        CurveBadge
    },
    props: {
        flight: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            flightRuleModal: false
        }
    },
    computed: {
        detailRefundRules() {
            return this.$flight.session.isDomestic ? 'قوانین استرداد' : 'قوانین استرداد / ویزا'
        }
    }
}
</script>

<style lang="scss" scoped>
    .detail-card {
        background: map-get($grays, '200');
        border-radius: 10px;
        border: 1px solid map_get($grays, '400');
        position: relative;

        &__wrapper {
            border-radius: 10px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
            background: $white;
            padding: 10px;
        }

        /deep/ .alert {
            background: #e4f7f9;
            border-radius: 8px;

            svg {
                background: $white;
                box-sizing: content-box;
                border-radius: 50%;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            }
        }

        &__rule {
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2.5em;

            &__text {
                font-size: 0.75rem;
                color: map_get($grays, '800');

                span:last-child {
                    font-family: 'Baloo Thambi 2', Dana, Tahoma, serif;
                    font-weight: 500;
                }
            }

            svg {
                padding: 5px;
                box-sizing: content-box;
                background: $white;
                border-radius: 50%;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            }

            &__type {
                width: 90px;
                height: 30px;
                font-size: 0.75rem;
                color: #45c6d4;
                background: linear-gradient(90deg, #45c6d4 0%, rgba(69, 198, 212, 0.1) 100%);
                border-radius: 5px;
                position: relative;

                > div {
                    background: #e3f0f2;
                    border-radius: 5px;
                    line-height: 30px;
                    text-align: center;
                    position: absolute;
                    left: 1px;
                    bottom: 1px;
                    right: 1px;
                    top: 1px;
                }
            }
        }

        &__tag {
            position: absolute;
            height: 24px;
            width: 150px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 0;
            left: 0;
            bottom: -1px;
            margin: auto;
        }
    }

    .rules-modal {
        height: 50px;
        background: #f5f5f5;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

        &__line {
            height: 30px;
            border: 1px solid #e6e6e6;
        }

        &__container {
            background-color: $white;
            border: 1px solid #dddddd;
            height: 90%;
            border-radius: $borderRadius10;
        }

        &__action {
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
    }
</style>
