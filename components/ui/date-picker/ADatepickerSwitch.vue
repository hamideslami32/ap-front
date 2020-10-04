<template functional>
    <a-btn
        variant="light"
        type="button"
        class="btn a-datepicker-switch btn-raw"
        :class="{ 'a-datepicker-switch--gregory': !props.jalaali }"
        shadow
        v-on="listeners"
    >
        <span>تاریخ {{ props.jalaali ? 'میلادی' : 'شمسی' }}</span>
    </a-btn>
</template>

<style lang="scss">
.a-datepicker .btn {
    padding: 8px;
}
.a-datepicker-switch {
    position: relative;
    padding-left: 12px + 5px;
    background: $white;
    z-index: 20;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.08);

    &, &::after {
        transition: all ease 200ms;
    }

    &::after {
        content: '';
        width: 6px;
        height: 6px;
        background-color: $secondary;
        left: 12px;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        border-radius: 50%;
    }

    &--gregory {
        padding-left: 12px;
        padding-right: 12px + 5px;

        &::after {
            left: calc(100% - 12px - 5px);
        }
    }
}
</style>
