<template>
    <div class="destination-item border-bottom py-2">
        <div class="item" @click="$emit('select', item)">
            <div class="item__detail">
                <badge v-if="!showAirports" class="ml-2">
                    {{ item.id.slice(0, -3) }}
                </badge>
                <span class="item__detail--name font-weight-medium">
                    {{ $translate(item.airports[0].city) }}
                    <span class="item__detail--name__detail">(تمام فرودگاه ها)</span>
                </span>
            </div>
            <span class="item__badge">
                {{ item.airports[0].country.en.toLowerCase() }}
            </span>
        </div>
        <ul v-if="showAirports && item.airports && item.airports.length" class="list-unstyled p-0 m-0 text-gray-700">
            <li v-for="airport in item.airports" :key="airport.id">
                <a href="javascript:void(0)" class="d-block py-2 link-inherit" @click="$emit('select', airport)">
                    <badge class="ml-2" width="55">{{ airport.id }}</badge>
                    <span>
                        {{ $translate(airport.airport) }}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge.vue'

export default {
    name: 'FlightDestinationPickerItem',
    components: {
        Badge
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        showAirports: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.destination-item {
    font-size: 0.875rem;
    cursor: pointer;
}
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;

    &__detail {
        display: flex;
        align-items: center;

        &--name {
            margin-bottom: 0;
            font-weight: 500;
            color: $black;

            &__detail {
                font-size: 11px;
                color: $grayColor;
            }
        }
    }

    &__badge {
        font-weight: 600;
        font-size: 0.75rem;
        color: $darkGrayColor;
        text-transform: capitalize;
    }
}
</style>
