<template>
    <div class="destination-picker">
        <div class="input-holder">
            <InputModal :name="name" :title="title" />
        </div>
        <div class="destination-picker__result">
            <h3 v-if="mode === 'suggestion'" class="destination-picker__result--title">
                شهرهای پرتردد
            </h3>
            <Item v-for="x in 7" :key="x" :mode="mode" />
        </div>
    </div>
</template>

<script>
import InputModal from '~/components/Ui/Form/InputModal'
import Item from '~/components/Ui/Suggestions/Item'

export default {
    name: 'Destination',
    components: {InputModal, Item},
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            mode: 'suggestion'
        }
    }
}
</script>

<style lang="scss" scoped>
.destination-picker {
    &__result {
        &--title {
            font-size: 15px;
            line-height: 30px;
            color: $grayColor;
            text-align: right;
        }
    }
}
</style>
