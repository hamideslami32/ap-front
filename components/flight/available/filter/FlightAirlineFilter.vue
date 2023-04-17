<template>
    <panel icon="plane" title="ایرلاین ها" body-class="px-3">
        <group-checkbox class="group" :value="value" :options="mappedAirlines" @input="$emit('input', $event)">
            <template v-slot="{ item }">
                <span class="airline-item">
                    <img :src="$flight.airlineLogoUrl(item.value)" alt="" width="34">
                </span>
                <span class="align-middle mr-2">
                    {{ item.title }}
                </span>
            </template>
        </group-checkbox>
    </panel>
</template>

<script>
import Panel from '~/components/ui/Panel'
import GroupCheckbox from '~/components/ui/form/GroupCheckbox'
export default {
    name: 'FlightAirlineFilter',
    components: {GroupCheckbox, Panel},

    props: {
        value: {
            type: Array,
            default: () => []
        },
        airlines: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        mappedAirlines() {
            return this.airlines.map(airline => ({
                title: airline.name.fa || airline.name.en,
                value: airline.id,
                price: null
            }))
        }
    }
}
</script>

<style lang="scss" scoped>
.airline-item {
    display: inline-block;
    vertical-align: middle;
    padding: 5px 12px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    border: 1px solid map_get($grays, '400');
    background: $white;

    > img {
        display: block;
        background-color: $white;
        vertical-align: middle;
        object-fit: contain;
    }

    .custom-control-input:checked ~ label & {
        border-color: $primary;
    }

}
.group /deep/ .custom-control-label::before,.group /deep/ .custom-control-label::after {
    border-radius: 5px !important;
    border-color: map-get($grays, '800');
    width: 20px !important;
    height: 20px !important;
}
</style>
