<template>
    <div class="orders-details px-2 mt-3">
        <portal to="right-header">
            <span />
        </portal>
        <portal to="header">
            خرید ها و استرداد ها
        </portal>
        <template v-if="!orders">
            <flight-place-holder v-for="i in 3" :key="i" />
        </template>
        <b-alert v-else-if="!orders.length > 0" class="text-center" show variant="primary">
            نتیجه ای یافت نشد!
        </b-alert>
        <card v-for="(order, i) in orders" v-else :key="i" class="mb-3">
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
                <div class="custom-card__actions__btn">
                    <svgicon class="text-primary" name="bookmarks-denny" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">دریافت بلیط</span>
                </div>
                <div class="custom-card__actions__btn">
                    <svgicon class="text-secondary" name="bookmarks-accept" width="26" height="26" />
                    <span class="text-1 mt-2 text-gray-900">استرداد بلیط</span>
                </div>
            </template>
        </card>

        <!--        <btn-wrapper>
            <a-btn wrapper-class="search-btn" variant="primary" @click="searchModal = true">
                جستجو
            </a-btn>
        </btn-wrapper>
        <b-modal v-model="searchModal" body-class="p-0" hide-footer>
            <template v-slot:modal-title>
                جستجو سفارش
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-left" width="20" height="20" />
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
                    <a-btn shadow variant="primary" class="submit-btn" type="submit">
                        جستجو
                    </a-btn>
                </form>
            </div>
        </b-modal>-->
    </div>
</template>

<script>
// import CustomInput from '~/components/ui/form/CustomInput'
// import BtnWrapper from '~/components/ui/BtnWrapper'
import Card from '~/components/ui/Card'
import {profileApi} from '~/api/profile'
import FlightPlaceHolder from '~/components/flight/available/FlightPlaceholder'

export default {
    name: 'Orders',
    components: {Card, FlightPlaceHolder},
    layout: 'page',
    data() {
        return {
            searchModal: false,
            orders: null
        }
    },
    computed: {
        user() {
            return this.$auth.user
        }
    },
    created() {
        this.$auth.authenticate().then(() => {
            this.$router.push('/profile/orders')
        }).catch(err => {
            this.$router.push('/')
        })
    },
    mounted() {
        this.getOrders()
    },
    methods: {
        async getOrders() {
            try {
                this.orders = await profileApi.getOrders()
            } catch (e) {

            }
        }
    }
}
</script>

<style scoped lang="scss">
    .orders-details {
        &__header {
            p:first-child {
                font-weight: 500;
                color: map_get($grays, '800');
            }

            span {
                font-weight: 500;
                color: map_get($grays, '900');
            }

            svg {
                padding: 10px;
                background: $info;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
                border-radius: 5px;
                box-sizing: content-box;
                color: $white;
            }

        }


        &__main {
            border-top: 1px solid map_get($grays, '500');
            padding-top: 20px;
        }

        /deep/ .search-btn {
            .btn {
                width: 140px;
                height: 40px;
                position: relative;
            }
        }
    }

    .search-orders {
        padding: 0 40px;

        .date-input-pair {
            position: relative;
            display: flex;
            flex-direction: column;

            .custom-input {
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
                background: #f9f9f9;
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
