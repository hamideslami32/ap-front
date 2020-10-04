<template>
    <div>
        <portal to="header-right">
            <nuxt-link class="text-white" to="/profile/account">
                <svgicon width="30" height="30" name="userProfile-Hexagon" />
            </nuxt-link>
        </portal>
        <portal to="header">
            پروفایل
        </portal>
        <div class="profile-header pb-3 pt-5">
            <div class="profile-header__icon-wrapper">
                <span class="profile-header__icon-holder">
                    <svgicon width="40" height="40" name="wallet" />
                </span>
            </div>
            <p class="mb-4 mt-1">
                {{ userFullName }}
            </p>
            <field class="profile-header__info" title="میزان اعتبار">
                {{ user.credit }} <span class="text-2">تومان</span>
            </field>
        </div>
        <panel icon="shoppingbag-Pack" title="خرید ها" disabled @click.native="$router.push('/profile/orders')" />
        <panel icon="atm" title="تراکنش ها" disabled @click.native="$router.push('/profile/transactions')" />
        <panel icon="userProfile-Group" title="مسافران" disabled @click.native="$router.push('/profile/passengers')" />
        <panel icon="exit" disabled @click.native="$auth.logout()">
            <template #title>
                <span class="text-danger">خروج</span>
            </template>
        </panel>
    </div>
</template>

<script>
import Panel from '~/components/ui/Panel'
import Field from '~/components/ui/Field'

export default {
    components: {Field, Panel },
    auth: true,
    data() {
        return {
            passengerModal: false
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

<router>
    {
      "meta": {
        "fullUser": true,
    "showBottomNav": true
      }
    }
</router>

<style lang="scss" scoped>
    .profile-header {
        background: linear-gradient(90deg, #49238c 0%, $lightPrimary 100%);
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
            background: $lightPrimary;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
            max-width: 240px;
            span {
                color: $white;
            }
        }
    }
</style>
