<template>
    <div class="date-picker">
        <div class="date-picker__start">
            <svgicon class="date-picker__start--icon" name="calendar" width="24" height="24" />
            <div class="date-picker__start--input-holder">
                <label class="date-picker__start--input-holder__title">تاریخ رفت</label>
                <input
                    class="date-picker__start--input-holder__input"
                    value="‏۲ شهریور ۹۹"
                    type="text"
                    name="start-date"
                    readonly
                >
            </div>
        </div>
        <!--<div class="date-picker__end">
            &lt;!&ndash; <svgicon class="date-picker__end&#45;&#45;icon" name="calendar" width="30" height="30" /> &ndash;&gt;
            <div class="date-picker__end&#45;&#45;input-holder">
                <label class="date-picker__end&#45;&#45;input-holder__title">تاریخ بازگشت</label>
                &lt;!&ndash; <input
          class="date-picker__end&#45;&#45;input-holder__input"
          value="‏۲ شهریور ۹۹"
          type="text"
          name="end-date"
        > &ndash;&gt;
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    name: 'DateInput'
}
</script>

<style lang="scss" scoped>
.date-picker {
    display: flex;
    border: 1px solid $borderColor;
    border-radius: 5px;
    align-items: center;
    //   padding: 20px 15px;

    &__start {
        flex: 1;
        display: flex;
        align-items: center;
        background-color: $lightGrayColor;
        padding: 10px 15px 10px 5px;

        &--icon {
            color: $grayColor;
            flex: 1;
        }

        &--input-holder {
            margin-right: 10px;
            display: flex;
            flex-direction: column;
            flex: 4;

            &__title {
                font-size: 13px;
                line-height: 20px;
                text-align: right;
                color: $grayColor;
            }

            &__input {
                outline: none;
                width: 100%;
                border: none;
                background: transparent;
                font-weight: 500;
                font-size: 14px;
                line-height: 25px;
                color: $black;
                text-align: right;
                height: 25px;
            }
        }
    }

    &__end {
        display: flex;
        align-items: center;
        flex: 1;
        //   background-color: $lightGrayColor;
        padding: 10px 5px 10px 15px;
        justify-content: center;

        &--icon {
            color: $grayColor;
        }

        &--input-holder {
            //   margin-right: 10px;
            display: flex;
            flex-direction: column;

            &__title {
                font-size: 15px;
                line-height: 32px;
                text-align: center;
                color: $grayColor;
                margin-bottom: 0;
            }

            &__input {
                outline: none;
                width: 100%;
                border: none;
                background: transparent;
                font-weight: 500;
                font-size: 14px;
                line-height: 25px;
                color: $black;
                text-align: right;
                height: 25px;
            }
        }
    }
}
</style>
