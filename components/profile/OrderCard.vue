<template>
    <div>
        <!--        order.status === 'paid'-->
        <card :is-paid="true" class="mb-3">
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
                <button class="btn-raw custom-card__actions__btn" @click="refund = true">
                    <svgicon class="text-secondary" name="bookmarks-denny" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">استرداد بلیط</span>
                </button>
            </template>
        </card>
        <b-modal
            v-model="refund"
            visible
            hide-footer
            hide-header
            centered
            body-class="py-1 px-0 bg-white"
        >
            <div class="refund my-4 px-3">
                <div class="mb-4 text-center">
                    <span class="refund__icon d-inline-block ">
                        <svgicon class="text-white" name="bookmarks-denny" width="32" height="32" />
                    </span>
                </div>
                <p class="mb-3 text-gray-900 text-weight-bold px-4 text-center">
                    به چه دلیلی مایل به استرداد بلیط خود هستید؟
                </p>
            </div>
            <b-form-group>
                <div v-for="(item, i) in options" :key="i" class="d-flex align-items-center item py-3 px-2">
                    <b-form-radio
                        :id="item.value"
                        v-model="problems"
                        :value="item.value"
                        class="ml-2"
                        name="type1"
                    />
                    <label :for="item.value" class="mb-0 text-2 text-weight-500">
                        <span class="text-gray-800 text-weight-500 text-3">{{ item.label }}</span>
                        <span v-if="item.text" class="d-block text-gray-700 text-2 mt-2">{{ item.text }}</span>
                    </label>
                </div>
            </b-form-group>

            <div class="d-flex align-items-center justify-content-center mb-2">
                <a-btn class="action-btn py-2 text-2 text-weight-500 ml-2" variant="primary" @click="refund = false">
                    بازگشت
                </a-btn>
                <a-btn class="action-btn py-2 text-2 text-weight-500 bg-white" variant="outline-secondary">
                    مرحله بعد
                </a-btn>
            </div>
        </b-modal>
    </div>
</template>
<script>
import Card from '~/components/ui/Card'
import {flightApi} from '~/api/flightApi'


export default {
    name: 'OrderCard',
    components: {Card},
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            refund: false,
            problems: '',
            options: [
                {label:'دلایل شخصی', text: '(استرداد بر اساس قوانین شرکتهای هواپیمایی)', value: 'type1'},
                {label:'لغو پرواز توسط ایرلاین', text: '(انصراف مسافر از پرواز به دلیل شرایط بد جوی)', value: 'type2'},
                {label:'تاخیر یا تعجیل پرواز بیش از دو ساعت', text: null, value: 'type3'}
            ]
        }
    },
    computed: {
        isRefundable() {
            return this.returning.length || this.departing.length
        }
    },
    methods: {
        getPDF() {
            window.open(this.$axios.defaults.baseURL + '/flight/ticket/' + this.order._id, '_blank')
        },
        async refundRequest() {
            // TODO: handle response
            try {
                let payload = {
                    departing: null,
                    returning: null
                }
                if (this.departing.length) {
                    payload.departing = this.departing
                }

                if (this.returning.length) {
                    payload.returning = this.returning
                }
                /* eslint-disable */
                const {data} = await flightApi.postRefund(0, this.order._id, payload)

            } catch (err) {
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .btn.disabled {
        opacity: 1;
        background: #6c757d;
    }

    /deep/ .modal-dialog-centered {
        /deep/.modal-content {
            width: 90%;
            margin: 0 auto;
            height: unset;
            border-radius: 5px;
        }

        /deep/.modal-body {
            border-radius: 5px;
        }
    }

    .refund {

        &__icon {
            margin: 0 auto;
            background-color: $secondary;
            padding: 24px;
            border-radius: 50%;
        }
    }

    .item {
        &:not(:last-child) {
            border-bottom: 1px solid map_get($grays, '500');
        }
    }

    .action-btn {
        min-width: 155px;
        border-radius: 5px;
    }

    .custom-radio {
        display: inline-flex;
        width: 20px;
        padding: 0;
        height: unset;
        max-width: unset;
        align-items: flex-start;
        border: none;
        background: transparent;
        box-shadow: none;

        label {
            width: 100%;

            &:before, &:after {
                left: 0;
            }
        }
    }
</style>
