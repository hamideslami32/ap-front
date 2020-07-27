<template>
    <span class="number-spinner">
        <button @click="$emit('input', value + 1)">
            +
        </button>
        <span>{{ value }}</span>
        <button @click="$emit('input', value - 1)">
            -
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
        background: map_get($gray-colors, 'gray-500');
        border: 1px solid $borderColor;
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 10px;
        > button {
            width: 20px;
            height: 20px;
            border: none;
            border-radius: 50%;
            font-family: sans-serif;
            display: inline-block;
            align-items: center;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
            justify-content: center;
            font-size: 1.1rem;
            color: map_get($gray-colors, 'gray-800');
            transition: all 250ms ease;
            background-color: $white;
            outline: none !important;
            appearance: none;
            line-height: 20px;
            padding: 0;
        }

        > span {
            display: inline-block;
            text-align: center;
            min-width: 30px;
        }
    }
</style>
