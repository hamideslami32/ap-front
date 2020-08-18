<template>
    <div class="detail-card">
        <div class="detail-card__wrapper mb-4">
            <detail-item />
            <div class="detail-card__stop p-2 my-3">
                <svgicon name="chair" class="text-gray-700 p-1" width="18" height="18" />
                <span class="text-weight-500 text-2 text-gray-900 mr-2">توقف در لندن به مدت 2 ساعت 40 دقیقه</span>
            </div>
            <detail-item />
        </div>

        <div class="detail-card__rule mb-5">
            <div class="detail-card__rule__text">
                <svgicon name="bag" class="text-gray-700" width="20" height="20" />
                <span class="mr-1">بار مجاز : 20 کیلوگرم</span>
                <span class="px-1">/</span>
                <span>2pcs</span>
            </div>
            <div class="detail-card__rule__type">
                <div>قابل استرداد</div>
            </div>
        </div>

        <div class="detail-card__tag">
            <span class="text-primary text-1 text-weight-500 ">قوانین استرداد</span>
        </div>
    </div>
</template>

<script>
import DetailItem from '~/components/flight/available/detail/DetailItem'

export default {
    name: 'DetailCard',
    components: {DetailItem}
}
</script>

<style lang="scss" scoped>
    .detail-card {
        background: map-get($grays, '200');
        border-radius: 10px;
        border: 1px solid map_get($grays, '400');
        position: relative;

        &__wrapper {
            border-radius: 10px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
            background: $white;
            padding: 10px;
        }

        &__stop {
            background: #e4f7f9;
            border: 1px solid #c4edf1;
            border-radius: 8px;

            svg {
                background: $white;
                box-sizing: content-box;
                border-radius: 50%;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            }
        }

        &__rule {
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__text {
                font-size: 0.75rem;
                color: map_get($grays, '800');

                span:last-child {
                    font-family: 'Baloo Thambi 2', Dana, Tahoma, serif;
                    font-weight: 500;
                }
            }

            svg {
                padding: 5px;
                box-sizing: content-box;
                background: $white;
                border-radius: 50%;
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
            }

            &__type {
                width: 90px;
                height: 30px;
                font-size: 0.75rem;
                color: #45c6d4;
                background: linear-gradient(90deg, #45c6d4 0%, rgba(69, 198, 212, 0.1) 100%);
                border-radius: 5px;
                position: relative;

                > div {
                    background: #e3f0f2;
                    border-radius: 5px;
                    line-height: 30px;
                    text-align: center;
                    position: absolute;
                    left: 1px;
                    bottom: 1px;
                    right: 1px;
                    top: 1px;
                }
            }
        }

        &__tag {
            position: absolute;
            bottom: -1px;
            height: 24px;
            width: 100px;
            background: transparent;
            border: 1px solid $primary;
            border-bottom-color: map_get($grays, '200');
            border-top-color: map_get($grays, '200');
            border-top-left-radius: 20px 30px;
            border-top-right-radius: 20px 30px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 0;
            left: 0;
            margin: auto;
        }
    }
</style>