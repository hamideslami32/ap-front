<template>
    <card-with-tag :tag="tag" :color="tagColor">
        <div class="charity-card__header pt-3 px-3 ml-5">
            <div class="d-flex align-items-center">
                <div class="icon d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="~/assets/images/heart.svg" alt="apro" width="40px" height="40px">
                    </div>
                </div>
                <span class="text-3 text-weight-600 mr-3 text-gray-900">ردپا داشته باشیم</span>
            </div>
        </div>
        <p class="charity-card__info bg-gray-200 mb-0 text-2 my-3 mx-3 p-2 text-center">
            مبلغ <span class="text-weight-600">200,000</span> ریال از سود حاصل از خرید شما صرف امور خیریه می‌ شود
        </p>
        <form class="charity-card__options text-2 mt-4">
            <div v-for="(item, i) in options" :key="i" class="item d-flex align-items-center justify-content-between mb-2 pb-2 px-2">
                <div class="d-flex ml-2 align-items-center">
                    <b-form-checkbox
                        :id="`checkbox${i+1}`"
                        v-model="item.value"
                        :name="`checkbox${i+1}`"
                    />
                    <label class="mb-0 text-2 text-weight-500 font-en mr-2" :class="{ 'secondary-color': item.value }" :for="`checkbox${i+1}`">
                        {{ item.title }}
                    </label>
                </div>
                <svgicon :name="item.icon" class="text-gray-700" width="25" height="25" />
            </div>
        </form>
    </card-with-tag>
</template>

<script>
import CardWithTag from '~/components/ui/CardWithTag'

export default {
    name: 'Charity',
    components: {
        CardWithTag
    },
    props: {
        tag: {
            type: String,
            required: true
        },
        tagColor : {
            type: String,
            required: true
        },
        options: {
            type: Array,
            default: () => [
                {
                    title: 'ساخت مدرسه در روستای جازموریان',
                    icon: 'user',
                    value: false
                },
                {
                    title: 'تامین ۲۰۰ بسته لوازم تحریر کودکان محروم',
                    icon: 'user',
                    value: false
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
    .charity-card__header {
        .icon {
            height: 60px;
            width: 60px;
            background: linear-gradient(180deg, $secondary 0%, #f9f9f9 55.21%);
            box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
            border-radius: $borderRadius10;
            & > div {
                background: linear-gradient(180deg, #f8cee4 0%, #ffffff 55.21%);
                border-radius: $borderRadius10;
                width: 58px;
                height: 58px;
                color: $secondary;
            }
        }

    }
    .charity-card__info {
        border: 1px solid #e5e5e5;
        height: 70px;
        line-height: 2;
        border-radius: $borderRadius10;
    }
    .charity-card__options {
        .item {
            height: 50px;
            .type {
                color: $secondary;
            }
            .price {
                text-decoration: line-through;
            }
        }
        & > div:first-of-type {
            border-bottom: 1px solid #ddd;
        }
        .secondary-color {
            color: $secondary;
        }
    }

    /deep/ .custom-control-input:checked ~ .custom-control-label::before {
        border-color: $secondary !important;
        background-color: $secondary !important;
    }
    /deep/ .custom-control-label::before {
        box-shadow: none !important;   
    }
    /deep/ .custom-control-input ~ .custom-control-label::before {
        background-color: #fff !important;
        border-color: $secondary !important;
    }
</style>