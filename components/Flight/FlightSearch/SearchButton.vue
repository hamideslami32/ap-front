<script>
import FullBtn from '~/components/Ui/Buttons/FullBtn'

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
