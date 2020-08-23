<template>
    <div class="detail-item">
        <div class="detail-item__airplane">
            <span class="font-en">{{ stop.aircraft }}</span>
            <span class="pl-2">|</span>
            <span>شماره پرواز: {{ stop.flightNumber }}</span>
            <span class="flex-grow-1" />
            <span class="px-1 text-2">{{ stop.airlineName }}</span>
            <img
                class="rounded-circle"
                :src="$flight.airlineLogoUrl(stop.airline)"
                :alt="stop.airlineName"
                width="26"
                height="26"
            >
        </div>
        <div class="detail-item__cities d-flex align-items-center mt-2">
            <span class="small font-en">{{ stop.departureCityName }}</span>
            <svgicon name="plane-takeoff" class="text-gray-700" width="40" height="20" />
            <span class="small font-en text-left">{{ stop.arrivalCityName }}</span>
        </div>
        <div class="detail-item__time d-flex align-items-center justify-content-between mt-3 mb-2">
            <div class="detail-item__time__holder">
                <p class="text-weight-600 text-gray-900 mb-0 py-1">
                    {{ departureTime.format('HH:mm') }}
                </p>
                <p class="font-en text-1 text-gray-800 text-weight-500 mb-0 py-1" dir="ltr">
                    {{ departureTime.calendar('gregory').locale('en').format('DD MMM').toUpperCase() }}
                </p>
            </div>
            <div class="flex-grow-1 mt-2 px-3">
                <div class="detail-item__time__route px-3">
                    <span class="text-2 text-weight-500 font-en text-gray-700">{{ stop.duration | duration }}</span>
                </div>
                <div class="text-1 text-gray-800 text-weight-500 mt-4 d-flex align-items-center justify-content-between">
                    <span>{{ departureTime.format('D MMMM YY') }}</span>
                    <span>{{ arrivalTime.format('D MMMM YY') }}</span>
                </div>
            </div>
            <div class="detail-item__time__holder">
                <p class="text-weight-600 text-gray-900 mb-0 py-1">
                    {{ arrivalTime.format('HH:mm') }}
                </p>
                <p class="font-en text-1 text-gray-800 text-weight-500 mb-0 py-1" dir="ltr">
                    {{ arrivalTime.calendar('gregory').locale('en').format('DD MMM').toUpperCase() }}
                </p>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <badge class="px-3">
                {{ stop.departureAirport }}
            </badge>
            <div class="d-flex align-items-center flex-grow-1 px-3 justify-content-between font-en text-weight-500 text-2 text-gray-700">
                <span class="">{{ stop.departureAirportName.replace(/فرودگاه|بین[\s+‌]المللی/g, '') }}</span>
                <span class="text-left">{{ stop.arrivalAirportName.replace(/فرودگاه|بین[\s+]المللی/g, '') }}</span>
            </div>
            <badge class="px-3">
                {{ stop.arrivalAirport }}
            </badge>
        </div>

        <div v-if="showStop" class="alert alert-info p-2 my-3">
            <svgicon name="chair" class="text-gray-700 p-1" width="18" height="18" />
            <span class="text-weight-500 text-2 text-gray-900">توقف در {{ stop.arrivalCityName }} به مدت {{ stop.duration | duration(true) }}</span>
        </div>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'

export default {
    components: {Badge},
    props: {
        showStop: {
            type: Boolean,
            default: false
        },
        stop: {
            type: Object,
            required: true
        }
    },
    computed: {
        departureTime() {
            return this.$dayjs(this.stop.departureTime)
        },
        arrivalTime() {
            return this.$dayjs(this.stop.arrivalTime)
        }
    }
}
</script>

<style lang="scss" scoped>
    @mixin line {
        content: '';
        width: 3px;
        background: map_get($grays, '400');
        border-radius: 100px;
        position: absolute;
        top: 0;
        bottom: 0;
    }

    @mixin circle {
        content: '';
        width: 12px;
        height: 12px;
        background: $white;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        border: 1px solid map_get($grays, '400');
        top: -6px;
    }

    .detail-item {
        &__airplane {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: map_get($grays, '800');
            font-size: 0.625rem;
            background: map_get($grays, '200');
            padding: 5px 10px;
            border-radius: 8px;
            border: 1px solid map_get($grays, '500');

            >span:first-child {
                width: 40px;
            }
        }

        &__cities {
            position: relative;
            padding: 0 10px;
            color: map_get($grays, '800');
            font-weight: 500;

            svg {
                transform: scaleX(-1);
            }

            > span {
                flex: 1 0 1px;
            }

            &::before, &::after {
                @include line;
                right: 0;
            }

            &::after {
                left: 0;
                right: auto;
            }
        }

        &__time {
            &__holder {
                background: map_get($grays, '500');
                border: 1px solid map_get($grays, '500');
                border-radius: 5px;
                min-width: 55px;
                text-align: center;

                p {
                    &:first-child {
                        background: $white;
                        border-radius: 5px;
                        margin: 1px;
                    }
                }
            }

            &__route {
                border-top: 1px dashed map_get($grays, '400');
                position: relative;

                > span {
                    background: $white;
                    border: 1px solid map_get($grays, '500');
                    padding: 1px 10px;
                    border-radius: 100px;
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                &:before {
                    @include circle;
                    right: 0;
                }

                &:after {
                    @include circle;
                    left: 0;
                }
            }
        }

        /deep/ .badge {
            font-size: 0.75rem;
        }

        .alert {
            text-align: center;
            position: relative;

            svg {
                position: absolute;
                right: 15px;
                bottom: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>
