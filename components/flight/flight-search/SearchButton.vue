<script>
import ABtn from '~/components/ui/buttons/ABtn'

export default {
    functional: true,
    render(h, ctx) {
        const {'wrapper-class': wrapperClass} = ctx.data.attrs || {}
        return h(ABtn, {
            attrs: {
                icon: 'arrow-left',
                shadow: true,
                block: true,
                variant: 'primary',
                wrapperClass: wrapperClass
            },
            on: ctx.listeners
        }, 'جستجو')
    }
}
</script>
