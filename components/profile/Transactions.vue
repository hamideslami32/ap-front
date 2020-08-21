<template>
    <div class="transactions">
        <card v-for="i in 4" :key="i" class="mb-3">
            <template #header>
                <div class="transactions__main text-2">
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>تاریخ و ساعت خرید</span>
                        <span class="text-gray-800">۲۰ شهریور ۱۳۹۹ - ۲۲:۱۰</span>
                    </div>
                    <div class="d-flex my-2 align-items-center justify-content-between px-2">
                        <span>نوع تراکنش</span>
                        <span>افزایش شارژ</span>
                    </div>
                    <div class="d-flex mb-2 align-items-center justify-content-between px-2">
                        <span>مبلغ</span>
                        <span class="text-gray-800">15,000,000
                            <small class="text-gray-700">تومان</small>
                        </span>
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-2">
                        <span>مبلغ</span>
                        <span class="text-gray-800">15,000,000
                            <small class="text-gray-700">تومان</small>
                        </span>
                    </div>
                </div>
            </template>
            <template #footer>
                <p class="text-gray-900 text-900 transactions__code">
                    GmshtyjwKSuDTd2E4Zdj50MUulXKi04tGR
                </p>
            </template>
        </card>

        <a-btn wrapper-class="search-btn" variant="primary" @click="searchModal = true">
            جستجو
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
                <form action="">
                    <custom-input title="شماره سفارش" />
                    <custom-input title="نوع سفارش" />
                    <span class="date-input-pair">
                        <custom-input title="از تاریخ" />
                        <svgicon
                            class="pair-icon text-primary"
                            name="arrows-round"
                            width="30"
                            height="30"
                        />
                        <custom-input title="تا تاریخ" />
                    </span>
                    <a-btn variant="primary" class="submit-btn" type="submit">
                        جستجو
                    </a-btn>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Card from '~/components/ui/Card'

export default {
    components: {Card}
}
</script>

<style lang="scss" scoped>
    .transactions {
        /deep/ .custom-card {
            border-color: $borderColor;
        }

        &__code {
            font-family: 'Baloo Thambi 2', Dana, Tahoma, serif;
            color: map_get($grays, '900');
            font-size: 0.75rem;
            font-weight: 500;
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
            }
        }
    }
</style>
