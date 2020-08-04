<template>
    <div class="profile mt-3">
        <div class="header" />
        <filter-panel :toggle-able="false" title="حساب کاربری" @click.native="accountModal = true" />
        <filter-panel :toggle-able="false" title="خرید ها" />
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
    </div>
</template>

<script>
import FilterPanel from '~/components/flight/available/filter/FilterPanel'
import Account from '~/components/profile/account'

export default {
    components: {Account, FilterPanel},
    data() {
        return {
            accountModal: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        padding: 0 10px;
        .header{
            margin: 0 -10px;
            height: 200px;
            background: linear-gradient(90deg, #49238c 0%, #6d4ea3 100%);
        }
    }
</style>