<template>
    <div class="orders-details px-2 mt-3">
        <portal to="right-header">
            <span />
        </portal>
        <portal to="title">
            خرید ها و استرداد ها
        </portal>
        <template v-if="!orders">
            <flight-place-holder v-for="i in 3" :key="i" />
        </template>
        <b-alert v-else-if="!orders.length > 0" class="text-center" show variant="primary">
            نتیجه ای یافت نشد!
        </b-alert>
        <template v-else>
            <order-card v-for="order in orders" :key="order._id" :order="order" />
        </template>

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
                    <a-input wrapper-class="mb-1 mt-3" placeholder="شماره سفارش" />
                    <a-input wrapper-class="mb-1 mt-3" placeholder="نوع سفارش" />
                    <span class="date-input-pair">
                        <a-input wrapper-class="mb-1 mt-3" placeholder="از تاریخ" />
                        <svgicon
                            class="pair-icon text-primary"
                            name="arrows-round"
                            width="30"
                            height="30"
                        />
                        <a-input wrapper-class="mb-1 mt-3" placeholder="تا تاریخ" />
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
import {profileApi} from '~/api/profile'
import FlightPlaceHolder from '~/components/flight/available/FlightPlaceholder'
import OrderCard from '@/components/profile/OrderCard'

export default {
    name: 'Orders',
    components: {OrderCard, FlightPlaceHolder},
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
