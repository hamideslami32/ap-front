<template>
    <div class="input-pair">
        <span class="input-pair__switch">
            <button @click.prevent="switchInputs">
                <svgicon name="arrows-round" width="100%" height="100%" />
            </button>
        </span>
        <slot />
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputsData: [
                {
                    title: 'مبدا',
                    type: 'origin',
                    airport: {
                        code: 'AMS',
                        name: 'فرودگاه سبیها'
                    }
                },
                {
                    title: 'مقصد',
                    type: 'destination',
                    airport: {
                        code: 'AMS',
                        name: 'فرودگاه سبیها'
                    }
                }
            ]
        }
    },
    methods: {
        clickInput(type) {
            this.$emit('focus', type)
        },
        async switchInputs() {
            const vms = this.$children.slice(1)
            const [v0, v1] = vms.map(el => el.value)
            vms[0].$emit('input', v1)
            vms[1].$emit('input', v0)

            this.$el.classList.add('input-pair--switch')
            const onAnimationEnd = function() {
                this.classList.remove('input-pair--switch')
                this.removeEventListener('animationend')
            }
            this.$el.addEventListener('animationend', onAnimationEnd)
        }
    }
}
</script>

<style lang="scss" scoped>
    @keyframes swipe-right {
        50% {
            transform: translateX(100%);
        }
    }

    @keyframes swipe-left {
        50% {
            transform: translateX(-100%);
        }
    }

    .input-pair {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        $size: 40px;
        $boder-color: #ddd;
        &__switch {

            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            padding: 4px;
            background: $body-bg;
            border-radius: 50%;
            border: 1px solid $borderColor;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: $body-bg;
                height: 50px;
                width: 5px;
                margin-left: -1px;
            }

            > button {
                background: $black;
                padding: 0;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                border: 0;
                outline: 0;
                color: $white;
                position: relative;
                z-index: 3;
            }
        }

        /deep/ > div {
            position: relative;
            margin-left: 3px;
            border-radius: 0 3px 3px 0;
            flex: 1;

            /deep/ .badge {
                float: right;
                margin-left: 5px;
                min-width: 40px;
            }

            &:last-child {
                text-align: left;
                margin-left: 0;
                margin-right: 3px;
                border-radius: 3px 0 0 3px;

                /deep/ .badge {
                    margin-right: 5px;
                    margin-left: 0;
                    float: left;
                }
            }
        }
    }

    .input-pair--switch /deep/ {
        > div .destination-input__input {
            animation: swipe-left 250ms 1 linear;
        }
        > div:last-child .destination-input__input {
            animation: swipe-right 250ms 1 linear;
        }
    }
</style>
