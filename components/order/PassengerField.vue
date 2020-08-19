<template>
    <div class="field px-3 py-2 mb-2 d-flex align-items-center justify-content-between">
        <div>
            <svgicon name="user" width="24" height="24" />
            <span class="text-2 text-gray-800 mr-2">مسافر ۱ - بزرگسال</span>
        </div>
        <span class="flex-grow-1 text-left">
            <badge class="px-3 py-2">
                فرهاد مجیدی
            </badge>
        </span>
        <svgicon name="arrow-left" class="text-gray-700 mr-2" width="24" height="24" />
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'

export default {
    name: 'PassengerField',
    components: {Badge}
}
</script>

<style lang="scss" scoped>
    .field {
        border: 1px solid map_get($grays, '400');
        border-radius: 10px;
        background: #f9f9f9;
        min-height: 50px;

        /deep/ .badge {
            font-weight: 400;
            border: none;
            border-radius: 100px;
            font-size: 0.75rem;
        }
    }
</style>