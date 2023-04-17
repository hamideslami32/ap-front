<template>
    <div class="header">
        <portal-target name="right-header" class="text-right">
            <span />
        </portal-target>
        <portal-target name="header" class="text-center">
            <span />
        </portal-target>
        <portal-target name="left-header" class="text-left">
            <a class="text-gray-900" href="javascript:void(0)" @click="$router.back()">
                <svgicon name="arrow-left" width="20" height="20" />
            </a>
        </portal-target>
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

        > div {
            flex: 2;
            &:last-child , &:first-child {
                flex: 1;
            }
        }

        a:focus, a:hover, a:active {
            color: map_get($grays, '900');
        }
    }
</style>
