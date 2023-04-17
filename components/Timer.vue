<template>
    <span class="timer" dir="ltr">
        <span>
            {{ Math.floor(time / 60) | pad }}
        </span>
        :
        <span>
            {{ time % 60 | pad }}
        </span>
    </span>
</template>

<script>
export default {
    name: 'Timer',
    filters: {
        pad(n, width = 2) {
            n = n + ''
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
        }
    },
    props: {
        duration: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            time: this.duration
        }
    },
    mounted() {
        this._interval = setInterval(() => {
            this.time--
            if (this.time <= 0) {
                this.$emit('finish')
                clearInterval(this._interval)
            }
        }, 1000)
    }
}
</script>

<style scoped>
.timer > span {
    min-width: 30px;
    text-align: center;
    display: inline-block;
}
</style>