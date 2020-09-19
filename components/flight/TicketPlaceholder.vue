<template functional>
    <div class="ticket-place-holder" />
</template>

<script>
export default {
    name: 'TicketPlaceholder',
    functional: true
}
</script>

<style lang="scss" scoped>
    .ticket-place-holder {
        height: 110px;
        width: 100%;
        border-radius: 10px;
        animation: flash infinite 800ms linear;
        background-color: #e0e0e0;

    }
</style>