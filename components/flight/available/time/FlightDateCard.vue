<template>
    <div class="flight-date-card" :class="{ active }" @click="$emit('click')">
        <div class="flight-date-card__header">
            <span class="text-1 text-gray-700">
                {{ flight.stops.length > 1 ? `${flight.stops.length - 1} توقف` : 'بدون توقف' }}
            </span>
            <span>
                <img
                    v-for="airline in airlines"
                    :key="airline"
                    :src="$staticUrl('/ad/airlines/logo/' + airline + '.png')"
                    width="18"
                    height="18"
                    alt=""
                >
            </span>
        </div>
        <div class="flight-date-card__time d-flex align-items-center justify-content-between">
            <span v-if="flight.providerKey" class="flight-date-card__time__providerKey text-2 font-en text-secondary text-weight-600">
                {{ flight.providerKey }}
            </span>
            <span class="text-weight-500 text-3 text-gray-900">{{ $dayjs(firstStop.departureTime).format('HH:mm') }}</span>
            <span class="text-weight-500 text-3 text-gray-900">{{ $dayjs(firstStop.arrivalTime).format('HH:mm') }}</span>
        </div>
        <div class="flight-date-card__line my-2" />
        <p class="text-center text-1 text-weight-500 text-gray-700 mb-1">
            {{ flightDuration | duration }}
        </p>
    </div>
</template>

<script>
import FlightItem from '~/components/flight/available/FlightItem'

export default {
    name: 'FlightDateCard',

    extends: FlightItem,

    props: {
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-date-card {
        background: $white;
        border: 1px solid map_get($grays, '400');
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        padding: 5px 10px;
        border-radius: 10px;
        cursor: pointer;

        &.active {
            border-color: map_get($grays, '800');
            .flight-date-card__header {
                background-color: $pinkColor;
            }
        }

        &__time {
            position: relative;

            &__providerKey {
                position: absolute;
                top: 1px;
                left: 50%;
                transform: translate(-50%, 0);
            }
        }

        &, &__header {
            transition: all ease 250ms;
        }

        &__header {
            margin: 0 -5px;
            padding: 5px;
            background-color: map_get($grays, '200');
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            border-radius: 8px;
        }

        &__line {
            width: 100%;
            border: 1px dashed map_get($grays, '500');
            position: relative;
            padding: 0 5px;

            &:before, &:after {
                position: absolute;
                content: '';
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: $white;
                border: 1px solid map_get($grays, '400');
                top: -5px;
                bottom: 0;
            }

            &:before {
                left: -1px;
            }

            &:after {
                right: -1px;
            }
        }

        p {
            font-family: 'Baloo Thambi 2', Dana, Tahoma, serif;
        }

        &.disable {
            opacity: 0.6;
            pointer-events: none;
        }
    }
</style>
