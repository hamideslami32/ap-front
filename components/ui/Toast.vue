<template>
    <div>
        <b-toast id="toast" v-model="showToast" variant="primary" solid>
            This is the content of the toast.
            It is short and to the point.
        </b-toast>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showToast: true
        }
    }
}
</script>

<style lang="scss">
#toast {
    .toast-header {
        button {
            margin-left: 0 !important;
            margin-right: auto;
        }
    }
}
</style>