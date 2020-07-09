<template>
    <div class="input-detail">
        <flag v-if="!left" class="mr-1">
            {{ code }}
        </flag>
        <span class="input-detail__name">
            {{ name }}
        </span>
        <flag v-if="left" class="ml-1">
            {{ code }}
        </flag>
    </div>
</template>

<script>
import Flag from '~/components/Ui/Buttons/Badge'

export default {
    components: {
        Flag
    },
    props: {
        code: {
            type: String,
            default: null
        },
        name: {
            type: String,
            required: true
        },
        left: {
            type: Boolean,
            required: true
        }
    }
}
</script>


<style lang="scss" scoped>
.input-detail {

    &__name {
        font-size: 11px;
        line-height: 20px;
        color: $darkGrayColor;
    }
}
</style>
