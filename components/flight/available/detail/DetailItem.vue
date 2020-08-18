<template>
    <div class="detail-item">
        <div class="detail-item__airplane">
            <span class="font-en px-2">B777</span>
            <span class="px-2">|</span>
            <span>شماره پرواز: ۴۸۳</span>
            <span class="flex-grow-1" />
            <span class="px-1 text-2">ترکیش ایرلاینز</span>
            <span />
        </div>
        <div class="detail-item__cities d-flex align-items-center justify-content-between mt-2">
            <span class="text-2 text-gray-800 font-en text-weight-500">Tehran</span>
            <svgicon name="plane-takeoff" class="text-gray-700 flex-grow-1" width="40" height="20" />
            <span class="text-2 text-gray-800 font-en text-weight-500">London</span>
        </div>
        <div class="detail-item__time d-flex align-items-center justify-content-between mt-3 mb-2">
            <div class="detail-item__time__holder">
                <p class="text-weight-600 text-gray-900 mb-0 py-1">
                    23:00
                </p>
                <p class="font-en text-1 text-gray-800 text-weight-500 mb-0 py-1">
                    23 AUG
                </p>
            </div>
            <div class="flex-grow-1 mt-2 px-3">
                <div class="detail-item__time__route px-3">
                    <span class="text-2 text-weight-500 font-en text-gray-700">2h 30m</span>
                </div>
                <div class="text-1 text-gray-800 text-weight-500 mt-4 d-flex align-items-center justify-content-between">
                    <span>۲۰ مرداد ۹۹</span>
                    <span>۰۴ شهریور ۹۹</span>
                </div>
            </div>
            <div class="detail-item__time__holder">
                <p class="text-weight-600 text-gray-900 mb-0 py-1">
                    23:00
                </p>
                <p class="font-en text-1 text-gray-800 text-weight-500 mb-0 py-1">
                    23 AUG
                </p>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <badge class="px-3">
                IKA
            </badge>
            <div class="d-flex align-items-center flex-grow-1 px-3 justify-content-between font-en text-weight-500 text-2 text-gray-700">
                <span>Imam Khomeini</span>
                <span>Heathrow</span>
            </div>
            <badge class="px-3">
                LHR
            </badge>
        </div>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'

export default {
    name: 'DetailItem',
    components: {Badge}
}
</script>

<style lang="scss" scoped>
    @mixin line {
        content: '';
        width: 3px;
        background: map_get($grays, '400');
        border-radius: 100px;
        position: absolute;
        top: 0;
        bottom: 0;
    }

    @mixin circle {
        content: '';
        width: 12px;
        height: 12px;
        background: $white;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        border: 1px solid map_get($grays, '400');
        top: -6px;
    }

    .detail-item {
        &__airplane {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: map_get($grays, '800');
            font-size: 0.625rem;
            background: map_get($grays, '200');
            padding: 5px 10px;
            border-radius: 8px;
            border: 1px solid map_get($grays, '500');

            span:last-child { // image section for airline logo
                background: rgba(255, 0, 0, 0.1);
                width: 30px;
                height: 30px;
                border-radius: 50px;
            }
        }

        &__cities {
            svg {
                transform: scale(-1, 1);
            }

            span {
                position: relative;

                &:first-child {
                    margin-right: 10px;

                    &:before {
                        @include line;
                        right: -10px;
                    }
                }
            }
        }

        &__time {
            &__holder {
                background: map_get($grays, '500');
                border: 1px solid map_get($grays, '500');
                border-radius: 5px;
                min-width: 55px;
                text-align: center;

                p {
                    &:first-child {
                        background: $white;
                        border-radius: 5px;
                        margin: 1px;
                    }
                }
            }

            &__route {
                border-top: 1px dashed map_get($grays, '400');
                position: relative;

                > span {
                    background: $white;
                    border: 1px solid map_get($grays, '500');
                    padding: 1px 10px;
                    border-radius: 100px;
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                &:before {
                    @include circle;
                    right: 0;
                }

                &:after {
                    @include circle;
                    left: 0;
                }
            }
        }

        /deep/ .badge {
            font-size: 0.75rem;
        }
    }
</style>