<template>
    <div class="input-holder" @click="$refs.input.focus()">
        <label v-if="title" class="input-holder__title">
            {{ title }}
        </label>
        <input
            ref="input"
            value="آمستردام"
            class="input-holder__input"
            @focus="inputFocus"
        >
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        inputFocus() {
            this.$refs.input.blur()
            this.$emit('focus', this.data)
        }
    }
}
</script>


<style lang="scss" scoped>
@mixin destinationInput {
    margin-left: 5px;
    text-align: right;
    display: flex;
    flex-direction: column;
    min-width: 49%;
    background: $backgroundColor;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
}

.input-holder {
    padding: 20px 15px 20px 10px;

    &.origin {
        @include destinationInput;

        border-radius: 0 5px 5px 0;
        align-items: flex-start;
    }

    &.destination {
        @include destinationInput;

        border-radius: 5px 0 0 5px;
        align-items: flex-end;

        input {
            text-align: left;
        }
    }

    &__title {
        font-size: 13px;
        color: $grayColor;
        line-height: 22px;
        margin-bottom: 5px;
    }

    &__input {
        outline: none;
        border: none;
        background: transparent;
        font-weight: 600;
        font-size: 17px;
        line-height: 30px;
        height: 30px;
        color: $blackColor;
        margin-bottom: 5px;
        width: 90%;
    }
}
</style>
