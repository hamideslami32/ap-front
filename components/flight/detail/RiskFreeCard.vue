<template>
    <div class="risk-free-card">
        <div class="risk-free-card__tag">
            <span class="text-1 text-weight-500 ">{{ tag }}</span>
        </div>
        <div class="risk-free-card__header pt-3 px-3 d-flex align-items-center justify-content-between ml-5">
            <div class="d-flex align-items-center">
                <div class="icon d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center">
                        <svgicon name="user" class="text-gray-700 flex-grow-1" width="40" height="40" />
                    </div>
                </div>
                <span class="text-3 text-weight-600 mr-3">خرید آسوده</span>
            </div>
            <div>
                <!-- <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitches">
                    <label class="custom-control-label" for="customSwitches"></label>
                </div> -->
                <b-form-checkbox v-model="checked" class="custom-control" switch size="lg" />
            </div>
        </div>
        <div class="risk-free-card__options text-2 mt-4">
            <div v-for="(item, i) in options" :key="i" class="item d-flex mb-3 mx-2 pb-3" :class="{ 'first-item': i === 0 }">
                <div cols="1" class="d-flex ml-2 pb-2">
                    <b-form-checkbox
                        :id="item.value"
                        v-model="localValue"
                        :value="item.value"
                    />
                </div>
                <div cols="11" class="text-2 flex-grow-1 text-gray-900">
                    <div class="font-weight-500 font-en pb-1">
                        {{ item.title }}
                    </div>
                    <div class="text-gray-800 pb-1">
                        {{ item.description }}
                    </div>
                    <div><span>( <span class="price font-weight-500">{{ item.price }}</span> <span class="text-1 text-gray-800 font-weight-400">تومان</span>)</span> <span class="type">{{ item.type }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'RiskFreeCard',
    props: {
        tag: {
            type: String,
            default: 'Risk Free'
        },
        options: {
            type: Array,
            default: () => [
                {
                    title: 'Same Day Cancellation Protection',
                    description: 'کنسلی بدون جریمه تا ساعت ۲۳:۰۰ روز صدور بلیط',
                    price: '100,000',
                    type: 'رایگان',
                    value: 'return-money'
                },
                {
                    title: 'Fare Drop Protection',
                    description: 'بازگشت مابه التفاوت قیمت در صورت کاهش نرخ',
                    price: '50,000',
                    type: 'رایگان',
                    value: 'fare-drop-protection'
                }
            ]
        }
    },
    data: function() {
        return {
            checked: false
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(x) {
                this.$emit('input', x)
            }
        }
        // checked: {
        //     get() {
        //         return this.value
        //     },
        //     set(value) {
        //         this.$emit('input', value)
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
    .risk-free-card {
        min-height: 270px;
        border: 1px solid $borderColor;
        border-radius: $borderRadius10;
        position: relative;
        &__tag {
            position: absolute;
            top: -1px;
            height: 24px;
            width: 100px;
            background: transparent;
            border: 1px solid $blueColor;
            border-top-color: #fff;
            border-bottom-color: #fff;
            border-bottom-left-radius: 20px 30px;
            border-bottom-right-radius: 20px 30px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 30px;
            color: $blueColor;
        }

        &__header {
            .icon {
                height: 60px;
                width: 60px;
                background: linear-gradient(180deg, $blueColor 0%, #f9f9f9 55.21%);
                box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
                border-radius: $borderRadius10;

                & > div {
                    background: #e3f0f2;
                    border-radius: $borderRadius10;
                    width: 58px;
                    height: 58px;
                    color: $blueColor;
                }
            }

            .custom-control {

                /deep/ label {
                    border-color: $blueColor;
                }
                
                /deep/ .custom-control-input:checked ~ .custom-control-label::before {
                    border-color: $blueColor;
                    background-color: $blueColor;
                }

                /deep/ .custom-control-input:not(:disabled):active ~ .custom-control-label::before {
                    background-color: $borderColor;
                    border-color: $blueColor;
                }
            }

            .custom-switch .custom-control-label::before {
                // width: 3rem;
                // height: 20px;
            }
        }

        &__options {
            .item {
                & > div:first-of-type {
                    width: 25px;
                }
                .type {
                    color: $blueColor;
                }
                .price {
                    text-decoration: line-through;
                }
            }
            .first-item {
                border-bottom: 1px solid $borderColor;
            }
        }
    }
</style>