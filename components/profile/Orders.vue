<template>
    <div class="orders-details">
        <card v-for="i in 4" :key="i" class="mb-3">
            <template #header>
                <div class="orders-details__header px-2">
                    <div>
                        <p>
                            شماره پرواز
                        </p>
                        <p class="text-2">
                            پرواز داخلی
                        </p>
                    </div>
                    <span>12423</span>
                </div>
                <div class="orders-details__main text-2">
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>تاریخ و ساعت خرید</span>
                        <span class="text-gray-800">۲۰ شهریور ۱۳۹۹ - ۲۲:۱۰</span>
                    </div>
                    <div class="d-flex my-2 align-items-center justify-content-between px-2">
                        <span>وضعیت</span>
                        <span>صادر شده</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>مبلغ</span>
                        <span class="tex-gray-800">15,000,000
                            <small class="text-gray-700">تومان</small>
                        </span>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="custom-card__actions__btn">
                    <svgicon class="text-primary" name="bookmarks-denny" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">استرداد بلیط</span>
                </div>
                <div class="custom-card__actions__btn">
                    <svgicon class="text-info" name="bookmarks-accept" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">دریافت بلیط</span>
                </div>
            </template>
        </card>

        <a-btn wrapper-class="search-btn" variant="primary" @click="searchModal = true">
            فیلتر و مرتب سازی
        </a-btn>
        <b-modal v-model="searchModal" body-class="p-0" hide-footer>
            <template v-slot:modal-title>
                جستجو سفارش
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <div class="search-orders">
                <p class="text-3 text-gray-700 text-center mt-4">
                    پر کردن حداقل یک فیلد کافیست
                </p>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Card from '~/components/ui/Card'

export default {
    name: 'Orders',
    components: {Card},
    data() {
        return {
            searchModal: true
        }
    }
}
</script>

<style scoped lang="scss">
    .orders-details {
        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            p:first-child {
                font-weight: 500;
                color: map_get($gray-colors, 'gray-800');
            }

            span {
                font-weight: 500;
                color: map_get($gray-colors, 'gray-900');
            }

        }


        &__main {
            border-top: 1px solid map_get($gray-colors, 'gray-500');
            padding-top: 20px;
        }

        /deep/ .search-btn {
            font-size: 0.8em;
            position: fixed;
            bottom: 20px;
            margin: auto;
            left: 50%;
            transform: translateX(-50%);

            .btn {
                width: 140px;
                height: 40px;
                position: relative;

                &::after {
                    content: '';
                    width: 6px;
                    height: 6px;
                    display: inline-block;
                    background: #e3469a;
                    margin-right: 5px;
                    border-radius: 50%;
                }
            }
        }
    }
</style>