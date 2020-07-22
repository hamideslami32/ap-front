<template>
    <div class="flight-card">
        <span class="price">35,500,000</span>
        <span class="price__text">برای هر نفر (تومان)</span>
        <div class="my-3">
            <slot />
        </div>
        <div class="flight-card__footer">
            <span class="alternative">۲۵ پرواز مشابه</span>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    .flight-card{
        background: #f5f5f5;
        border-radius: 10px;
        border: 1px solid #dddddd;
        margin: 20px auto;
        padding: 15px 10px 10px 10px;
        font-weight: 600;

        .price{
            font-size: 1.2em;
            color: $info;
            &__text{
                font-size: 0.6em;
                color: #888888;
            }
        }
    }
</style>