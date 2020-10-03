<template>
    <div class="transactions px-2 mt-3">
        <portal to="header">
            تراکنش ها
        </portal>
        <card v-for="payment in payments" :key="payment._id" class="mb-3">
            <template #header>
                <div class="transactions__main text-2">
                    <div v-if="payment.paidAt" class="d-flex align-items-center justify-content-between px-2">
                        <span>تاریخ و ساعت خرید</span>
                        <span class="text-gray-800"> ۲۰ شهریور ۱۳۹۹ - ۲۲:۱۰</span>
                        <span class="text-gray-800">{{ $dayjs(payment.paidAt).format('DD MMMM YYYY - HH:mm') }}</span>
                    </div>
                    <div class="d-flex my-2 align-items-center justify-content-between px-2">
                        <span>نوع تراکنش</span>
                        <span>خرید</span>
                    </div>
                    <div class="d-flex my-2 align-items-center justify-content-between px-2">
                        <span>وضعیت</span>
                        <span class="text-weight-600">{{ statusText(payment.status) }}</span>
                    </div>
                    <div class="d-flex my-2 align-items-center justify-content-between px-2">
                        <span>مبلغ</span>
                        <span class="text-gray-800">{{ payment.amount | separateNumber | localizeNumber }}
                            <small class="text-gray-700">تومان</small>
                        </span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>شماره تراکنش</span>
                        <span class="text-weight-500 text-gray-700">{{ payment._id }}</span>
                    </div>
                    <!--<div class="d-flex align-items-center justify-content-between px-2">
                        <span>باقی مانده اعتبار</span>
                        <span class="text-gray-800">15,000,000
                            <small class="text-gray-700">تومان</small>
                        </span>
                    </div>-->
                </div>
            </template>
        </card>

        <!--        <btn-wrapper class="d-flex align-items-center justify-content-center">
            <a-btn wrapper-class="search-btn" shadow variant="primary" @click="searchModal = true">
                جستجو
            </a-btn>
        </btn-wrapper>-->
        <b-modal v-model="searchModal" body-class="p-0" hide-footer>
            <template v-slot:modal-title>
                جستجو تراکنش
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-left" width="20" height="20" />
            </template>
            <div class="search-transaction">
                <p class="text-3 text-gray-700 text-center mt-4">
                    پر کردن حداقل یک فیلد کافیست
                </p>
                <form action="">
                    <a-input wrapper-class="mb-1 mt-3" placeholder="شماره سفارش" />
                    <a-input wrapper-class="mb-1 mt-3" placeholder="نوع سفارش" />
                    <span class="date-input-pair mb-1 mt-3">
                        <a-input placeholder="از تاریخ" />
                        <svgicon
                            class="pair-icon text-primary"
                            name="arrows-round"
                            width="30"
                            height="30"
                        />
                        <a-input placeholder="تا تاریخ" />
                    </span>
                    <a-btn
                        variant="primary"
                        shadow
                        block
                        class="submit-btn"
                        type="submit"
                    >
                        جستجو
                    </a-btn>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Card from '~/components/ui/Card'
import AInput from '~/components/ui/form/AInput'
import {profileApi} from '~/api/profile'


export default {
    components: {AInput, Card},
    async fetch() {
        this.payments = await profileApi.getPayments()
    },
    data() {
        return {
            searchModal: false,
            payments: null
        }
    },
    methods: {
        statusText(payment) {
            return {
                success: 'موفق',
                failed: 'نا موفق'
            }[payment.status] || 'نامشخص'
        }
    }
}
</script>

<style lang="scss" scoped>
    .transactions {
        /deep/ .custom-card {
            border-color: $borderColor;


            &__info {
                // without barcode
                // border-bottom-left-radius: 0;
                // border-bottom-right-radius: 0;
            }

            &__actions {
                display: none; // without barcode
                border-top: 1px solid $modalBorder;
                background: $white;
                border-radius: 0 0 10px 10px ;
            }
        }

        &__code {
            font-family: 'Baloo Thambi 2', Dana, Tahoma, serif;
            color: map_get($grays, '900');
            font-size: 0.75rem;
            font-weight: 500;
        }

        /deep/ .search-btn {
            .btn {
                width: 140px;
                height: 40px;
            }
        }
    }

    .search-transaction {
        padding: 0 40px;

        .date-input-pair {
            position: relative;
            display: flex;
            flex-direction: column;
            .form-control-wrapper {
                margin-bottom: 0;
                &:first-child {
                    /deep/ input {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                }
                &:last-child {
                    /deep/ input {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                    }
                }
            }

            .form-input {
                background: map-get($grays, '250');
            }

            .pair-icon {
                transform: rotate(90deg);
                position: absolute;
                left: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: 1;
                box-sizing: content-box;
                background: $white;
                border: 1px solid map_get($grays, '500');
                border-radius: 50px;
            }

        }


        .btn-wrapper {
            width: 100%;
            display: block;
            margin-top: 20px;
            &:after {
                z-index: 0;
            }

            button {
                width: 100%;
                height: 50px;
                font-weight: 600;
                position: relative;
                z-index: 1;
            }
        }
    }
</style>
