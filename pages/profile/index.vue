<template>
    <div class="profile mt-3">
        <div class="header py-3">
            <div class="header__icon-wrapper">
                <span class="header__icon-holder">
                    <svgicon width="40" height="40" name="user" />
                </span>
            </div>
            <p class="my-4">
                سید حسین حسینی
            </p>
            <field class="header__info" title="میزان اعتبار" value="1500">
                <span class="text-2">تومان</span>
            </field>
        </div>
        <filter-panel :toggle-able="false" title="حساب کاربری" @click.native="accountModal = true" />
        <filter-panel :toggle-able="false" title="خرید ها" @click.native="ticketModal = true" />
        <filter-panel :toggle-able="false" title="مسافران" />
        <filter-panel :toggle-able="false" title="صورتحساب ها" />
        <b-modal v-model="accountModal" hide-footer>
            <template v-slot:modal-title>
                حساب کاربری
            </template>
            <template v-slot:modal-header-close>
                <svgicon name="arrow-long-right" width="20" height="20" />
            </template>
            <account />
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
import FilterPanel from '~/components/flight/available/filter/FilterPanel'
import Account from '~/components/profile/account'
import Field from '~/components/ui/Field'

export default {
    components: {Field, Account, FilterPanel},
    data() {
        return {
            accountModal: false,
            ticketModal:false
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        padding: 0 10px;
        .header{
            margin: 0 -10px;
            background: linear-gradient(90deg, #49238c 0%, #6d4ea3 100%);
            text-align: center;
            color: $white;
            &__icon-wrapper{
                width: 71px;
                height: 71px;
                background: linear-gradient(180deg,#e3469a 35.42%, #cccccc 100%);
                margin: 0 auto;
                border-radius: 50%;
            }
            &__icon-holder{
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
                svg{
                    color: $white;
                }
            }

            /deep/ .header__info{
                height: 40px;
                margin: 0 auto;
                background: #6d4ea3;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
                max-width: 240px;
                span{
                    color: $white;
                }
            }
        }
    }
</style>