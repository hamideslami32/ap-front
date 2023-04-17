<template>
    <card-with-tag :tag="tag" :color="tagColor">
        <div class="payment-card__header pt-3 px-3 ml-5">
            <div class="d-flex align-items-center">
                <div class="icon d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="~/assets/images/payment.svg" alt="apro" width="40px" height="40px">
                    </div>
                </div>
                <span class="text-3 text-weight-600 mr-3 text-gray-900">روش های پرداخت</span>
            </div>
        </div>
        <b-form-group class="payment-card__options text-2 mt-4">
            <div class="item mb-2 px-2">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <b-form-radio
                            :id="`radio-1`"
                            v-model="selectPayment"
                            value="cash"
                            :name="`radio-1`"
                            class="ml-2"
                        />
                        <label class="mb-0 text-2 text-weight-500">
                            مبلغ کامل را پرداخت نمایید
                        </label>
                    </div>
                    <span class="text-3 text-gray-900">{{ price | separateNumber }}<span class="text-1 text-gray-800 mr-1">تومان</span></span>
                </div>
            </div>

            <div class="item mb-2 px-2 disabled__item">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <b-form-radio
                            :id="`radio-2`"
                            v-model="selectPayment"
                            value="partial"
                            :name="`radio-2`"
                            class="ml-2"
                            :disabled="true"
                        />
                        <label class="mb-0 text-2 text-weight-500">
                            اقساطی پرداخت کنید (به زودی)
                        </label>
                    </div>
                    <span class="text-3 text-gray-900">{{ Math.floor(price * 0.2) | separateNumber }}<span class="text-1 text-gray-800 mr-1">تومان</span></span>
                </div>
                <div class="text-2 text-gray-800 text-center mt-3">
                    شما می توانید 20 درصد مبلغ را پرداخت و مابقی را یک روز قبل از پرواز پرداخت نمایید
                </div>
            </div>
        </b-form-group>
    </card-with-tag>
</template>

<script>
import CardWithTag from '~/components/ui/CardWithTag'

export default {
    name: 'Payment',
    components: {
        CardWithTag
    },
    props: {
        tag: {
            type: String,
            required: true
        },
        tagColor : {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            selectPayment: 'cash'
        }
    }
}
</script>

<style lang="scss" scoped>
    .payment-card__header {
        .icon {
            height: 60px;
            width: 60px;
            background: linear-gradient(180deg, #bee16c 0%, map-get($grays, '250') 55.21%);
            box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
            border-radius: $borderRadius10;
            & > div {
                background: linear-gradient(180deg, #f0f8de 0%, map-get($grays, '250') 55.21%);
                border-radius: $borderRadius10;
                width: 58px;
                height: 58px;
                color: #bee16c;
            }
        }

    }
    .payment-card__info {
        border: 1px solid #e5e5e5;
        height: 70px;
        line-height: 2;
        border-radius: $borderRadius10;
    }
    .payment-card__options {
        .disabled__item {
            opacity: 0.4;
        }


        .item {
            height: 50px;
        }
        & > div:first-of-type {
            & > div:first-of-type {
                border-bottom: 1px solid #ddd;
            }
        }
    }

    /deep/ .custom-control-input:checked ~ .custom-control-label::before {
        border-color: #bee16c!important;
        background-color: #bee16c!important;
    }
    /deep/ .custom-control-label::before {
        box-shadow: none !important;
    }
    /deep/ .custom-control-input ~ .custom-control-label::before {
        background-color: #fff !important;
        border-color: #bee16c!important;
    }

    .custom-radio {
        display: inline-flex;
        width: 20px;
        padding: 0;
        height: unset;
        max-width: unset;
        align-items: flex-start;
        border: none;
        background-color: transparent;

        label {
            width: 100%;

            &:before, &:after {
                left: 0;
            }
        }
    }
</style>
