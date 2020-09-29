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

        <div class="detail-card__tag" @click="showRulesModal = true">
            <curve-badge color="#49238c" :bottom="true" :width="180">
                <span class="text-nowrap">{{ $flight.session.isDomestic ? 'قوانین استرداد' : 'قوانین استرداد / ویزا' }}</span>
            </curve-badge>
        </div>

        <flight-rules-modal v-model="showRulesModal" :flight="flight" />
    </div>
</template>

<script>
import DetailItem from '~/components/flight/detail/FlightDetailItem'
import FlightRulesModal from '~/components/flight/detail/FlightRulesModal'
import CurveBadge from '~/components/ui/CurveBadge'

export default {
    components: {
        DetailItem,
        CurveBadge,
        FlightRulesModal
    },
    props: {
        flight: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showRulesModal: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .detail-card {
        background: map-get($grays, '200');
        border-radius: 10px;
        border: 1px solid map_get($grays, '600');
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
</style>
