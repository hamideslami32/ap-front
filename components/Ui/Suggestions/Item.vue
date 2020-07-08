<template>
    <div class="item" :class="mode">
        <div class="item__detail">
            <Flag v-if="mode === 'suggestion'" :class-name="className" data="IST" />
            <p class="item__detail--name">
                {{ name }}
                <span v-if="mode === 'suggestion'" class="item__detail--name__detail">(تمام فرودگاه ها)</span>
            </p>
        </div>
        <div class="item__badge">
            <span class="item__badge--name">Turkey</span>
            <svgicon name="turkey" width="30" class="item__badge--icon" height="30" />
        </div>
    </div>
</template>

<script>
import Flag from '~/components/Ui/Buttons/Slug.vue'

export default {
    name: 'Item',
    components: {
        Flag
    },
    props: {
        mode: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            name: 'استانبول',
            className: 'suggestion-item'
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 0;

    &:not(:last-child) {
        border-bottom: 1px solid $modalBorder;
    }

    &__detail {
        display: flex;
        align-items: center;

        &--name {
            margin-bottom: 0;
            font-weight: 500;
            font-size: 15px;
            line-height: 20px;
            color: $blackColor;

            &__detail {
                font-size: 11px;
                line-height: 20px;
                color: $grayColor;
            }
        }
    }

    &__badge {
        &--name {
            font-weight: 600;
            font-size: 13px;
            line-height: 30px;
            color: $darkGrayColor;
        }

        &--icon {
            margin-right: 10px;
        }
    }
}
</style>