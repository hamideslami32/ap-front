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
                <div class="text-2 text-left text-gray-700 en text-weight-500">
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
            <sticky-bottom>
                <b-btn
                    v-if="!$flight.session.isDomestic"
                    class="btn"
                    variant="outline-secondary"
                    @click="showVisaRules = !showVisaRules"
                >
                    {{ showVisaRules ? 'قوانین استرداد' : 'قوانین ویزا' }}
                </b-btn>
            </sticky-bottom>
        </header>
        <div v-if="loading">
            <lottie-animation path="lottie/loading2.json" />
        </div>
        <div v-else-if="flight.rules" class="py-4 px-3">
            <div v-if="!showVisaRules" v-html="flight.rules.html" />
            <div v-else>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet atque culpa cum dignissimos
                    doloremque eligendi expedita fugit inventore ipsa mollitia nisi non, officia praesentium provident
                    reprehenderit vero. Ad aut excepturi illo impedit maiores nam officia placeat similique unde
                    voluptates!
                </p>
            </div>
        </div>
    </b-modal>
</template>

<script>
import {flightApi} from '@/api/flightApi'
import StickyBottom from '~/components/ui/StickyBottom'

export default {
    components: {StickyBottom},
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
    data() {
        return {
            showVisaRules: false,
            loading: false
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
            const {session, available} = this.$flight
            this.loading = true
            const rules = await flightApi.getFlightRules(session.id, available._id, [this.flight._id])
                .then(({rules}) => rules[0])
                .finally(() => {
                    this.loading = false
                })
            this.$set(this.flight,
                'rules',
                rules)
        }
    }
}
</script>

<style lang="scss">
    .rules-modal {
        .shadow {
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        }

        .h-refund-list {
            list-style: none;
            padding: 0;
        }
        .h-refund-list > li {
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 3px 6px rgba(0,0,0, 0.05);
            overflow: auto;
            border-radius: 5px;
            transition: all ease 300ms;
            font-size: 0.9em;
        }
        .h-refund-list > li:hover {
            box-shadow: 0 6px 15px rgba(0,0,0, 0.1);
        }

        .sticky-bottom {
            position: fixed;
        }
    }
</style>
