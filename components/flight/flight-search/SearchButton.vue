<script>
import FullBtn from '~/components/ui/buttons/FullBtn'

export default {
    functional: true,
    render(h, ctx) {
        return h(FullBtn, {
            props: { icon: 'arrow-left' },
            class: 'mb-2',
            on: ctx.listeners
        }, 'جستجو')
    }
}
</script>
