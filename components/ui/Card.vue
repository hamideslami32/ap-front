<template>
    <div class="custom-card">
        <div class="custom-card__info">
            <slot name="header" />
        </div>
        <div class="custom-card__actions">
            <slot name="footer" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Card'
}
</script>

<style lang="scss" scoped>
    .custom-card {
        background: map_get($grays, '200');
        border-radius: 10px;
        border: 1px solid map_get($grays, '800');

        &__info {
            background: $white;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
            border-radius: 9px 9px 10px 10px;
            padding: 20px 0;
            font-size: 0.875rem;
            color: map_get($grays, '700');
        }

        &__actions {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 20px 0 40px 0;

            &__btn {
                display: flex;
                flex-direction: column;
                align-items: center;

                span {
                    font-weight: 500;
                }
            }
        }
    }
</style>
