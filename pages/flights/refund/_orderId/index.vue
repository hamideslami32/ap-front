<template>
    <div class="refund">
        <portal to="right-header">
            <span />
        </portal>
        <portal to="title">
            استرداد بلیط
        </portal>
        <div class="refund__header d-flex align-items-center justify-content-between text-gray-700 mb-2 px-2 mt-3">
            <div>
                <badge class="px-2">
                    {{ step }}
                </badge>
                <span class="text-weight-500 mr-2">{{ step === 2 ? 'انتخاب مسافر' : 'انتخاب مسیر' }}</span>
            </div>
            <div>
                <span class="text-2">مرحله بعد</span>
                <span class="refund__header__curve text-2 text-gray-800 text-weight-500 px-2 py-1">{{ step === 2 ? 'تایید استرداد' : 'انتخاب مسافر' }}</span>
            </div>
        </div>
        <div class="refund__progress mb-3">
            <div class="refund__progress__bar h-100 w-50" :class="{ 'w-75' : step === 2 }" />
        </div>
        <div class="px-2 mb-3">
            <flight-order-card v-if="order" :on-way="!order.session.routes[1]" :order="order" />
            <ticket-placeholder v-else />
        </div>
        <div v-if="step === 1">
            <b-form-group class="en font-weight-medium mb-5">
                <b-form-radio
                    v-for="x in refundItems"
                    :key="x.value"
                    v-model="selectedRoute"
                    class="mb-2 mx-1 w-50"
                    :class="{ active: selectedRoute === x.value }"
                    checked="flightClass"
                    name="flight_class"
                    :value="x.value"
                    inline
                >
                    {{ x.title }}
                </b-form-radio>
            </b-form-group>
            
            <a-btn
                :disabled="!selectedRoute.length"
                class="refund__select-passenger-btn text-right text-weight-500 text-2"
                wrapper-class="w-50 mx-auto"
                block
                icon="arrow-left"
                variant="outline-secondary"
                @click="selectRefundType"
            >
                مرحله بعد(انتخاب مسافر)
            </a-btn>
        </div>
        <div v-else class="mx-2 mb-3">
            <div
                class="refund__select-all checkbox bg-gray-250 d-flex align-items-center"
                :class="{ 'bg-light-primary': allPassenger }"
            >
                <b-form-checkbox
                    id="checkbox"
                    v-model="selectAllPassenger"
                    name="checkbox"
                />
                <label class="mr-2 mb-0 p-2 d-flex flex-grow-1 text-3 text-gray-800" for="checkbox">
                    همه مسافرین
                </label>
            </div>

            <div
                v-for="(passenger, i) in passengers"
                :key="i"
                class="refund__passenger bg-white mt-3 pb-2 pt-1"
                :class="{ 'bg-light-primary': selectedPassengers.includes(i) }"
            >
                <div class="d-flex align-items-center mb-3">
                    <b-form-checkbox
                        :id="`checkbox${i}`"
                        name="checkbox"
                        :checked="selectedPassengers.includes(i)"
                        @change="selectPassenger($event,i)"
                    />
                    <label class="mr-2 mb-0 p-2 d-flex flex-grow-1 text-3 text-gray-800" :for="`checkbox${i}`">
                        {{ passenger.surName + ' ' + passenger.lastName }}
                    </label>
                </div>
                <div class="px-2">
                    <p class="text-2 text-gray-700 d-flex align-items-center justify-content-between">
                        <span>مبلغ خرید</span>
                        <span class="text-3 text-gray-800">{{ passenger.price | separateNumber }} <span class="text-2 text-gray-700">تومان</span></span>
                    </p>
                    <p class="text-2 text-gray-700 d-flex align-items-center justify-content-between">
                        <span>مبلغ قابل استرداد</span>
                        <span class="text-3 text-gray-800">{{ passenger.refundPrice | separateNumber }} <span class="text-2 text-gray-700">تومان</span></span>
                    </p>
                    <p class="text-2 text-gray-700 d-flex align-items-center justify-content-between">
                        <span>مبلغ جریمه</span>
                        <span class="text-3 text-gray-800">{{ passenger.penaltyPrice | separateNumber }} <span class="text-2 text-gray-700">تومان</span></span>
                    </p>
                </div>
            </div>
        </div>
        <div v-if="step === 2">
            <toast-card variant="light">
                <div
                    class="d-flex align-items-center"
                >
                    <b-form-checkbox
                        id="rules-checkbox"
                        v-model="acceptRules"
                        name="rules-checkbox"
                    />
                    <label class="mr-2 mb-0 p-2 d-flex flex-grow-1 text-1 text-white" for="rules-checkbox">
                        قوانین کنسلی را مطالعه کردم و آن را تایید می کنم
                    </label>
                </div>
            </toast-card>
            <toast-card>
                <div class="d-flex align-items-center justify-content-between p-1">
                    <div>
                        <p class="mb-2 text-3">
                            مجموع مبلغ قابل استرداد (تومان)
                        </p>
                        <p class="mb-0 text-4">
                            {{ totalRefund | separateNumber }}
                        </p>
                    </div>
                    <a-btn
                        class="text-3 py-2 px-4"
                        :disabled="!acceptRules"
                        variant="secondary"
                        :loading="loading"
                        @click="refund"
                    >
                        تایید استرداد
                    </a-btn>
                </div>
            </toast-card>
        </div>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'
