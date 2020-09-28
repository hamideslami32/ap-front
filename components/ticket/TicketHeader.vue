<template>
    <div class="ticket-header font-en">
        <logo class="logo" />
        <div class="order-info">
            <div class="order-date">
                <div>
                    <div class="text-gray-700 text-1">
                        Order date
                    </div>
                    <div class="text-gray-900 text-2">
                        15 Feb 20 - 23:00
                    </div>
                </div>
                <div class="calendar-icon-wrapper ml-1">
                    <svgicon
                        class="pair-icon"
                        name="calendar"
                        color="gray"
                        width="24"
                        height="24"
                    />
                </div>
            </div>
            <!-- <div class="divider"></div> -->
            <div class="order-no">
                <img
                    src="~/assets/images/qr.png"
                    alt="qr"
                    width="30px"
                    height="30px"
                    class="mr-1"
                >
                <div>
                    <div class="text-gray-700 text-1">
                        Order no
                    </div>
                    <div class="text-gray-900 text-2">
                        1009731966
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/logo/Logo'

export default {
    components: {
        Logo
    }
}
</script>

<style lang="scss" scoped>
    .ticket-header {
        height: 100px;
        .logo {
            width: 120px;
            float: left;
        }
        .order-info {
            float: right;
            width: 50%;

            .order-date, .order-no {
                padding: 10px;
                display: flex;
                align-items: center;
            }

            .calendar-icon-wrapper {
                width: 40px;
                height: 40px;
                border: 1px solid $borderColor;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: $borderRadius5;
                position: relative;

                svg {
                    z-index: 5;
                }

                &::before {
                    content: '';
                    width: 22px;
                    height: 42px;
                    left: -1px;
                    position: absolute;
                    background: rgba(245, 245, 245, 1);
                    box-shadow: 2px 2px 20px #fff;
                }
            }

            .divider {
                height: 70px;
                border: 1px solid $modalBorder;
            }

            .title {

            }
        }
    }
</style>