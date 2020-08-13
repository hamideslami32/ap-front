<template>
    <div class="flight-time">
        <portal to="header-title">
            <span>انتخاب ساعت پرواز</span>
        </portal>
        <div class="flight-time__header d-flex align-items-center py-3 justify-content-between">
            <span class="px-3 text-2 text-gray-700">اکونومی</span>
            <div class="flight-time__header__places">
                <span class="text-gray-800 text-3">تهران</span>
                <svgicon
                    class="pair-icon text-primary"
                    name="arrows-round"
                    width="26"
                    height="26"
                />
                <span class="text-gray-800 text-3">پاریس</span>
            </div>
            <span class="px-3 text-2 text-gray-700">۲ مسافر</span>
        </div>
        <div class="d-flex">
            <flight-time-picker>
                <date-card />
                <date-card />
                <date-card />
                <date-card />
                <date-card />
                <date-card />
            </flight-time-picker>
            <flight-time-picker :is-destination="true" />
        </div>
    </div>
</template>

<script>
import FlightTimePicker from '~/components/flight/available/details/FlightTimePicker'
import DateCard from '~/components/flight/available/details/DateCard'

export default {
    components: {DateCard, FlightTimePicker},
    layout: 'page'
}
</script>

<style lang="scss" scoped>
    .flight-time {
        overflow: hidden;
        height: calc(100vh - 60px);
        &__header {
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

            > span {
                &:first-child {
                    border-left: 1px solid map_get($gray-colors, 'gray-400');
                }

                &:last-child {
                    border-right: 1px solid map_get($gray-colors, 'gray-400');
                }
            }

            &__places {
                display: flex;
                flex-grow: 1;
                justify-content: space-evenly;
                padding: 0 15px;
                align-items: center;

                svg {
                    border: 1px solid map_get($gray-colors, 'gray-400');
                    border-radius: 50%;
                    padding: 3px;
                    box-sizing: content-box;
                }

                span {
                    font-weight: 500;
                }
            }
        }

    }
</style>