<template>
    <b-container tag="header" class="flight-header" fluid>
        <div class="flight-header__top mb-4">
            <hamburger-menu class="white my-1" @click="$root.$emit('sidebar', true)" />
            <div class="flight-header__destinations">
                <input-pair @switch="switchDestinations">
                    <span class="ml-4 pl-2">{{ search.origin ? $translate(search.origin.city) : null }}</span>
                    <span class="mr-4 pr-2">{{ search.destination ? $translate(search.destination.city) : null }}</span>
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
                @input="updateSearch"
            >
                <span class="flight-header__input">{{ classTypeText }}</span>
            </passengers-picker>
            <a-datepicker
                v-model="date"
                class="date-input-pair"
                :class="{ 'date-input-pair--roundtrip': search.type === 'RT' }"
                :jalaali.sync="jalaaliDatepicker"
                :range.sync="isDatepickerRange"
                @input="updateSearch"
            >
                <template v-slot="{ open, value }">
                    <span
                        class="flight-header__input"
                        @click="open(0)"
                    >{{ value[0] ? value[0].format('DD MMMM') : null }}</span>
                    <span
                        v-if="search.type === 'RT'"
                        class="flight-header__input"
                        data-datepicker="1"
                        @click="open(1)"
                    >{{ value[1] ? value[1].format('DD MMMM') : null }}</span>
                </template>
            </a-datepicker>
            <passengers-picker
                v-model="passengers"
                :flight-class.sync="search.classType"
                :is-international="isInternational"
                @input="updateSearch"
            >
                <span class="flight-header__input">{{ passengersCount + ' مسافر' }}</span>
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

export default {
    components: {
        HamburgerMenu,
        InputPair,
        ADatepicker,
        PassengersPicker
    },

    mixins: [flightSearchMixin],

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
            this.updateSearch()
        },
        updateSearch() {
            this.startSearch(true)
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
        z-index: 110;
        background: linear-gradient(90deg, $primary 0%, $lightPrimary 100%);
        color: $white;

        @include media-breakpoint-up(md) {
            position: absolute;
        }

        /deep/ .flight-header__input {
            background-clip: border-box !important;
            appearance: none;
            outline: none;
            display: inline-block;
            box-shadow: none;
            font-size: 0.75rem;
            color: $white;
            border: 1px solid rgba($white, 0.1);
            background-color: $lightPrimary;
            text-align: center;
            padding: 5px 15px;
            width: 100%;
        }

        &__bottom {
            display: flex;
            justify-content: center;

            > div {
                flex-grow: 1;
            }

            > div:first-child {
                /deep/ .flight-header__input {
                    border-radius: 5px 10px 10px 5px;
                }
            }

            > div:last-child {
                /deep/ .flight-header__input {
                    border-radius: 10px 5px 5px 10px;
                }
            }

            /deep/ .date-input-pair {
                margin: 0 10px;
                display: flex;
                border: 1px solid rgba(255, 255, 255, 0.1);
                background-color: $lightPrimary;
                box-sizing: border-box;
                box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
                border-radius: 5px;
                overflow: hidden;

                > span {
                    height: 100%;
                    border: 0;
                    border-radius: 0;
                    background-color: transparent;
                }

                &--roundtrip {
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
        }


        &__destinations {

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
