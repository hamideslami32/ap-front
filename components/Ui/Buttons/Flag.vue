<template functional>
  <span class="flag">{{ props.data }}</span>
</template>

<style lang="scss" scoped>
    .flag {
        background: rgba(71, 32, 134, 0.1);
        border: 1px solid $primary;
        color: $primary;
        font-size: 11px;
        padding: 3px 5px;
        border-radius: 100px;
        font-weight: 600;
    }
</style>