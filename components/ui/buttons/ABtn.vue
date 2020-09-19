<script>
import {BButton} from 'bootstrap-vue'

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
        }
    },
    render(h, ctx) {
        const { 'wrapper-class': wrapperClass, ...attrs } = ctx.data.attrs || {}
        const { icon, ...btnAttrs } = attrs
        const { shadow, block } = ctx.props

        let $icon
        if (icon) {
            $icon = h('svgicon', {
                props: { name: icon }
            })
        }

        const $btn = h(BButton, {
            class: [ctx.data.class, ctx.data.staticClass],
            attrs: btnAttrs,
            props: {
                block,
                ...btnAttrs
            },
            on: ctx.listeners,
            style: ctx.data.style,
            staticStyle: ctx.data.staticStyle
        }, [
            ...ctx.slots().default,
            ...[
                icon ? h('span', { staticClass: 'btn-icon' }, [$icon]) : []
            ]
        ])

        return shadow ? h('span', {
            staticClass: 'btn-wrapper',
            class: [{ 'btn-block': block }, wrapperClass]
        }, [$btn]) : $btn
    }
}
</script>

<style>
.btn-icon {
    position: absolute;
    left: 8px;
}

.btn-block {
    line-height: 2.2;
}
</style>
