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
            <p class="my-4">
                {{ userFullName }}
            </p>
            <field class="profile-header__info" title="میزان اعتبار">
                {{ user.credit }} <span class="text-2">تومان</span>
            </field>
        </div>
        <panel title="حساب کاربری" disabled @click.native="accountModal = true" />
        <panel title="خرید ها" disabled @click.native="ticketModal = true" />
        <panel title="مسافران" disabled />
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
        <b-modal v-model="ticketModal" hide-footer>
            <template v-slot:modal-title>
                خریدها
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <!--            <account />-->
        </b-modal>
    </div>
</template>

<script>
import Panel from '~/components/ui/Panel'
import Account from '~/components/profile/account'
import Field from '~/components/ui/Field'

export default {
    components: { Field, Account, Panel },
    auth: true,
    data() {
        return {
            accountModal: false,
            ticketModal:false
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
            width: 71px;
            height: 71px;
            background: linear-gradient(180deg,#e3469a 35.42%, #cccccc 100%);
            margin: 0 auto;
            border-radius: 50%;
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
            margin: 20px auto;
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
