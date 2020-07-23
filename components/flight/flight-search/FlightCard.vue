<template>
    <div class="flight-card clearfix">
        <span class="price">35,500,000</span>
        <span class="price__text">برای هر نفر (تومان)</span>
        <div class="tag">
            <span>ارزان ترین</span>
        </div>
        <div class="my-3">
            <slot />
        </div>
        <div class="alternative-holder">
            <div class="alternative">
                <div class="shape" />
                <span>۲۵ پرواز مشابه</span>
            </div>
        </div>
        <div class="float-left d-flex align-items-center ml-2">
            <span class="flight-card__select-text ml-2">انتخاب</span>
            <div class="circle">
                <svgicon name="arrow-long-right" width="18" class="header__icon" height="20" />
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    .flight-card {
        background: #f5f5f5;
        border-radius: 10px;
        border: 1px solid #dddddd;
        margin: 20px auto;
        padding: 15px 10px 10px 10px;
        font-weight: 600;
        position: relative;

        .price {
            font-size: 1.2em;
            color: $info;

            &__text {
                font-size: 0.6em;
                color: #888888;
                font-weight: 400;
            }
        }

        .alternative-holder {
            position: absolute;
            right: 0;
            bottom: 13px;

            .alternative {
                padding: 5px 10px 5px 15px;
                text-align: right;
                font-size: 0.7em;
                border-top-left-radius: 30px;
                border-bottom-left-radius: 30px;
                border-bottom-right-radius: 25px;
                font-weight: 600;
                color: $white;
                background: $info;
                position: relative;

                .shape {
                    content: '';
                    position: absolute;
                    width: 21px;
                    height: 15px;
                    top: -15px;
                    background: #f5f5f5;
                    border-bottom-right-radius: 30px;
                    right: 0;
                }

                &:before {
                    content: '';
                    width: 17px;
                    height: 10px;
                    position: absolute;
                    background: #e3469a;
                    right: 0;
                    top: -9px;
                }
            }
        }

        &__select-text {
            font-weight: 600;
            color: $primary;
            font-size: 0.8em;
        }

        .circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: $primary;
            display: flex;
            align-items: center;

            svg {
                transform: rotate(180deg);
                color: $white;

            }
        }

        .tag {
            position: absolute;
            left: 20px;
            top: -1px;
            height: 24px;
            width: 80px;
            background: transparent;
            border-left: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            border-top: 1px solid #f5f5f5;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom-left-radius: 30px 60px;
            border-bottom-right-radius: 30px 60px;
            span{
                font-size: 0.6em;
                color: $info;
            }
        }
    }
</style>