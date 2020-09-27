<template>
    <table class="ticket font-en">
        <!-- <ticket-header></ticket-header>
        <ticket-item></ticket-item>
        <ticket-price></ticket-price> -->
        <tr>
            <td class="logo-wrapper">
                <logo class="logo" />
            </td>
            <td colspan="5">
                <table class="order-info">
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            <div class="order-no">
                                <div class="qr-wrapper mr-2">
                                    <img src="~/assets/images/qr.png" alt="qr" width="30px" height="30px">
                                </div>
                                <div>
                                    <div class="text-gray-700 text-1">
                                        Order no
                                    </div>
                                    <div class="text-gray-900 text-2">
                                        1009731966
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</template>

<script>
// import TicketHeader from '~/components/ticket/TicketHeader'
// import TicketPrice from '~/components/ticket/TicketPrice'
// import TicketItem from '~/components/ticket/TicketItem'
import Logo from '~/components/logo/Logo'


export default {
    layout: 'ticket',
    components: {
        // TicketHeader,
        // TicketPrice,
        // TicketItem,
        Logo
    }    
}
</script>

<style lang="scss" scoped>
.ticket {
    width: 100%;
    direction: ltr;
    border: 1px solid ;

    .logo-wrapper {
        text-align: left;
        padding-left: 10px;
        .logo {
            float: left;
        }
    }
    .order-info {
        width: 300px;
        text-align: right;
        float: right;
        margin-right: 10px;
        td {
            & > div {
                display: flex;
                padding: 10px 0;
                justify-content: flex-end;

            }
        }

        .order-no {
            .qr-wrapper {
                height: 40px;
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fff;
                border-radius: $borderRadius5;
                box-shadow: $btn-box-shadow;
            }
        }
    }

}
</style>

<router>
    {
    "name": "ticket"
    }
</router>
