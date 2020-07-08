<template>
    <div class="destination-picker">
        <div class="input-holder">
            <InputModal v-model="anotherName" :name="name" :title="title"/>
        </div>
        <div class="destination-picker__result">
            <span>or: {{ origin }} des: {{ destination }}</span>
            <h3 v-if="mode === 'suggestion'" class="destination-picker__result--title">
                شهرهای پرتردد
            </h3>
            <Item v-for="x in 7" :key="x" :mode="mode" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'Destination',
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
            mode: 'suggestion',
            origin: '',
            destination: ''
        }
    },
    computed: {
        anotherName: {
            get() {
                return this[this.name]
            },
            set(value) {
                this[this.name] = value
                this.fetchResult(value)
            }
        }
    },
    methods: {
        fetchResult: _.debounce((value) => {

        }, 1000)
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
