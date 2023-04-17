<template>
    <div class="price-detail p-3 text-center my-3">
        <p class="price-detail__header text-weight-600 text-3">
            جزییات قیمت
        </p>
        <div class="price-detail__prices my-4">
            <div v-for="(item, i) in prices" :key="i" class="d-flex justify-content-between mb-3">
                <div>
                    <span class="count d-inline-block px-2 ml-2 text-2 text-weight-500">x{{ item.count }}</span>
                    <span class="text-2">{{ item.title }}</span>
                </div>
                <div>
                    <span class="text-weight-500">{{ item.price | separateNumber }}</span>
                    <span class="text-1">تومان</span>
                </div>
            </div>
        </div>
        <div class="price-detail__btn">
            <span class="ml-2 text-2 text-weight-500">مبلغ نهایی</span> <span class="text-3 text-weight-500">{{ totalPrice | separateNumber }}</span> <span class="text-1">تومان</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PriceDetail',
    props: {
        flights: {
            type: Array,
            required: true
        },
        session: {
            type: Object,
            required: true
        }
    },
    computed: {
        prices() {
            const titles = {
                adult: 'بزرگسال',
                child: 'کودک',
                infant: 'نوزاد'
            }
            return ['adult', 'child', 'infant'].map(type => ({
                count: this.session[type],
                title: titles[type],
                price: this.flights.reduce((carry, item) => {
                    const fare = item.fare[type]
                    return carry + (fare.price + fare.tax) * this.session[type]
                }, 0)
            })).filter(el => el.count)
        },
        totalPrice() {
            return this.prices.reduce((carry, item) => carry + item.price, 0)
        }
    }
}
</script>

<style lang="scss" scoped>
    .price-detail {
        background-color: $primary;
        color: $white;
        border-radius: $borderRadius10;
        &__prices {
            .count {
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: $borderRadius5;
                width: 30px;
                height: 20px;
                line-height: 20px;
            }
        }
        &__btn {
            width: 100%;
            background-color: $lightPrimary;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: $borderRadius10;
            height: 40px;
            line-height: 40px;
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05);
        }
    }
</style>
