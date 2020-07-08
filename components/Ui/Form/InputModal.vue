<template>
    <div class="input-modal">
        <svgicon
            name="search"
            width="15"
            class="input-modal__icon"
            height="15"
            :fill="false"
        />
        <input v-model="localValue" type="text" :placeholder="`شهر یا فرودگاه ${title}`" class="input-modal__input" />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.input-modal {
    padding: 20px 0;
    display: flex;
    position: relative;

    &__input {
        width: 100%;
        height: 50px;
        outline: none;
        border: none;
        padding-right: 50px;
        font-size: 13px;
        line-height: 52px;
        color: $blackColor;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        background: $whiteColor;
    }

    &__icon {
        color: $grayColor;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 17px;
        margin: auto 0;
        z-index: 1;
    }
}
</style>
