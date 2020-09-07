<template>
    <div class="toast-portal">
        <portal-target name="toast" multiple />
    </div>
</template>

<script>
import {PortalTarget} from 'portal-vue'

export default {
    components: {
        PortalTarget
    }
}
</script>

<style lang="scss">
    .toast-portal {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        color: $white;
        font-size: 0.625rem;
        padding: 0 10px 10px;
        background: linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, rgba(245, 245, 245, 0.5) 28.13%, #f5f5f5 82.81%);
    }
</style>
