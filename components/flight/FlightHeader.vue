<template>
    <b-container tag="header" class="flight-header" fluid>
        <div class="flight-header__top mb-4">
            <hamburger-menu class="white my-1" />
            <div class="flight-header__destinations">
                <input-pair @switch="switchDestinations">
                    <input type="text" :value="search.origin ? search.origin.city.fa : ' '">
                    <input type="text" :value="search.destination ? search.destination.city.fa : ' '">
                </input-pair>
            </div>
            <button class="btn-raw btn-back" @click="$router.push('/flights')">
                <svgicon name="arrow-left" width="20" height="20" />
            </button>
        </div>
        <div class="flight-header__bottom">
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
            >
                <input type="text" class="passenger-input" :value="classTypeText">
            </passengers-picker>
            <a-datepicker
                v-model="date"
                class="date-input-pair"
                :jalaali.sync="jalaaliDatepicker"
                :range.sync="isDatepickerRange"
            >
                <template v-slot="{ open, value, on }">
                    <input
                        type="text"
                        :value="value[0] ? value[0].format('DD MMMM') : null"
                        readonly
                        v-on="on"
                    >
                    <input
                        type="text"
                        :value="value[1] ? value[1].format('DD MMMM') : null"
                        data-datepicker="1"
                        readonly
                        v-on="on"
                    >
                </template>
            </a-datepicker>
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
            >
                <input type="text" class="passenger-input" :value="passengersCount + ' مسافر'">
            </passengers-picker>
        </div>
    </b-container>
</template>

<script>
import HamburgerMenu from '~/components/layouts/HamburgerMenu'
import InputPair from '~/components/ui/form/InputPair'
import ADatepicker from '~/components/ui/date-picker/ADatepicker'
import PassengersPicker from '~/components/flight/flight-search/PassengersPicker'
import flightSearchMixin from '~/components/flight/flight-search/flightSearchMixin'
import isEqual from 'lodash/isEqual'

export default {
    components: {
        HamburgerMenu,
        InputPair,
        ADatepicker,
        PassengersPicker
    },

    mixins: [flightSearchMixin],

    watch: {
        '$flight.session': {
            deep: true,
            immediate: true,
            handler(t, f) {
                if (!t || !t.adult || isEqual(t, f)) return
                this.search = {
                    type: {
                        1: 'OW',
                        2: 'RT'
                    }[t.routes.length] || 'MD', // OW, RT, MD,
                    origin: t.routes[0].origin, //object  i, title, value
                    destination: t.routes[0].destination, //object  i, title, value
                    departing: this.$dayjs(t.routes[0].date),
                    ...(t.routes.length === 2 ? {
                        returning: this.$dayjs(t.routes[1].date)
                    }: {}),
                    adult: t.adult,
                    child: t.child,
                    infant: t.infant,
                    classType: t['class'] // business first
                }
            }
        },
        'search': {
            deep: true,
            handler(t, f) {
                if (!f || !f.origin) return
                this.startSearch()
            }
        }
    },

    mounted() {
        [...this.$el.querySelectorAll('input')].forEach(el => {
            el.addEventListener('focus', e => {
                e.preventDefault()
                e.target.blur()
            })
        })
    },

    methods: {
        switchDestinations() {
            const oldDest = this.search.destination
            this.search.destination = this.search.origin
            this.search.origin = oldDest
        }
    }
}
</script>

<style lang="scss" scoped>
    .flight-header {
        padding: 15px 10px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        background: linear-gradient(90deg, $primary 0%, #6d4ea3 100%);
        color: $white;

        /deep/ input {
            background-clip: border-box !important;
            appearance: none;
            outline: none;
            display: inline-block;
            box-shadow: none;
            font-size: 0.75rem;
            color: $white;
            border: 1px solid rgba($white, 0.1);
            background-color: #6d4ea3;
            text-align: center;
            padding: 5px 15px;
            width: 100%;
        }

        &__bottom {
            display: flex;

            > div:first-child {
                /deep/ input {
                    border-radius: 5px 10px 10px 5px;
                }
            }

            > div:last-child {
                /deep/ input {
                    border-radius: 10px 5px 5px 10px;
                }
            }

            /deep/ .date-input-pair {
                margin: 0 10px;
                display: flex;
                border: 1px solid rgba(255, 255, 255, 0.1);
                background-color: #6d4ea3;
                box-sizing: border-box;
                box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
                border-radius: 5px;
                overflow: hidden;

                input {
                    height: 100%;
                    border: 0;
                    border-radius: 0;
                    background-color: transparent;
                }

                &::before {
                    content: '';
                    width: 1px;
                    position: absolute;
                    top: 7px;
                    left: 50%;
                    bottom: 7px;
                    background: rgba(255, 255, 255, 0.15);
                }

            }
        }


        &__destinations {
            input {
                background: transparent;
                border: none;
                height: 30px;
                color: $white;
                font-size: 17px;
                text-align: left;
                padding: 10px 35px;

                &:last-child {
                    text-align: right;
                }
            }

            /deep/ .input-pair__switch {
                z-index: 4;
                background: transparent;
                border: none;

                &:before {
                    display: none;
                }
            }
        }

        /deep/ .hamburger-menu, .btn-back {
            position: absolute;
            right: 0;
            top: 0;
            padding: 18px 15px;
        }
        .btn-back {
            left: 0;
            right: auto;
        }
    }
</style>