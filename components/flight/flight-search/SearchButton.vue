<script>
import FullBtn from '~/components/ui/buttons/FullBtn'

export default {
    functional: true,
    render(h, ctx) {
        return h(FullBtn, {
            props: { icon: 'arrow-left' },
            on: ctx.listeners
        }, 'جستجو')
    }
}
</script>
