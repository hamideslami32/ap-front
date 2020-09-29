<template>
    <div class="ticket en" dir="ltr">
        <div class="ticket__header">
            <img class="mr-auto" src="data:image/png;base64,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" alt="logo" width="120px">

            <div class="text-nowrap">
                <div class="text-right d-inline-block align-middle">
                    <div class="text-gray-700">
                        Order date
                    </div>
                    <div class="text-gray-900">
                        {{ $dayjs(ticket.createdAt).calendar('gregory').format('YYYY-MM-DD') }}
                        |
                        {{ $dayjs(ticket.createdAt).calendar('jalali').format('YYYY-MM-DD') }}
                    </div>
                </div>
                <div class="ml-2 d-inline-block align-middle">
                    <svgicon
                        name="calendar"
                        color="gray"
                        width="34"
                        height="34"
                    />
                </div>
            </div>

            <div class="text-nowrap border-left pl-3 ml-3">
                <div class="mr-2 d-inline-block align-middle">
                    <img src="~/assets/images/qr.png" alt="qr" width="40" height="40">
                </div>
                <div class="d-inline-block align-middle">
                    <div class="text-gray-700">
                        Order no
                    </div>
                    <div class="text-gray-900">
                        {{ ticket._id }}
                    </div>
                </div>
            </div>
        </div>
        <div class="ticket__passengers mb-3">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Passport Number / National Code</th>
                        <th>Passenger Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, i) in item.passengers" :key="i">
                        <td><svgicon name="user" width="24" height="24" /> &nbsp;{{ p.name.en }} {{ p.surname.en }}</td>
                        <td>{{ p.nationalCode || p.passportNumber }}</td>
                        <td>{{ p.type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-for="(flight, i) in item.flights" :key="i" class="mb-5">
            <h4 class="mb-4">
                Flight {{ i + 1 }} &nbsp;<small>(پرواز {{ i === 0 ? 'رفت' : 'برگشت' }})</small>
            </h4>

            <template v-for="(stop, i) in flight.stops">
                <div :key="i" class="ticket__card">
                    <div class="ticket__card__center text-center">
                        <curve-badge width="220" class="text-nowrap mb-4">
                            Flight Number: {{ stop.flightNumber }}
                        </curve-badge>
                        <svgicon class="text-gray-700" name="plane-takeoff" width="40" height="40" />
                        <p class="mt-3 ticket__duration">
                            {{ stop.duration | durationTextEn }}
                        </p>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <div v-for="(dir, i) in ['departure', 'arrival']" :key="i" :class="i === 0 ? 'text-left' : 'text-right'" :dir="i === 0 ? 'ltr' : 'rtl'">
                            <h5 class="mb-3">
                                {{ stop[dir + 'CityName'] }}
                            </h5>
                            <div class="mb-3">
                                <span class="d-inline-block ticket__time">
                                    <b>{{ $dayjs(stop[dir + 'Time']).format('HH:mm') }}</b>
                                    <span dir="ltr">{{ $dayjs(stop[dir + 'Time']).calendar('gregory').locale('en').format('DD MMM').toUpperCase() }}</span>
                                </span>
                                <span dir="rtl" class="fa mx-2">
                                    {{ $dayjs(stop[dir + 'Time']).format('DD MMMM YY') | localizeNumber }}
                                </span>
                            </div>
                            <div>
                                <badge>
                                    {{ stop[dir + 'Airport'].toUpperCase() }}
                                </badge>
                                <span class="mx-2">{{ stop[dir + 'AirportName'] }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex ticket__card__info align-items-center">
                        <img :src="$flight.airlineLogoUrl(stop.airline)" width="60" class="mr-3">
                        <span class=" text-left">
                            <span class="text-gray-700">Flight Number: {{ stop.flightNumber }}</span>
                            <br>
                            <span class="font-weight-medium">{{ stop.airlineName }}</span>
                        </span>
                        <span>
                            <span class="text-gray-700">Airplane</span>
                            <br>
                            <span class="font-weight-medium">{{ stop.aircraft }}</span>
                        </span>
                        <span>
                            <span class="text-gray-700">Cabin</span>
                            <br>
                            <span class="font-weight-medium text-capitalize">{{ flight.flightClass }} - {{ flight.priceClass }}</span>
                        </span>
                        <!--<span>
                            <span class="text-gray-700">Reference</span>
                            <br>
                            <span class="font-weight-medium">{{ flight._id }}</span>
                        </span>-->
                    </div>
                </div>
                <b-alert
                    v-if="i !== flight.stops.length - 1"
                    :key="'a' + i"
                    class="my-4 text-right"
                    dir="rtl"
                    variant="info"
                    show
                >
                    <b>توقف در {{ stop.arrivalCityName }} برای {{ stop.duration | durationText | localizeNumber }}</b>
                </b-alert>
            </template>
        </div>

        <b-row class="mb-5">
            <b-col cols="6">
                <h4 class="mb-4">
                    Baggage
                </h4>

                <div class="ticket__card">
                    <p v-for="flight in item.flights" :key="flight._id" class="mb-2">
                        <span class="d-inline-block align-middle">
                            <svgicon class="text-gray-700 d-block" name="bag" width="30" height="30" />
                        </span>
                        <b class="text-gray-800 align-middle font-weight-medium">{{ flight.baggage }}</b>
                    </p>
                </div>
            </b-col>
            <b-col cols="6">
                <h4 class="mb-4">
                    Ticket Price
                </h4>

                <div class="ticket__card">
                    <div class="mb-2">
                        <span class="text-gray-700">Base price</span>
                        <b class="font-weight-medium float-right">{{ item.flights[0].fare.adult.price | separateNumber }}</b>
                    </div>
                    <div class="mb-3">
                        <span class="text-gray-700">Tax</span>
                        <b class="font-weight-medium float-right">{{ item.flights[0].fare.adult.tax | separateNumber }}</b>
                    </div>
                    <div class="border-top pt-3">
                        <span class="text-gray-700">Total price</span>
                        <b class="font-weight-medium float-right">{{ item.price | separateNumber }}</b>
                    </div>
                </div>
            </b-col>
        </b-row>


        <h4>Terms and Conditions</h4>
        <b-row />

        <footer class="ticket__footer">
            <b>Support: 773242341</b>
        </footer>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'
import CurveBadge from '~/components/ui/CurveBadge'

export default {
    layout: 'empty',

    filters: {
        durationText(x) {
            return Math.floor(x / 60) + ' ساعت ' + (x % 60) + ' دقیقه'
        },
        durationTextEn(x) {
            return Math.floor(x / 60) + 'h ' + (x % 60) + 'm'
        }
    },

    components: {
        CurveBadge,
        Badge
    },

    async asyncData({ req, error }) {
        if (!process.server) {
            window.location.reload()
            return
        }

        if (req.method === 'POST') {
            return {
                ticket: await rawBody(req)
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            return {
                ticket: require('~/assets/json/sample-order-item.json')
            }
        }

        return error({statusCode: 404})
    },

    computed: {
        item() {
            return this.ticket.orderItems[0]
        }
    }
}

function rawBody(req) {
    return new Promise((resolve, reject) => {
        (process.server ? require('raw-body') : (() => {}))(req, {
            length: req.headers['content-length'],
            limit: '2mb'
            // encoding: contentType.parse(req).parameters.charset
        }, (err, string) => err ? reject(err) : resolve(JSON.parse(string.toString())))
    })
}
</script>

<style lang="scss">
/* stylelint-disable */
@page {
    size: letter;
    margin: 30px;
}

.ticket {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 100px;
    min-height: 100vh;
    direction: ltr;
    text-align: left;
    font-size: 1rem;
    max-width: 1200px;

    h4, h5 {
        margin: 0 -10px;
        &::before {
            -webkit-print-color-adjust: exact;
            content: ' ';
            display: inline-block;
            width: 4px;
            height: 20px;
            vertical-align: middle;
            background-color: $secondary;
            margin: 0 10px;
            border-radius: 5px;
        }
    }

    h4 {
        font-size: 1.2em;
    }

    h5 {
        font-size: 1em;

        &::before {
            background-color: map-get($grays, '500');
        }
    }

    &__header {
        display: flex;
        padding: 10px 10px 0;
        align-items: center;
    }

    &__passengers {
        > table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 1em;

            tr {
                border-radius: 5px;
            }

            > thead > tr > th {
                -webkit-print-color-adjust: exact;
                background-color: map-get($grays, '500');
                padding: 5px 15px;
                color: map-get($grays, '800');
                font-weight: 300;
                text-transform: uppercase;

                &:first-child {
                    border-radius: 5px 0 0 5px;
                }
                &:last-child {
                    border-radius: 0 5px 5px 0;
                }
            }

            > tbody > tr > td {
                padding: 15px;
            }

            > tbody > tr {
                margin-top: 20px;
                box-shadow: 0 5px 8px rgba(0,0,0, 0.05);
            }
        }
    }

    &__time {
        -webkit-print-color-adjust: exact;
        border: 1px solid map-get($grays, '500');
        text-align: center;
        border-radius: 4px;

        > span, b {
            display: block;
            padding: 5px;
        }

        > span {
            background-color: map-get($grays, '500');
        }
    }

    &__card {
        border: 1px solid map-get($grays, '500');
        border-radius: 7px;
        padding: 20px;
        page-break-inside: avoid;
        position: relative;
        &__info {
            border: 1px solid map-get($grays, '500');
            border-radius: 5px;
            background-color: #f5f5f5;
            padding: 20px;
            > span {
                padding: 0 20px;
                flex-grow: 1;
                border-left: 1px solid map-get($grays, '500');
            }
        }

        &__center {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &__duration {
        border-radius: 100px;
        border: 1px solid map-get($grays, '600');
    }

    &__footer {
        background-color: white;
        position: fixed;
        bottom: 0;
        left:0;
        right: 0;
        margin-top: 30px;
        padding: 20px;
        border-top:  1px solid map-get($grays, '500');
    }

    .alert {
        -webkit-print-color-adjust: exact;
        page-break-inside: avoid;
    }
}
</style>

<router>
    {
    "name": "ticket"
    }
</router>
