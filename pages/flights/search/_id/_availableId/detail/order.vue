<template>
    <div class="order">
        <portal to="header">
            <span>مسافرین و خریدار</span>
        </portal>
        <div class="mt-3 px-2">
            <flight-order-card v-if="order" :on-way="!$flight.session.routes[1]" :order="order.orderItems[0]" />
            <ticket-placeholder v-else />

            <template v-if="!$fetchState.pending">
                <p class="my-3 text-center text-gray-700 text-3">
                    وارد کردن اطلاعات مسافرین
                </p>

                <passenger-field
                    v-for="(passenger, i) in passengers"
                    :key="i"
                    v-model="passengers[i]"
                    :index="i + 1"
                    @input="submitPassengers"
                />
            </template>


            <template v-if="user">
                <p class="my-3 text-center text-gray-700 text-3">
                    اطلاعات خریدار
                </p>

                <div class="user p-3 d-flex align-items-center justify-content-between">
                    <span class="text-3 text-gray-900 text-weight-600 pr-1">
                        {{ user.firstName || '' }} {{ user.surname || '' }}
                    </span>
                    <div class="user__contact text-left text-2 text-weight-500 text-gray-700">
                        <p class="mb-1">
                            {{ user.email }}
                        </p>
                        <p class="mb-0">
                            {{ user.phone }}
                        </p>
                    </div>
                </div>
            </template>
            <template v-else>
                <p class="my-3 text-center text-gray-700 text-3">
                    اطلاعات خریدار
                </p>
                <form :class="{ 'buyer-border': buyer.value }" class="buyer p-2 my-3" @submit.prevent>
                    <div class="buyer__main">
                        <div
                            class="checkbox bg-gray-500 d-flex px-1 align-items-center"
                            :class="{ 'bg-light-primary': buyer.value }"
                        >
                            <b-form-checkbox
                                id="checkbox"
                                v-model="buyer.value"
                                name="checkbox"
                            />
                            <label class="mr-2 mb-0 text-2 text-weight-500 text-gray-800" for="checkbox">بلیط به
                                شماره همراه فرد دیگری هم ارسال شود</label>
                        </div>
                        <div v-if="buyer.value" class="form mt-1">
                            <p class="my-3 text-center text-gray-700 text-3">
                                شماره همراه
                            </p>
                            <a-input
                                v-model="buyer.mobile"
                                wrapper-class="px-4 mb-2"
                                type="tel"
                                maxlength="11"
                                title="شماره همراه"
                            />
                        </div>
                    </div>
                </form>
            </template>
            <charity tag="Charity" tag-color="#e3469a" class="my-3" />
            <payment tag="Payment" tag-color="#bee16c" :price="order ? order.orderItems[0].price : 0" />
        </div>

        <flight-details-toast>
            <a-btn class="text-3 py-2 px-4" variant="success" :loading="loading" @click="pay">
                تائید و پرداخت
            </a-btn>
        </flight-details-toast>
    </div>
</template>

<script>

import AInput from '~/components/ui/form/AInput'
import PassengerField from '~/components/passenger/PassengerField'
import Charity from '~/components/flight/order/Charity'
import Payment from '~/components/flight/order/Payment'
import FlightDetailsToast from '~/components/flight/FlightDetailsToast'
import FlightOrderCard from '~/components/flight/FlightOrderCard'
import {flightApi} from '~/api/flightApi'
import {profileApi} from '~/api/profile'
import TicketPlaceholder from '~/components/flight/TicketPlaceholder'


const passengerFactory = (type = 'adult') => ({
    name: null,
    type,
    surname: null,
    gender: null,
    nationalCode: null,
    birthdate: null,
    passportExpiration: null,
    passportNumber: null,
    nationality: 'IRN'
})

export default {
    components: {
        TicketPlaceholder,
        FlightOrderCard,
        FlightDetailsToast,
        PassengerField,
        AInput,
        Charity,
        Payment
    },
    layout: 'page',

    fetchOnServer: false,
    async fetch() {
        this.order = await profileApi.getOrder(this.$route.query.orderId);
        (this.order.orderItems[0].passengers || []).forEach((p, i) => {
            p = {
                ...p,
                type: this.passengers[i].type,
                name: p.name.en,
                surname: p.surname.en
            }
            this.$set(this.passengers, i, p)
        })
    },

    data() {
        const {adult, child, infant} = this.$flight.session
        return {
            nationalPassenger: true,
            passengers: [
                ...new Array(adult || 0).fill(1).map(() => passengerFactory('adult')),
                ...new Array(child || 0).fill(1).map(() => passengerFactory('child')),
                ...new Array(infant || 0).fill(1).map(() => passengerFactory('infant'))
            ],
            order: null,
            buyer: {
                value: false,
                mobile: ''
            },
            loading: false
        }
    },

    computed: {
        user() {
            return this.$auth.user
        },
        isValid() {
            const keys = ['birthdate','gender', 'surname', 'name']
            return this.passengers.every((item, i) => keys.every(key => item[key] != null) && Boolean(item.nationalCode || (item.passportNumber && item.nationality && item.passportExpiration)))
        }
    },

    methods: {
        async pay() {
            this.loading = true
            try {
                if(!this.isValid) {
                    this.$toast.alert(this.$createElement('span', {}, 'مسافرین را وارد کنید'), {
                        solid: false,
                        autoHideDelay: 10000
                    })
                    return
                }
                await this.$auth.authenticate()
                const { orderId } = this.$route.query
                await this.submitPassengers()
                const {paymentUrl} = await flightApi.pay(orderId)
                window.location = paymentUrl
            } catch (e) {
                this.$toast.alert(e.response ? e.response.data.message : e.message)
            } finally {
                this.loading = false
            }
        },

        submitPassengers() {
            return flightApi.setPassengers(this.$flight.session.id, this.passengers.map(p => ({
                type: p.type,
                gender: p.gender,
                name: { en: p.name },
                surname: { en: p.surname },
                nationalCode: p.nationalCode,
                nationality: p.nationality,
                passportExpiration: this.$dayjs(p.passportExpiration).calendar('gregory').format(),
                passportNumber: p.passportNumber,
                birthdate: this.$dayjs(p.birthday).calendar('gregory').format()
            }))).catch(err => {
                throw new Error('از درست بودن اطلاعات مسافران اطمینان حاصل کنید.')
            })
        }
    }
}
</script>

<router>
    {
        "meta": {
            "fullUser": true
        }
    }
</router>

<style lang="scss" scoped>
    .order {
        padding-bottom: 130px;

        .user {
            background: $white;
            border: 1px solid map_get($grays, '600');
            border-radius: 10px;
            position: relative;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

            &:after {
                width: 6px;
                height: 6px;
                background: #bee16c;
                border-radius: 50%;
                position: absolute;
                content: '';
                top: 7px;
                left: 7px;
            }
        }

        .buyer {
            border: 1px solid transparent;

            &__main {
                .checkbox {
                    border-radius: $borderRadius10;
                    height: 50px;
                }

                .bg-light-primary {
                    background-color: $pinkColor;
                }
            }
        }

        .buyer-border {
            border: 1px solid $borderColor;
            border-radius: $borderRadius10;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
        }
    }
</style>
