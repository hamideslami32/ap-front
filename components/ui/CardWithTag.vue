<template>
    <div class="card-tag">
        <div class="card-tag__tag" :style="style">
            <span class="text-2 text-weight-500">{{ tag }}</span>
        </div>
        <slot />
    </div>
</template>

<script>

export default {
    name: 'CardWithTag',
    props: {
        tag: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
    computed: {
        style() {
            return {
                'color': this.color,
                'border': '1px solid '+ this.color,
                'border-top-color': '#f5f5f5',
                'border-bottom-color': '#f5f5f5'
            }
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
            top: -1px;
            height: 24px;
            width: 100px;
            background: transparent;
            border: 1px solid transparent;
            border-top-color: #fff;
            border-bottom-color: #fff;
            border-bottom-left-radius: 20px 30px;
            border-bottom-right-radius: 20px 30px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 30px;
        }
    }
</style>