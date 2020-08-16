<template>
    <div class="header">
        <span>icon</span>
        <portal-target name="header">
            <span />
        </portal-target>
        <a class="text-gray-900" href="javascript:void(0)" @click="$router.back()">
            <svgicon name="arrow-left" width="20" height="20" />
        </a>
    </div>
</template>

<script>
import {PortalTarget} from 'portal-vue'

export default {
    name: 'PageHeader',
    components: {
        PortalTarget

    }
}
</script>

<style lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: $body-bg;
        height: 60px;
        padding: 15px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        color: map_get($grays, '900');
        font-weight: 600;
    }
</style>
