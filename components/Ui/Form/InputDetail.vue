<template>
  <div class="input-detail" :class="type">
    <flag :data="data.code" />
    <span class="input-detail__name">{{ data.name }}</span>
  </div>
</template>

<script>
import Flag from '~/components/Ui/Buttons/Flag'

export default {
    components: {
        Flag
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }
}
</script>


<style lang="scss" scoped>
.input-detail {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.destination {
        flex-direction: row-reverse;

        .flag {
            margin-right: 5px;
        }
    }

    &.origin {
        .flag {
            margin-left: 5px;
        }
    }

    &__name {
        font-size: 11px;
        line-height: 20px;
        color: $darkGrayColor;
    }
}
</style>
