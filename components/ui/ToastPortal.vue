<template>
    <div class="toast-portal">
        <portal-target name="toast" />
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
        margin: 10px;
    }
</style>