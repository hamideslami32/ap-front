<template>
    <div class="flight-item" :class="{ reverse }">
        <div class="d-flex">
            <span class="flight-item__title">پرواز {{ title }}</span>
        </div>
        <div dir="ltr" class="flight-item__locations">
            <b>{{ firstStop.departureCityName }}</b>
            <svgicon name="chair" width="30" />
            <b class="text-left">{{ lastStop.arrivalCityName }}</b>
        </div>
        <div class="flight-item__map">
            <b class="flight-item__map__time">
                {{ $dayjs(firstStop.departureTime).format('HH:mm') }}
            </b>
            <span class="flight-item__map__line">
                <span v-for="i in flight.stops.length - 1" :key="i" />
            </span>
            <b class="flight-item__map__time">
                {{ $dayjs(lastStop.arrivalTime).format('HH:mm') }}
            </b>
        </div>
        <div class="flight-item__detail mt-2">
            <span>مدت: <span class="en">{{ flightDuration | duration }}</span></span>
            <span class="flight-item__detail--center">
                <template v-if="flight.stops > 1">
                    {{ flight.stops.length - 1 }}
                    توقف
                    <template v-if="flight.stops.length === 2">
                        در {{ flight.stops[0].arrivalCityName }}
                    </template>
                </template>
                <template v-else>
                    بدون توقف
                </template>
            </span>
            <span :class="{ 'text-danger': flight.freeSeats < 5 }">
                {{ flight.freeSeats >= 9 ? '+9' : flight.freeSeats }} صندلی
            </span>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        duration: x => {
            const h = Math.floor(x / 60)
            const m = x % 60
            return `${h ? h + 'h' : ''} ${m}m`
        }
    },
    props: {
        available: {
            type: Object,
            required: true
        },
        flight: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    computed: {
        flightDuration() {
            return this.flight.stops.reduce((c, stop) => c + stop.duration, 0)
        },
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
    @mixin circle {
        content: '';
        width: 10px;
        height: 10px;
        background: $white;
        border-radius: 50%;
        border: 1px solid #cccccc;
        margin-bottom: -5px;
    }

    .flight-item {
        color: #888888;
        padding: 10px;
        font-weight: 400;

        &.reverse{
            background: #f9f9f9;
            border-radius: 0px 0px 10px 10px;
        }

        &__title {
            font-size: 0.7em;
            font-weight: 700;
        }

        &__locations {
            color: $darkGrayColor;
            font-size: 0.8em;
            display: flex;
            align-items: center;
            justify-content: center;

            > b {
                flex: 50% 1 1;
            }
        }

        &__map {
            display: flex;
            align-items: center;

            &__time {
                font-size: 0.9em;
                color: $black;
                flex: auto 0 1;
                text-align: center;
            }

            &__line {
                margin: -5px 10px 0;
                border-bottom: 1px dashed #e6e6e6;
                height: 100%;
                flex: 1;
                display: flex;
                justify-content: space-between;

                > span {
                    @include circle;
                    width: 6px;
                    height: 6px;
                    border: 1px solid #666666;
                    justify-content: space-between;
                }

                &:before, &:after {
                    @include circle;
                }
            }
        }

        &__detail {
            display: flex;
            text-align: center;
            background: rgba(73, 35, 140, 0.1);
            border-radius: 50px;
            font-size: 0.7em;
            color: #888888;
            padding: 5px 0;
            align-items: center;

            &--center {
                border-left: 1px solid rgba(71, 32, 134, 0.1);
                border-right: 1px solid rgba(71, 32, 134, 0.1);
            }

            span {
                flex: 1;
            }
        }
    }
</style>
