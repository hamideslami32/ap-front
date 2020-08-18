<template>
    <div class="flight-detail mt-3 mx-2">
        <portal to="header">
            <span>جزئیات پرواز</span>
        </portal>
        <div class="d-flex align-items-center justify-content-center">
            <span class="text-gray-900 text-weight-500">تهران</span>
            <span class="mx-3">vector</span>
            <span class="text-gray-900 text-weight-500">پاریس</span>
        </div>
        <div class="mt-2 d-flex align-items-center justify-content-center text-2 text-gray-800">
            <span>دوشنبه ۲۰ مرداد ۹۹</span>
            <span class="px-1">-</span>
            <span>توقف لندن</span>
            <span class="px-1">-</span>
            <span class="font-en text-weight-500">Economy(H)</span>
        </div>
        <div class="flight-detail__card-holder mt-3">
            <detail-card />
        </div>
    </div>
</template>

<script>
import DetailCard from '~/components/flight/available/detail/DetailCard'

export default {
    components: {DetailCard},
    layout: 'page'
}
</script>

<style lang="scss" scoped>
    .flight-detail {
    }
</style>