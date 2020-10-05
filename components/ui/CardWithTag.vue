<template>
    <div class="card-tag">
        <div class="card-tag__tag">
            <curve-badge :color="color">
                {{ tag }}
            </curve-badge>
        </div>
        <slot />
    </div>
</template>

<script>
import CurveBadge from '~/components/ui/CurveBadge'

export default {
    name: 'CardWithTag',
    components: {
        CurveBadge
    },
    props: {
        tag: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .card-tag {
        min-height: 270px;
        border: 1px solid $borderColor;
        border-radius: $borderRadius10;
        background: $white;
        position: relative;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
        &__tag {
            position: absolute;
            height: 24px;
            width: 100px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 30px;
        }
    }
</style>