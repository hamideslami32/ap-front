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
    </div>
</template>

<script>
export default {
    name: 'DetailItem'
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
                background: rgba(255,0, 0, 0.1);
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
    }
</style>