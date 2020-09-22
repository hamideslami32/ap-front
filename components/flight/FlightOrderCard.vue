<template>
    <b-row class="ticket ticket--fa font-en" no-gutters>
        <b-col cols="9" class="p-3 ticket__destination d-flex align-items-center">
            <div class="ticket__destination__arrow text-1" :class="{ 'ticket__destination__arrow--single': onWay }">
                <span class="d-block mx-auto" />
                <svgicon
                    :name="onWay ? 'single-arrow' : 'arrows-round'"
                    class="my-3"
                    width="24"
                    height="20"
                />
                <span class="d-block mx-auto" />
            </div>
            <div class="ticket__destination__info flex-grow-1 text-left px-2">
                <div class="d-flex align-items-center text-weight-500">
                    <span class="text-2 py-1 px-2">{{ $dayjs(firstStop.departureTime).format('HH:mm') }}</span>
                    <span class="text-3 mx-2">{{ firstStop.departureCityName }}</span>
                    <span class="text-2 text-weight-400 ml-2 pt-1" :dir="isDomestic ? 'rtl' : 'ltr'">{{ departureDate }}</span>
                </div>

                <p class="flight-type my-2 text-secondary text-weight-500 text-1">
                    {{ isRoundTrip }}
                </p>

                <div class="d-flex align-items-center text-weight-500">
                    <span class="text-2 py-1 px-2">{{ $dayjs(lastStop.arrivalTime).format('HH:mm') }}</span>
                    <span class="text-3 mx-2">{{ lastStop.arrivalCityName }}</span>
                    <span class="text-2 text-weight-400 ml-2 pt-1" :dir="isDomestic ? 'rtl' : 'ltr'">{{ arrivalDate }}</span>
                </div>
            </div>
        </b-col>
        <b-col cols="3" class="p-3 ticket__info text-center">
            <div>
                <div class="mb-2">
                    <img
                        v-for="airline in airlines"
                        :key="airline"
                        class="rounded-circle m-1"
                        :src="$flight.airlineLogoUrl(airline)"
                        alt=""
                        width="30"
                        height="30"
                    >
                </div>
                <div class="ticket__info__class-type text-center text-weight-500">
                    <p class="text-1 mb-0 py-1 text-capitalize">
                        {{ order.session.class }}
                    </p>
                    <p class="text-1 mb-0 py-1" dir="ltr">
                        {{ order.session.adult + order.session.child + order.session.infant }} Traveller
                    </p>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import flattenDeep from 'lodash/flattenDeep'
import flightSearchMixin from '~/components/flight/flight-search/flightSearchMixin'

export default {
    mixin: [flightSearchMixin],
    props: {
        order: {
            type: Object,
            required: true
        },
        onWay: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        flight() {
            return this.order.flights[0]
        },
        firstStop() {
            return this.flight.stops[0]
        },
        lastStop() {
            return this.flight.stops[this.flight.stops.length - 1]
        },
        isDomestic() {
            return this.order.session.isDomestic
        },
        airlines() {
            return [...new Set(flattenDeep(this.order.flights.map(flight => flight.stops.map(stop => stop.airline))))]
        },
        departureDate() {
            if (this.isDomestic) return this.$dayjs(this.firstStop.departureTime).format('D MMMM YY')
            else return this.$dayjs(this.firstStop.departureTime).calendar('gregory').locale('en').format('YYYY MMMM D')
        },
        arrivalDate() {
            if (this.isDomestic) return this.$dayjs(this.lastStop.arrivalTime).format('D MMMM YY')
            else return this.$dayjs(this.lastStop.arrivalTime).calendar('gregory').locale('en').format('YYYY MMMM D')
        },
        isRoundTrip() {
            let title
            let isRounded = this.order.flights.length === 2
            if (this.isDomestic) {
                if (isRounded) title = 'رفت و برگشت'
                else title = 'یک طرفه'
            }  else {
                if (isRounded) title = 'Round Trip'
                else title = 'One Way'
            }
            return title
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin line {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    width: 1px;
    background: $white;
    height: 15px;
    margin: 0 auto;
}

.ticket {
    background: linear-gradient(90deg, $primary 0%, $lightPrimary 100%);
    border-radius: 10px;
    color: $white;

    &__info {
        border-left: 1px dashed rgba(255, 255, 255, 0.2);

        &__class-type {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            padding: 2px;

            p {
                &:first-child {
                    border-radius: 5px;
                    background: #6b4ba2;
                }
            }
        }
    }

    &__destination {
        &__info {

            > div {
                span {
                    &:last-child {
                        color: #ae90e3;
                    }

                    &:first-child {
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 5px;
                    }
                }
            }

        }

        &__arrow {
            span {
                width: 9px;
                height: 9px;
                background: transparent;
                border: 1px solid $white;
                border-radius: 50%;
                position: relative;

                &:first-child {
                    &:after {
                        @include line;
                        bottom: -15px;
                    }
                }

                &:last-child {
                    &:before {
                        @include line;
                        top: -15px;
                    }
                }
            }

            svg {
                color: #ae90e3;
                transform: rotate(90deg);
            }
            &.ticket__destination__arrow--single {
                svg {
                    transform: rotate(-90deg);
                }
            }
        }
    }
    &.ticket--fa {
        .ticket__info {
            border-left: none;
            border-right: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .flight-type {
            text-align: right;
        }
    }
}

</style>
