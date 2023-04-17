<template>
    <div>{{ json }}</div>
</template>

<script>
export default {
    async fetch() {
        this.json = await this.$axios.$get('/')
    },
    data() {
        return {
            json: null
        }
    }
}
</script>
