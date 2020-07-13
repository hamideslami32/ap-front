<template>
    <div class="location">
        <div class="location__origin">
            <p class="location__origin--title">
                مبدا
            </p>
            <input value="آمستردام" class="location__origin--input">
            <div class="location__origin--airport">
                <span class="location__origin--airport__code">AMS</span>
                <span class="location__origin--airport__name">فرودگاه اسخیپول</span>
            </div>
        </div>
        <div class="location__destination">
            <p class="location__destination--title">
                مقصد
            </p>
            <input value="سنگاپور" class="location__destination--input">
            <div class="location__destination--airport">
                <span class="location__destination--airport__name">فرودگاه چانگی</span>
                <span class="location__destination--airport__code">AMS</span>
            </div>
        </div>
        <div class="location__reverse">
            <div class="location__reverse--btn">
                <svgicon class="location__reverse--btn__icon" name="arrows-round" width="30" height="30" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@mixin location-card {
    min-width: 49%;
    background: $backgroundColor;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
}

.location {
    position: relative;
    max-height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    &__origin {
        @include location-card;

        border-radius: 0 5px 5px 0;
        margin-left: 5px;
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 15px 20px 10px;

        &--title {
            font-size: 13px;
            color: $grayColor;
            line-height: 22px;
            margin-bottom: 5px;
        }

        &--input {
            outline: none;
            border: none;
            background: transparent;
            font-weight: 600;
            font-size: 17px;
            line-height: 30px;
            height: 30px;
            color: $black;
            margin-bottom: 5px;
            width: 90%;
        }

        &--airport {
            display: flex;
            flex-direction: row;
            align-items: center;

            &__code {
                background: $lightGrayColor;
                background: rgba(71, 32, 134, 0.1);
                border: 1px solid $primary;
                color: $primary;
                font-size: 11px;
                padding: 3px 5px;
                border-radius: 100px;
                margin-left: 5px;
                font-weight: 600;
            }

            &__name {
                font-size: 11px;
                line-height: 20px;
                color: $darkGrayColor;
            }
        }
    }

    &__destination {
        @include location-card;

        border-radius: 5px 0 0 5px;
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 20px 15px 20px 10px;

        &--title {
            font-size: 13px;
            color: $grayColor;
            line-height: 22px;
            margin-bottom: 5px;
        }

        &--input {
            outline: none;
            text-align: left;
            border: none;
            background: transparent;
            font-weight: 600;
            font-size: 17px;
            line-height: 30px;
            height: 30px;
            color: $black;
            margin-bottom: 5px;
            width: 90%;
        }

        &--airport {
            display: flex;
            flex-direction: row;
            align-items: center;

            &__code {
                background: rgba(71, 32, 134, 0.1);
                border: 1px solid $primary;
                color: $primary;
                font-size: 11px;
                padding: 3px 5px;
                border-radius: 100px;
                margin-right: 5px;
                font-weight: 600;
            }

            &__name {
                font-size: 11px;
                line-height: 20px;
                color: $darkGrayColor;
            }
        }
    }

    &__reverse {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 1;
        width: 40px;
        height: 40px;
        background: $backgroundColor;
        border-radius: 50%;

        &::before {
            content: '';
            width: 40px;
            height: 20px;
            border-top-left-radius: 90px;
            border-top-right-radius: 90px;
            background: transparent;
            position: absolute;
            left: 12px;
            transform: rotate(90deg);
            border: 1px solid #DDDDDD;
            border-bottom-style: none;
            top: 10px;
        }

        &::after {
            content: '';
            width: 40px;
            height: 20px;
            border-top-left-radius: 90px;
            border-top-right-radius: 90px;
            background: transparent;
            position: absolute;
            right: 12px;
            transform: rotate(-90deg);
            border: 1px solid #DDDDDD;
            border-bottom-style: none;
            top: 10px;
        }

        &--btn {
            background: $black;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            margin: 0 auto;
            line-height: 30px;

            &__icon {
                color: $white;
                display: inline-block;
                vertical-align: baseline;
            }
        }
    }
}
</style>
