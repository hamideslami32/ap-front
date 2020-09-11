<template>
    <b-container v-if="!$fetchState.pending" class="text-center">
        <div v-if="order.status === 'paid'">
            <span class="circle-btn mx-auto mt-5 mb-4">
                <svgicon width="32" height="32" name="plane-takeoff" />
            </span>
            <p class="font-weight-medium mb-4">
                بلیط شما با موفقیت صادر شد.
            </p>

            <flight-order-card class="mb-3" :order="flightOrderItem" />

            <full-btn icon="arrow-left" variant="outline-secondary">
                دریافت بلیط
            </full-btn>
        </div>

        <div v-if="order.status === 'failed'">
            <span class="circle-btn mx-auto mt-5 mb-4">
                <svgicon width="32" height="32" name="plane-takeoff" />
            </span>
            <p class="font-weight-medium mb-4">
                صدور بلیط شما با خطا مواجه شد.
            </p>
            <p>
                شماره سفارش:
                <br>
                <strong>{{ order._id }}</strong>
            </p>
        </div>
    </b-container>
</template>

<script>
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import {flightApi} from '~/api/flight'
import FullBtn from '~/components/ui/buttons/FullBtn'

export default {
    components: {FullBtn, FlightOrderCard},

    async fetch() {
        this.order = await flightApi.getOrder(this.$route.query.orderId)
    },

    data() {
        return {
            order: null
        }
    },

    computed: {
        flightOrderItem() {
            return this.order.orderItems.find(item => item.type === 'flight')
        }
    }
}
</script>

<style lang="scss" scoped>
.circle-btn {
    background: linear-gradient(180deg, #6d4da3 0%, #5d3b99 100%);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
    color: $white;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/deep/ .full-btn .full-btn__icon-holder {
    background-color: $secondary;
    color: $white;
}
</style>

<router>
{
"name": "issue"
}
</router>
