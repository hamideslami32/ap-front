<template>
    <div v-if="available" class="flight-time">
        <portal to="header">
            <span>انتخاب ساعت پرواز</span>
        </portal>
        <div class="flight-time__header d-flex align-items-center py-3 justify-content-between">
            <span class="px-3 text-2 text-gray-700">{{ classTypeText }}</span>
            <div class="flight-time__header__places">
                <span class="text-gray-800 text-3">{{ $translate(search.origin.city) }}</span>
                <svgicon
                    class="pair-icon text-primary"
                    name="arrows-round"
                    width="26"
                    height="26"
                />
                <span class="text-gray-800 text-3">{{ $translate(search.destination.city) }}</span>
            </div>
            <span class="px-3 text-2 text-gray-700">۲ مسافر</span>
        </div>
        <div class="d-flex flight-time__container">
            <div>
                <div class="text-2 text-gray-900 mb-2 text-weight-500 pt-3">
                    <b>پرواز رفت</b>
                    <p class="mt-3">
                        <span class="text-2 text-primary text-weight-600">
                            {{ available.routes[0].origin }}
                            -
                            {{ available.routes[0].destination }}
                        </span>
                        <span class="text-2 text-gray-800 text-weight-400 float-left">۲۰ تیر ۹۹</span>
                    </p>
                </div>

                <div>
                    <flight-date-card v-for="flight in available.routes[0].flights" :key="flight._id" :flight="flight" :available="available" />
                </div>
            </div>
            <div v-if="available.routes[1]" class="bg-gray-500">
                <div class="text-2 text-gray-900 mb-2 text-weight-500 pt-3 text-left">
                    <b>پرواز برگشت</b>
                    <p class="mt-3">
                        <span class="text-2 text-primary text-weight-600 float-right">
                            {{ available.routes[1].origin }}
                            -
                            {{ available.routes[1].origin }}
                        </span>
                        <span class="text-2 text-gray-800 text-weight-400">۲۰ تیر ۹۹</span>
                    </p>
                </div>

                <div>
                    <flight-date-card v-for="flight in available.routes[1].flights" :key="flight._id" :flight="flight" :available="available" />
                </div>
            </div>
        </div>

        <div class="p-2 sticky-bottom">
            <div class="text-center">
                <svgicon /> قیمت برای هر نفر ۱،۵۰۰،۰۰۰ تومان
            </div>
        </div>
    </div>
</template>

<script>
import FlightDateCard from '~/components/flight/available/details/FlightDateCard'
import flightSearchMixin from '~/components/flight/flight-search/flightSearchMixin'

export default {
    components: {FlightDateCard},
    layout: 'page',

    mixins: [flightSearchMixin],

    computed: {
        available() {
            return this.$flight.available
        }
    }
}
</script>

<style lang="scss" scoped>
.flight-time {
    overflow: hidden;
    &__header {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

        > span {
            &:first-child {
                border-left: 1px solid map_get($grays, '400');
            }

            &:last-child {
                border-right: 1px solid map_get($grays, '400');
            }
        }

        &__places {
            display: flex;
            flex-grow: 1;
            justify-content: space-evenly;
            padding: 0 15px;
            align-items: center;

            svg {
                border: 1px solid map_get($grays, '400');
                border-radius: 50%;
                padding: 3px;
                box-sizing: content-box;
            }

            span {
                font-weight: 500;
            }
        }
    }

    &__container {
        position: absolute;
        top: 126px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;

        > div {
            flex: 1;
            overflow-y: scroll;
            height: 100%;
            padding: 0 10px;
        }
    }

    /deep/ .flight-date-card {
        margin-bottom: 15px;

        &:last-child {
            margin-bottom: 60px;
        }
    }
}

.sticky-bottom {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 10px;
}
</style>
