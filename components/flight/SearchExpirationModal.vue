<template>
    <b-modal
        visible
        hide-footer
        hide-header
        centered
        no-close-on-backdrop
        class="expire-time"
    >
        <div class="text-center">
            <svgicon name="clock" class="text-gray-700 " width="50" height="50" />
            <p class="text-3 mt-2 mb-3 text-gray-black text-weight-500">
                {{ msg || 'زمان خرید شما به اتمام رسیده' }}
            </p>
            <div class="mx-3">
                <b-button
                    class="text-2 py-2 text-weight-500 w-100"
                    variant="outline-secondary"
                    @click="$emit('retry')"
                >
                    جستجو مجدد
                </b-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    props: {
        msg: {
            type: String,
            default: null
        }
    }
})
</script>


<style lang="scss" scoped>
    /deep/ .modal-dialog-centered {
        /deep/.modal-content {
            width: 90%;
            margin: 0 auto;
            height: unset;
        }
    }
</style>
