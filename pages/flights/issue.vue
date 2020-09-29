<template>
    <b-container v-if="!$fetchState.pending && order" class="text-center">
        <div v-if="order.status === 'paid'">
            <span class="circle-btn mx-auto mt-5 mb-4">
                <svgicon width="32" height="32" name="plane-takeoff" />
            </span>
            <p class="text-weight-600 mb-4 text-gray-50">
                بلیط شما با موفقیت صادر شد.
            </p>

            <flight-order-card class="mb-4" :order="flightOrderItem" />

            <a-btn
                wrapper-class="action-btn"
                class="text-weight-600"
                icon="arrow-left"
                variant="outline-secondary"
                block
                :href="downloadUrl"
                target="_blank"
            >
                دریافت بلیط
            </a-btn>
        </div>

        <div v-if="order.status === 'failed'">
            <span class="circle-btn mx-auto mt-5 mb-4 circle-btn--failed">
                <svgicon width="32" height="32" name="plane-delete" />
            </span>
            <p class="text-weight-600 mb-4 text-gray-50">
                صدور بلیط شما با خطا مواجه شد.
            </p>
            <div class="failed-code py-3">
                <p class="mb-2 text-3 text-gray-700 text-weight-500">
                    کد پیگیری:
                </p>
                <p class="mb-0 text-gray-50 text-weight-600 en text-5">
                    {{ order._id }}
                </p>
            </div>
            <p class="my-4 text-center text-3 text-gray-700">
                لطفا با بخش پشتیبانی تماس بگیرید
            </p>

            <a-btn
                shadow
                wrapper-class="action-btn"
                class="text-weight-600"
                icon="phone"
                block
            >
                تماس با پشتیبانی
            </a-btn>
        </div>
    </b-container>
</template>

<script>
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import {profileApi} from '~/api/profile'

export default {
    components: {
        FlightOrderCard
    },

    async fetch() {
        this.order = await profileApi.getOrder(this.$route.query.orderId)
    },

    data() {
        return {
            order: null
        }
    },

    computed: {
        flightOrderItem() {
            return this.order.orderItems.find(item => item.type === 'flight')
        },
        downloadUrl() {
            return process.env.API_URL + '/flight/ticket/' + this.order._id
        }
    }
}
</script>

<style lang="scss" scoped>
    .circle-btn {
        background: linear-gradient(180deg, #6d4da3 0%, #5d3b99 100%);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        color: $white;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.circle-btn--failed {
            background: $secondary;
        }
    }


    .failed-code {
        border: 1px solid $borderColor;
        box-sizing: border-box;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        background: map_get($grays, '200');

    }

    /deep/ .action-btn {
        /deep/ .btn-icon {
            background: $secondary;
            svg {
                color: $white;
            }
        }

    }
</style>

<router>
    {
    "name": "issue"
    }
</router>
