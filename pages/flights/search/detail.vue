<template>
    <div class="flight-time">
        <!--        <portal to="header-title">-->
        <!--            <span>انتخاب ساعت پرواز</span>-->
        <!--        </portal>-->
        <div class="flight-time__header d-flex align-items-center py-3 justify-content-between">
            <span class="pr-2 text-2 text-gray-700">اکونومی</span>
            <div class="flight-time__header__places">
                <span>تهران</span>
                <svgicon
                    class="pair-icon text-primary"
                    name="arrows-round"
                    width="26"
                    height="26"
                />
                <span>پاریس</span>
            </div>
            <span class="pl-2 text-2 text-gray-700">۲ مسافر</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    layout: 'page'
}
</script>

<style lang="scss" scoped>
    .flight-time {
        &__header {
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);

            &__places {
                display: flex;
                flex-grow: 1;
                justify-content: space-evenly;
                padding: 0 15px;
                align-items: center;
                border-left: 1px solid map_get($gray-colors, 'gray-400');
                border-right: 1px solid map_get($gray-colors, 'gray-400');
                margin: 0 20px;
                svg {
                    border: 1px solid map_get($gray-colors, 'gray-400');
                    border-radius: 50%;
                    padding: 3px;
                    box-sizing: content-box;
                }
            }
        }

    }
</style>