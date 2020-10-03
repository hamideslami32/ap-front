<template>
    <card class="mb-3">
        <template #header>
            <div class="orders-details__header d-flex align-items-center justify-content-between px-2 mb-3">
                <div>
                    <p class="mb-2l">
                        شماره سفارش
                    </p>
                    <p class="text-2 mb-0">
                        پرواز داخلی
                    </p>
                </div>
                <div class="d-flex align-items-center">
                    <span class="ml-2">{{ order._id }}</span>
                    <span>
                        <svgicon name="airplane-travel" width="30" height="30" />
                    </span>
                </div>
            </div>
            <div class="orders-details__main text-2">
                <div class="d-flex align-items-center justify-content-between px-2">
                    <span>مسیر</span>
                    <span class="text-gray-800">{{ order.orderItems[0].flights[0].departureCity }} به {{ order.orderItems[0].flights[0].arrivalCity }}</span>
                </div>
                <div class="d-flex my-3 align-items-center justify-content-between px-2">
                    <span>تاریخ و ساعت خرید</span>
                    <span class="text-gray-800">{{ $dayjs(order.createdAt).format('DD MMMM YYYY - HH:mm') }}</span>
                </div>
                <div class="d-flex my-3 align-items-center justify-content-between px-2">
                    <span>وضعیت</span>
                    <template>
                        <span :class="`text-${$statusChecker(order.status).color}`">{{ $statusChecker(order.status).fa }}</span>
                    </template>
                </div>
                <div class="d-flex align-items-center justify-content-between px-2">
                    <span>مبلغ</span>
                    <span class="text-gray-800">
                        {{ order.orderItems[0].price | separateNumber }} <small class="text-gray-700">تومان</small>
                    </span>
                </div>
            </div>
        </template>
        <template #footer>
            <button class="btn-raw custom-card__actions__btn" @click="getPDF">
                <svgicon class="text-primary" name="bookmarks-accept" width="26" height="26" />
                <span class="text-1 mt-2 text-gray-900">دریافت بلیط</span>
            </button>
            <button class="btn-raw custom-card__actions__btn">
                <svgicon class="text-secondary" name="bookmarks-denny" width="26" height="26" />
                <span class="text-1 mt-2 text-gray-900">استرداد بلیط</span>
            </button>
        </template>
    </card>
</template>
<script>
import Card from '~/components/ui/Card'

export default {
    name: 'OrderCard',
    components: { Card },
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    methods: {
        getPDF() {
            window.open(this.$axios.defaults.baseURL + '/flight/ticket/' + this.order._id, '_blank')
        }
    }
}
</script>

<style scoped>

</style>
