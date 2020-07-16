<template>
    <span class="number-spinner d-inline-block">
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
        > button {
            width: 30px;
            height: 30px;
            border: 1px solid $primary;
            border-radius: 50%;
            font-family: sans-serif;
            display: inline-block;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            color: $primary;
            transition: all 250ms ease;
            background-color: transparent;
            outline: none !important;
            appearance: none;
            padding: 0;
            &:active {
                background: $primary;
                color: $white;
                transition: all 300ms ease;
            }
        }

        > span {
            display: inline-block;
            text-align: center;
            min-width: 30px;
        }
    }
</style>
