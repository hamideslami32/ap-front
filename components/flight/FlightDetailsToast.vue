<template>
    <span v-if="available">
        <toast-card variant="light">
            <div class="text-center d-flex align-items-center justify-content-center">
                <svgicon name="money" width="20" height="20" />
                <span class="mr-2 text-2">
                    میانگین قیمت برای هر نفر {{ pricePerPassenger | separateNumber }} تومان
                </span>
            </div>
        </toast-card>
        <toast-card>
            <div class="d-flex align-items-center justify-content-between p-1">
                <div>
                    <p class="mb-2 text-3">
                        مجموع قیمت برای {{ $flight.passengersCount }} نفر
                    </p>
                    <p class="mb-0 text-4">
                        {{ available.totalFare | separateNumber }} تومان
                    </p>
                </div>
                <slot #button />
            </div>
        </toast-card>
    </span>
</template>
<script>
import ToastCard from '~/components/ui/ToastCard'
export default {
    components: {ToastCard},

    computed: {
        available() {
            return this.$flight.available
        },
        pricePerPassenger() {
            return Math.ceil(this.available.totalFare / this.$flight.passengersCount)
        }
    }
}
</script>
