<template>
    <div class="curve-badge">
        <svg
            id="Layer_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            :width="width"
            height="25px"
            x="0px"
            y="0px"
            :class="{ 'rotate': bottom }"
            viewBox="0 0 110 25"
            style="enable-background: new 0 0 110 25;"
            xml:space="preserve"
        >
            <g>
                <path
                    class="st0"
                    d="M19.2,6.7L23.7,18c1.4,3.7,4.9,6,8.8,6h45c3.9,0,7.4-2.4,8.8-6l4.4-11.3c1.6-4,5.4-6.7,9.8-6.7H9.5
                C13.8,0,17.6,2.6,19.2,6.7z"
                    fill="#f5f5f5"
                />
                <path
                    class="st1"
                    d="M100.5,0L100.5,0c-4.3,0-8.2,2.6-9.8,6.7L86.3,18c-1.4,3.7-4.9,6-8.8,6h-45c-3.9,0-7.4-2.4-8.8-6L19.2,6.7
                C17.6,2.6,13.8,0,9.5,0h0H0v1h9.5c3.9,0,7.4,2.4,8.8,6l4.4,11.3c1.6,4,5.4,6.7,9.8,6.7h0h45h0c4.3,0,8.2-2.6,9.8-6.7L91.7,7
                c1.4-3.7,4.9-6,8.8-6h9.5V0H100.5z"
                    fill="#cccccc"
                />
            </g>
        </svg>
        
        <span :style="`color: ${color}`">
            <slot />
        </span>
    </div>
</template>

<script>
export default {
    name: 'CurveBadge',
    props: {
        color: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '110px'
        },
        bottom: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .curve-badge {
        position: relative;

        span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-size: 0.7em;
        }

        .rotate {
            transform: rotate(180deg);
            bottom: 2px;
        }
    }
</style>