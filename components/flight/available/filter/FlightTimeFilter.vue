<template>
    <panel icon="clock" :title="title">
        <div class="d-flex px-2">
            <div
                v-for="item in flightTime"
                :key="item.value"
                :class="{ 'active': value.includes(item.value) }"
                class="time-item"
                @click="onSelect(item)"
            >
                <svgicon :name="item.icon" width="30" height="30" />
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
                {value: '00:00-06:00', title: 'بامداد', subtitle: '(۰ الی ۶)', icon: 'sunrise'},
                {value: '06:00-12:00', title: 'صبح', subtitle: '(۶ الی ۱۲)', icon: 'sunset'},
                {value: '12:00-18:00', title: 'بعدظهر', subtitle: '(۱۲ الی ۱۸)', icon: 'sun'},
                {value: '18:00-23:59', title: 'شب', subtitle: '(۱۸ الی ۲۴)', icon: 'moon'}
            ]
        }
    },
    methods: {
        onSelect(item) {
            const newValue = [...this.value]
            const index = newValue.indexOf(item.value)
            if (index >= 0) {
                newValue.splice(index, 1)
            } else {
                newValue.push(item.value)
            }
            this.$emit('input', newValue)
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
        background: map-get($grays, '250');
        border: 1px solid map_get($grays, '600');
        border-radius: 10px;
        transition: all ease 250ms;

        svg {
            color: map_get($grays, '700');
        }

        span {
            color: map_get($grays, '800');
            font-size: 0.9em;
        }

        small {
            font-size: 9px;
            color: map_get($grays, '700');
        }

        &:focus, &:active, &.active {
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
