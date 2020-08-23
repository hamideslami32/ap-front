<template>
    <card-with-tag :tag="tag">
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
                <b-form-checkbox v-model="localSwitchData" class="custom-control" switch size="lg" />
            </div>
        </div>
        <div class="risk-free-card__options text-2 mt-4" :class="{ 'opacity-half': !localSwitchData }">
            <div v-for="(item, i) in options" :key="i" class="item d-flex mb-3 mx-2 pb-3" :class="{ 'first-item': i === 0 }">
                <div cols="1" class="d-flex ml-2 pb-2">
                    <b-form-checkbox
                        :id="item.value"
                        v-model="item.model"
                        :value="item.value"
                        :disabled="!localSwitchData"
                    />
                </div>
                <div cols="11" class="text-2 flex-grow-1 text-gray-900">
                    <div class="text-weight-500 font-en pb-1">
                        {{ item.title }}
                    </div>
                    <div class="text-gray-800 pb-1">
                        {{ item.description }}
                    </div>
                    <div><span>( <span class="price text-weight-500">{{ item.price }}</span> <span class="text-1 text-gray-800 text-weight-400">تومان</span>)</span> <span class="type">{{ item.type }}</span></div>
                </div>
            </div>
        </div>
    </card-with-tag>
</template>

<script>
import CardWithTag from '~/components/ui/CardWithTag'

export default {
    name: 'RiskFreeCard',
    components: {
        CardWithTag
    },
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
                    // value: 'return-money',
                    model: false
                },
                {
                    title: 'Fare Drop Protection',
                    description: 'بازگشت مابه التفاوت قیمت در صورت کاهش نرخ',
                    price: '50,000',
                    type: 'رایگان',
                    // value: 'fare-drop-protection',
                    model: false
                }
            ]
        }
    },
    data() {
        return {
            localSwitchData: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .risk-free-card__header {
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

    }
    .risk-free-card__options {
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
    .opacity-half {
        opacity: 0.5;
    }

    /deep/ .custom-control-input:checked ~ .custom-control-label::before {
        border-color: $blueColor !important;
        background-color: $blueColor !important;
    }
    /deep/ .custom-control-label::before {
        box-shadow: none !important;   
    }
    /deep/ .custom-control-input ~ .custom-control-label::before {
        background-color: #fff !important;
        border-color: $blueColor !important;
    }
</style>