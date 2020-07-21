<template>
    <div class="flight-item">
        <div class="d-flex">
            <span class="flight-item__title">پرواز رفت</span>
        </div>
        <div class="flight-item__locations">
            <span>Tehran</span>
            <span>Paris</span>
        </div>
        <div class="flight-item__map">
            <span class="flight-item__map__time">
                22:10
            </span>
            <span class="flight-item__map__line">
                <span class="stop" />
            </span>
            <span class="flight-item__map__time">
                19:00
            </span>
        </div>
        <div class="flight-item__detail">
            <span>مدت: 2h 30m</span>
            <span class="flight-item__detail--center">۱ توقف در لندن</span>
            <span>+۹ صندلی</span>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    @mixin circle {
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        background: $white;
        border-radius: 50%;
        border: 1px solid #cccccc;
    }

    .flight-item {
        background: $white;
        color: #888888;
        padding: 10px;

        &__title {
            font-size: 0.7em;
        }

        &__locations {
            color: $darkGrayColor;
            font-size: 0.8em;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__map {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__time {
                font-size: 0.9em;
                color: $black;
                flex: 1;
                text-align: center;
            }

            &__line {
                margin: 0 20px;
                border-bottom: 1px dashed #E6E6E6;
                height: 100%;
                flex: 5;
                display: inline-flex;
                position: relative;

                .stop {
                    @include circle;
                    width: 5px;
                    height: 5px;
                    border: 1px solid #666666;
                    top: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                &:before {
                    @include circle;
                    left: 0;
                    top: -4px;
                }

                &:after {
                    @include circle;
                    right: 0;
                    top: -4px;
                }
            }
        }

        &__detail {
            display: flex;
            text-align: center;
            background: rgba(73, 35, 140, 0.1);
            border-radius: 50px;
            font-size: 0.7em;
            color: #888888;
            padding: 5px 0;
            align-items: center;

            &--center{
                border-left: 1px solid rgba(71, 32, 134, 0.1);
                border-right: 1px solid rgba(71, 32, 134, 0.1);
            }
            span{
                flex: 1;
            }
        }
    }
</style>