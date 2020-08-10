<template>
    <div>
        <portal to="header">
            پروفایل
        </portal>
        <div class="profile-header pb-3 pt-5">
            <div class="profile-header__icon-wrapper">
                <span class="profile-header__icon-holder">
                    <svgicon width="40" height="40" name="user" />
                </span>
            </div>
            <p class="mb-4 mt-1">
                {{ userFullName }}
            </p>
            <field class="profile-header__info" title="میزان اعتبار">
                {{ user.credit }} <span class="text-2">تومان</span>
            </field>
        </div>
        <panel title="حساب کاربری" disabled @click.native="accountModal = true" />
        <panel title="خرید ها" disabled @click.native="orderModal = true" />
        <panel title="تراکنش ها" disabled @click.native="transactionsModal = true" />
        <panel title="مسافران" disabled @click.native="passengerModal = true" />
        <panel title="صورتحساب ها" disabled />
        <panel disabled @click.native="$auth.logout()">
            <template #title>
                <span class="text-danger">خروج</span>
            </template>
        </panel>
        <b-modal v-model="accountModal" body-class="p-0" hide-footer>
            <template v-slot:modal-title>
                حساب کاربری
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <account @close="accountModal = false" />
        </b-modal>
        <b-modal v-model="orderModal" hide-footer>
            <template v-slot:modal-title>
                خریدها
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <orders />
        </b-modal>
        <b-modal v-model="transactionsModal" hide-footer>
            <template v-slot:modal-title>
                تراکنش ها
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <trans-actions />
        </b-modal>
        <b-modal v-model="passengerModal" hide-footer>
            <template v-slot:modal-title>
                مسافران
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <passengers />
        </b-modal>
    </div>
</template>

<script>
import Panel from '~/components/ui/Panel'
import Account from '~/components/profile/Account'
import Field from '~/components/ui/Field'
import Orders from '~/components/profile/Orders'
import Passengers from '~/components/profile/Passengers'
import TransActions from '~/components/profile/TransActions'

export default {
    components: {TransActions, Passengers, Orders, Field, Account, Panel },
    auth: true,
    data() {
        return {
            accountModal: false,
            orderModal:false,
            passengerModal: false,
            transactionsModal: false
        }
    },
    computed: {
        user() {
            return this.$auth.user
        },
        userFullName() {
            const { firstName = '', lastName = '' } = this.user
            return firstName + ' ' + lastName
        }
    },
    mounted() {
        if (!('isConfirmed' in this.user)) {
            this.$auth.fetchUser(true)
        }
    },
    head: {
        bodyAttrs: {
            class: 'transparent-header'
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile-header {
        background: linear-gradient(90deg, #49238c 0%, #6d4ea3 100%);
        text-align: center;
        color: $white;
        &__icon-wrapper {
            display: inline-block;
            padding: 1px;
            background: linear-gradient(180deg, #e3469a -10%, #5d3b99 100%);
            margin: 20px auto;
            border-radius: 50%;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        }
        &__icon-holder {
            display: flex;
            align-items: center;
            position: relative;
            justify-content: center;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: red;
            background: linear-gradient(180deg, #6d4da3 0%, #5d3b99 100%);
            svg {
                color: $white;
            }
        }

        /deep/ .profile-header__info {
            height: 40px;
            margin: 0 auto;
            background: #6d4ea3;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
            max-width: 240px;
            span {
                color: $white;
            }
        }
    }
</style>
