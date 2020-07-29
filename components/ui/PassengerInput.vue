<template>
    <div class="passenger">
        <span class="passenger__icon-holder">
            <svgicon class="passenger__icon-holder--icon" width="24" height="24" name="user" />
        </span>
        <div class="passenger__input-holder">
            <span class="passenger__input-holder--before">
                <svgicon class="passenger__input-holder--before__icon" width="24" height="24" name="chair" />
            </span>
            <input
                ref="input"
                name="passenger"
                :value="value"
                class="passenger__input-holder--input"
                type="text"
            >
            <span class="passenger__input-holder--after">
                <svgicon
                    class="passenger__input-holder--after__icon"
                    width="24"
                    height="24"
                    name="arrow-down"
                />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .passenger {
        border: 1px solid #cccccc;
        border-radius: 10px;
        position: relative;
        height: 50px;

        &__icon-holder {
            position: absolute;
            right: 15px;
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;

            &::before {
                content: '';
                height: 24px;
                position: absolute;
                left: -10px;
                width: 1px;
                background: $borderColor;
            }

            &--icon {
                color: $grayColor;
                position: relative;
            }
        }

        &__input-holder {
            height: 100%;
            position: relative;
            margin-right: 70px;

            &--input {
                pointer-events: none;
                height: 100%;
                width: 80%;
                outline: none;
                border: none;
                background: transparent;
                padding: 0 40px 0 30px;
                font-size: 15px;
                line-height: 52px;
                background-clip: padding-box;

            }

            &--before {
                position: absolute;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 100%;

                &__icon {
                    color: $grayColor;
                }
            }

            &--after {
                position: absolute;
                left: 15px;
                transform: translateY(50%);
                height: 24px;

                &__icon {
                    color: $darkGrayColor;
                }
            }
        }
    }
</style>
