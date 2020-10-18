<template>
    <div class="refund">
        <portal to="right-header">
            <span />
        </portal>
        <portal to="title">
            استرداد بلیط
        </portal>
        <div class="refund__header d-flex align-items-center justify-content-between text-gray-700 mb-2 px-2 mt-3">
            <div>
                <badge class="px-2">
                    {{ step }}
                </badge>
                <span class="text-weight-500 mr-2">انتخاب مسیر</span>
            </div>
            <div>
                <span class="text-2">مرحله بعد</span>
                <span class="refund__header__curve text-2 text-gray-800 text-weight-500 px-2 py-1">انتخاب مسافر</span>
            </div>
        </div>
        <div class="refund__progress mb-3">
            <div class="refund__progress__bar h-100 w-50" />
        </div>
        <div class="px-2 mb-3">
            <flight-order-card v-if="order" :on-way="!order.session.routes[1]" :order="order" />
            <ticket-placeholder v-else />
        </div>
        <div v-if="step = 1">
            <b-form-group class="en font-weight-medium mb-5">
                <b-form-radio
                    v-for="x in refundItems"
                    :key="x.value"
                    v-model="selectedRoute"
                    class="mb-2 mx-1 w-50"
                    :class="{ active: selectedRoute === x.value }"
                    checked="flightClass"
                    name="flight_class"
                    :value="x.value"
                    inline
                >
                    {{ x.title }}
                </b-form-radio>
            </b-form-group>
            
            <a-btn
                :disabled="!selectedRoute.length"
                class="refund__select-passenger-btn text-right text-weight-500 text-2"
                wrapper-class="w-50 mx-auto"
                block
                icon="arrow-left"
                variant="outline-secondary"
                @click="selectPassenger"
            >
                مرحله بعد(انتخاب مسافر)
            </a-btn>
        </div>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'
import {profileApi} from '~/api/profile'
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import TicketPlaceholder from '~/components/flight/TicketPlaceholder'
export default {
    components: {TicketPlaceholder, FlightOrderCard, Badge},
    data() {
        return {
            step: 1,
            order: null,
            routes: [
                { value: 'departing', title: 'رفت' }
            ],
            selectedRoute: ''
        }
    },
    computed: {
        refundItems() {
            if (!this.order) return []
            return [
                { value: 'roundTrip', title: 'برفت و برگشت' },
                { value: 'departing', title: 'رفت' },
                { value: 'returning', title: 'برگشت' }
            ]
        }
    },
    mounted() {
        this.fetchOrderItem()
    },
    methods: {
        async fetchOrderItem() {
            try {
                // query
                const { orderId } = this.$route.params
                const result = await profileApi.getOrder(orderId)
                this.order = result.orderItems[0]
            } catch (e) {

            }
        },
        selectPassenger() {
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    route: this.selectedRoute,
                    step: 2
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .refund {
        &__header {
            /deep/ .badge {
                border-radius: 5px;
            }

            &__curve {
                background-color: map_get($grays, '100');
                border-radius: 100px;
            }
        }

        &__progress {
            height: 5px;
            background-color: map_get($grays, '400');
            width: 100%;

            &__bar {
                background-color: map_get($grays, '700');
                border-radius: 100px 0 0 100px;
            }
        }

        &__select-passenger-btn {
            /deep/ .btn-icon {
                background: $secondary;
                color: $white;
            }
        }
    }
</style>