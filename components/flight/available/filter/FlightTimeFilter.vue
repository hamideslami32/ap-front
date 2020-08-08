<template>
    <panel :title="title">
        <div class="d-flex px-2">
            <div
                v-for="item in flightTime"
                :key="item.value.join('-')"
                :class="{ 'active': item.value && value && item.value.join('-') === value.join('-') }"
                class="time-item"
                @click="$emit('input', item.value)"
            >
                <svgicon name="user" width="30" height="30" />
                <span>{{ item.title }}</span>
                <small>{{ item.subtitle }}</small>
            </div>
        </div>
    </panel>
</template>

<script>
import Panel from '~/components/ui/Panel'

export default {
    name: 'FlightTimeFilter',
    components: {Panel},
    props: {
        value: {
            type: Array,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            flightTime: [
                {value: ['06:00', '12:00'], title: 'صبح', subtitle: '(۶ الی ۱۲)', icon: 'user'},
                {value: ['00:00', '06:00'], title: 'بامداد', subtitle: '(۰ الی ۶)', icon: 'user'},
                {value: ['12:00', '18:00'], title: 'بعدظهر', subtitle: '(۱۲ الی ۱۸)', icon: 'user'},
                {value: ['18:00', '23:59'], title: 'شب', subtitle: '(۱۸ الی ۲۴)', icon: 'user'}
            ]
        }
    }
}
</script>

<style lang="scss">
.time-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: auto 1;
    margin: 0 5px;
    padding: 15px 10px 10px 10px;
    background: #f9f9f9;
    border: 1px solid map_get($gray-colors, 'gray-400');
    border-radius: 10px;
    transition: all ease 250ms;

    svg {
        color: map_get($gray-colors, 'gray-700');
    }

    span {
        color: map_get($gray-colors, 'gray-800');
        font-size: 0.9em;
    }

    small {
        font-size: 9px;
        color: map_get($gray-colors, 'gray-700');
    }

    &:focus, &:active , &.active {
        background: #e7def7;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
        border-color: $primary;

        span, svg, small {
            color: $primary;
        }

        span {
            font-weight: 500;
        }
    }
}
</style>
