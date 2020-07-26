<template>
    <div class="destination-input" @click="inputFocus">
        <label v-if="title" class="destination-input__title">
            {{ title }}
        </label>
        <input
            ref="input"
            :placeHolder="placeHolder"
            :value="value ? value.city.fa.length > 1 ? value.city.fa : value.city.en : ''"
            class="destination-input__input"
            @focus="inputFocus"
        >
        <span v-if="value" class="destination-input__detail text-ellipsis py-1">
            <badge>
                {{ value.id.slice(0, 3) }}
            </badge>
            <span>
                {{ subtitle }}
            </span>
        </span>
    </div>
</template>

<script>
import Badge from '~/components/ui/Badge'

export default {
    components: {Badge},
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            default: null
        },
        placeHolder: {
            type: String,
            default: ''
        }
    },
    computed: {
        subtitle() {
            const { airport, city } = this.value
            const translate = v => v.fa || v.en
            if (airport) {
                return translate(airport)
            }
            if (city) {
                return translate(city)
            }
            return 'نامشخص'
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
.destination-input {
    padding: 15px;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    min-width: 49%;
    box-sizing: border-box;
    justify-content: center;
    font-size: 1em;
    overflow: hidden;

    &__title {
        font-size: inherit;
        color: $grayColor;
        line-height: 22px;
        margin-bottom: 5px;
        width: 100%;
    }

    &__input {
        outline: none;
        border: none;
        background: transparent;
        font-weight: 600;
        font-size: 17px;
        line-height: 30px;
        height: 30px;
        color: $black;
        margin-bottom: 5px;
        width: 100%;
    }

    &--active {
        font-size: 0.8em;
    }

    &__detail {
        font-size: 11px;
    }

    /deep/ .badge {
        margin-top: -2px;
    }
}
</style>
