<template functional>
    <a-btn
        icon="arrow-left"
        variant="primary"
        :shadow="true"
        :block="true"
    >
        جست و جو
    </a-btn>
</template>

<script>
import ABtn from '~/components/ui/buttons/ABtn'

export default {
    functional: true,
    render(h, ctx) {
        return h(ABtn, {
            attrs: {
                icon: 'arrow-left',
                shadow: true,
                block: true,
                variant: 'primary',
                wrapperClass: 'mb-2'
            },
            on: ctx.listeners
        }, 'جستجو')
    }
}
</script>
