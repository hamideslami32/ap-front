<script>
import {BButton, BOverlay} from 'bootstrap-vue'

export default {
    functional: true,
    props: {
        shadow: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        wrapperClass: {
            type: [String, Array, Object],
            default: null

        }
    },
    render(h, ctx) {
        const {...attrs} = ctx.data.attrs || {}
        const {icon, variant, ...btnAttrs} = attrs
        const {shadow, block, loading, wrapperClass} = ctx.props

        let $icon
        if (icon) {
            $icon = h('svgicon', {
                props: {name: icon}
            })
        }

        const $btn = h(BButton, {
            class: [ctx.data.class, ctx.data.staticClass],
            attrs: btnAttrs,
            props: {
                block,
                ...btnAttrs,
                variant,
                disabled: loading || btnAttrs.disabled
            },
            on: ctx.listeners,
            style: ctx.data.style,
            staticStyle: ctx.data.staticStyle
        }, [
            ...ctx.slots().default,
            ...[
                icon ? h('span', {staticClass: 'btn-icon'}, [$icon]) : []
            ]
        ])

        const element = shadow ? h('span', {
            staticClass: 'btn-wrapper',
            class: {'btn-block': block}
        }, [$btn]) : $btn

        return h(BOverlay, {
            props: {
                show: loading,
                spinnerSmall: true,
                spinnerVariant: variant
            },
            class: ['btn-overlay', wrapperClass]
        }, [element])
    }
}
</script>

<style lang="scss">
    .btn-icon {
        position: absolute;
        left: 5px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        transform: translateY(-50%);
    }

    .btn-block {
        line-height: 2.2;
    }

    .btn-overlay .b-overlay > div {
        &:first-child {
            border-radius: 10px;
        }

        &:last-child {
            display: flex;
        }
    }
</style>
