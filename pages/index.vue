<template>
    <div class="home">
        <app-navs />
        <nuxt-child />
    </div>
</template>

<script>
import Navs from '~/components/Navs/Navs.vue'
export default {
    components: {
        appNavs: Navs
    },
    layout: 'MobileLayout'
}
</script>