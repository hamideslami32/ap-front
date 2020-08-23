<template>
    <b-row dir="ltr" class="ticket font-en" no-gutters>
        <b-col cols="9" class="p-3 ticket__destination d-flex align-items-center">
            <div class="ticket__destination__arrow text-1">
                <span class="d-block mx-auto" />
                <svgicon name="arrows-round" class="my-3" width="24" height="20" />
                <span class="d-block mx-auto" />
            </div>
            <div class="ticket__destination__info flex-grow-1 text-left px-2">
                <div class="d-flex align-items-center text-weight-500">
                    <span class="text-2 py-1 px-2">{{ $dayjs(firstStop.departureTime).format('HH:mm') }}</span>
                    <span class="text-3 ml-2">{{ firstStop.departureCityName }}</span>
                    <span class="text-2 text-weight-400 ml-2 pt-1">{{ $dayjs(firstStop.departureTime).calendar('gregory').locale('en').format('D MMMM YYYY') }}</span>
                </div>

                <p class="my-2 text-secondary text-weight-500 text-1">
                    {{ available.routes.length === 2 ? 'Round Trip' : 'One Way' }}
                </p>

                <div class="d-flex align-items-center text-weight-500">
                    <span class="text-2 py-1 px-2">{{ $dayjs(lastStop.arrivalTime).format('HH:mm') }}</span>
                    <span class="text-3 ml-2">{{ lastStop.arrivalCityName }}</span>
                    <span class="text-2 text-weight-400 ml-2 pt-1">{{ $dayjs(lastStop.arrivalTime).calendar('gregory').locale('en').format('D MMMM YYYY') }}</span>
                </div>
            </div>
        </b-col>
        <b-col cols="3" class="p-3 ticket__info  text-center">
            <div class="">
                <div class="mb-2">
                    <img
                        class="rounded-circle"
                        :src="$flight.airlineLogoUrl('B9')"
                        alt=""
                        width="30"
                        height="30"
                    >
                </div>
                <div class="ticket__info__class-type text-center text-weight-500">
                    <p class="text-1 mb-0 py-1 text-capitalize">
                        {{ $flight.session.class }}
                    </p>
                    <p class="text-0 mb-0 py-1">
                        {{ $flight.passengersCount }} Traveller
                    </p>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: {
        available: {
            type: Object,
            required: true
        },
        flight: {
            type: Object,
            required: true
        }
    },

    computed: {
        firstStop() {
            return this.flight.stops[0]
        },
        lastStop() {
            return this.flight.stops[this.flight.stops.length - 1]
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
    background: linear-gradient(90deg, $primary 0%, #6d4ea3 100%);
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
        }
    }
}
</style>