import {profileApi} from '~/api/profile'
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import TicketPlaceholder from '~/components/flight/TicketPlaceholder'
import ToastCard from '~/components/ui/ToastCard'
export default {
    components: {ToastCard, TicketPlaceholder, FlightOrderCard, Badge},
    data() {
        return {
            step: 1,
            order: null,
            routes: [
                { value: 'departing', title: 'رفت' }
            ],
            selectedRoute: '',
            allPassenger: false,
            acceptRules: false,
            loading: false,
            // mockData for Passenger TODO: must use api to show passengers
            passengers: [
                {
                    surName: 'حسین',
                    lastName: 'شریفی نیا',
                    price: 459000,
                    refundPrice: 246300,
                    penaltyPrice: 212700
                },
                {
                    surName: 'حنیف',
                    lastName: 'عمران زاده',
                    price: 4000000,
                    refundPrice: 246300,
                    penaltyPrice: 212700
                }
            ],
            selectedPassengers: []
        }
    },
    computed: {
        refundItems() {
            if (!this.order) return []
            return [
                { value: 'roundTrip', title: 'برفت و برگشت' },
                { value: 'departing', title: 'رفت' },
                { value: 'returning', title: 'برگشت' }
            ]
        },
        selectAllPassenger: {
            get() {
                return this.allPassenger

                // if (this.selectedPassengers.length) {
                //     return this.allPassengers
                // } else {
                //     return
                // }
                // return this.selectedPassengers.length === this.passengers.length
            },
            set(value) {
                this.allPassenger = value
                if(value) {
                    this.selectedPassengers = this.passengers.map((item , i) => i)
                } else {
                    this.selectedPassengers = []
                }

            }
        },
        totalRefund() {
            let totalPrice = 0

            this.selectedPassengers.forEach(item => {
                totalPrice += this.passengers[item].refundPrice
            })
            return totalPrice
        }
    },
    watch: {
        '$route'() {
            const { step } = this.$route.query
            if(step) {
                this.step = Number(step)
                return
            }
            this.step = 1
        }
    },
    mounted() {
        const { step } = this.$route.query
        if(step) {
            this.step = Number(step)
        }else {
            this.step = 1
        }

        this.fetchOrderItem()
    },
    methods: {
        async fetchOrderItem() {
            try {
                // query
                const { orderId } = this.$route.params
                const result = await profileApi.getOrder(orderId)
                this.order = result.orderItems[0]
            } catch (e) {

            }
        },
        selectRefundType() {
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    route: this.selectedRoute,
                    step: 2
                }
            })
        },
        selectPassenger(event, index) {
            if(event) {
                this.selectedPassengers.push(index)
                if(this.selectedPassengers.length === this.passengers.length) {
                    this.allPassenger = true
                }
            } else {
                const itemIndex = this.selectedPassengers.indexOf(index)
                this.selectedPassengers.splice(itemIndex, 1)
                if (this.selectedPassengers.length === 0) {
                    this.allPassenger = false
                }

                //     if(this.selectedPassengers.length === this.passengers.length) {
                // }
                // this.allPassenger = false
            }
        },
        refund() {
            if(!this.selectedPassengers.length > 0) {
                this.$toast.alert('مسافری انتخاب نشده است.')
                return
            }
            // Todo: call refund api for send passenger index
            alert('send Passenger')

        }
    }
}
</script>

<style lang="scss" scoped>
    .refund {
        &__header {
            /deep/ .badge {
                border-radius: 5px;
            }

            &__curve {
                background-color: map_get($grays, '100');
                border-radius: 100px;
            }
        }

        &__progress {
            height: 5px;
            background-color: map_get($grays, '400');
            width: 100%;

            &__bar {
                transition: width ease 300ms;
                background-color: map_get($grays, '700');
                border-radius: 100px 0 0 100px;
            }
        }

        &__select-passenger-btn {
            /deep/ .btn-icon {
                background: $secondary;
                color: $white;
            }
        }

        &__select-all , &__passenger {
            border-radius: 5px;
        }
    }

    .bg-light-primary {
        background-color: $pinkColor !important;
    }
</style>