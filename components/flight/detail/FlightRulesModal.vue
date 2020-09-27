<template>
    <b-modal :visible="show" body-class="py-1 px-0 rules-modal" hide-footer @change="$emit('input', $event)">
        <template v-slot:modal-title>
            {{ $flight.session.isDomestic ? 'قوانین استرداد' : 'قوانین استرداد / ویزا' }}
        </template>
        <template v-slot:modal-header-close>
            <svgicon name="delete-disabled" width="30" height="30" @click="showFlightRule = false" />
        </template>
        <header class="d-flex px-3 py-2 align-items-center justify-content-between shadow">
            <span class="text-gray-800 text-3">{{ flight.stops[0].departureCityName }} به {{ flight.stops[flight.stops.length - 1].arrivalCityName }}</span>
            <span class="mx-auto" />
            <div class="d-flex">
                <div class="text-2 text-left text-gray-700 font-en text-weight-500">
                    <p class="mb-0">
                        {{ flight.stops[0].aircraft }}
                    </p>
                    <p class="mb-0 text-capitalize">
                        {{ flight.flightClass }}
                    </p>
                </div>
                <div class="rules-modal__line mx-2" />
                <span>
                    <span class="ml-1 text-2 text-weight-500 text-gray-800">{{ flight.stops[0].airlineName }}</span>
                    <span><img :src="$flight.airlineLogoUrl(flight.stops[0].airline)" alt="" width="40px"></span>
                </span>
            </div>
            <div class="rules-modal__action">
                <b-btn v-if="!$flight.session.isDomestic" class="btn" variant="outline-secondary">
                    قوانین ویزا
                </b-btn>
            </div>
        </header>
        <div v-if="flight.rules" class="py-4 px-3">
            <div v-html="flight.rules.html" />
        </div>
    </b-modal>
</template>

<script>
import {flightApi} from '@/api/flightApi'

export default {
    model: {
        prop: 'show'
    },
    props: {
        flight: {
            type: Object,
            required: true
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show: {
            immediate: true,
            handler(t) {
                t && !this.flight.rules && this.fetchRules()
            }
        }
    },
    methods: {
        async fetchRules() {
            const { session, available } = this.$flight
            const rules = await flightApi.getFlightRules(session.id, available._id, [this.flight._id]).then(({ rules }) => rules[0])
            this.$set(this.flight,
                'rules',
                rules)
        }
    }
}
</script>

<style lang="scss" scoped>
.shadow {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
}
</style>
