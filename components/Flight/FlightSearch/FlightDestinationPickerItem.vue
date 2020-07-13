<template>
    <div class="destination-item border-bottom py-2">
        <div class="item" @click="$emit('select', item)">
            <div class="item__detail">
                <badge v-if="!showAirports" class="ml-2">
                    {{ item.id.slice(1) }}
                </badge>
                <span class="item__detail--name">
                    {{ item.airports[0].city.fa || item.airports[0].city.en }}
                    <span class="item__detail--name__detail">(تمام فرودگاه ها)</span>
                </span>
            </div>
            <span class="item__badge">
                {{ item.airports[0].country.en.toLowerCase() }}
            </span>
        </div>
        <ul v-if="showAirports && item.airports && item.airports.length" class="list-unstyled p-0 m-0">
            <li v-for="airport in item.airports" :key="airport.id">
                <a href="javascript:void(0)" class="d-block py-2 link-inherit" @click="$emit('select', airport)">
                    <badge class="ml-2" width="55">{{ airport.id }}</badge>
                    <span>
                        {{ airport.airport.fa || airport.airport.en }}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import Badge from '~/components/Ui/Buttons/Badge.vue'

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
            font-size: 15px;
            line-height: 20px;
            color: $black;

            &__detail {
                font-size: 11px;
                line-height: 20px;
                color: $grayColor;
            }
        }
    }

    &__badge {
        font-weight: 600;
        font-size: 13px;
        color: $darkGrayColor;
        text-transform: capitalize;
    }
}
</style>