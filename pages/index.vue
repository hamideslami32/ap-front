<template>
    <div class="home">
        <app-navs />
        <nuxt-child />
    </div>
</template>

<script>
import Navs from '~/components/navs/Navs.vue'
export default {
    components: {
        appNavs: Navs
    },
    layout: 'Mobile'
}
</script>
