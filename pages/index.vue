<template>
    <div class="home">
        <app-navs />
        <nuxt-child />
    </div>
</template>

<script>
import AppNavs from '~/components/navs/Navs'

export default {
    components: {
        AppNavs
    },
    layout: 'Mobile'
}
</script>
