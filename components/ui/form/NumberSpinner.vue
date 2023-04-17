<template>
    <span class="number-spinner">
        <button class="btn-raw" @click="$emit('input', value + 1)">
            <span>+</span>
        </button>
        <span>{{ value }}</span>
        <button class="btn-raw" @click="$emit('input', value - 1)">
            <span>-</span>
        </button>
    </span>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .number-spinner {
        background: map_get($grays, '500');
        border: 1px solid $borderColor;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 0;
        > button {
            font-size: 1.1rem;
            padding: 10px;

            > span {
                display: block;
                border-radius: 50%;
                font-family: sans-serif;
                width: 20px;
                height: 20px;
                line-height: 20px;
                color: map_get($grays, '800');
                transition: all 150ms ease;
                background-color: $white;
                box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
            }

            &:active > span {
                background-color: $primary;
                color: $white;
            }
        }

        > span {
            display: inline-block;
            text-align: center;
            min-width: 30px;
        }
    }
</style>
