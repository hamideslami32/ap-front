<script>
import ABtn from '~/components/ui/buttons/ABtn'

export default {
    functional: true,
    render(h, ctx) {
        const {'wrapper-class': wrapperClass, variant, shadow} = ctx.data.attrs || {}
        return h(ABtn, {
            attrs: {
                icon: 'arrow-left',
                shadow,
                block: true,
                variant,
                wrapperClass: wrapperClass
            },
            on: ctx.listeners
        }, 'جستجو')
    }
}
</script>
