<template>
    <div class="passenger">
        <div class="passenger__type">
            <span class="passenger__type--name">
                {{ name }}
            </span>
            <span class="passenger__type--info">
                {{ tip }}
            </span>
        </div>
        <div class="passenger__count">
            <span class="passenger__count--plus" @click="$emit('increase')">+</span>
            <span class="passenger__count--count">{{ count }}</span>
            <span class="passenger__count--mines" @click="$emit('decrease')">-</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Passenger',
    props: {
        name: {
            type: String,
            required: true
        },
        tip: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin circle {
    width: 30px;
    height: 30px;
    border: 1px solid $primary;
    border-radius: 50%;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: $primary;
    transition: all 250ms ease;

    &:hover, &:active {
        background: $primary;
        color: $white;
        transition: all 300ms ease;
    }
}

.passenger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;


    &__type {
        display: flex;
        align-items: center;

        &--name {
            color: $black;
            font-size: 1rem;
        }

        &--info {
            margin-right: 5px;
            color: $darkGrayColor;
            font-size: 13px;
        }
    }


    &__count {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &--plus {
            @include circle;
        }

        &--count {
            margin: 0 10px;
            font-size: 1rem;
            color: $black;
        }

        &--mines {
            @include circle;
        }
    }
}
</style>