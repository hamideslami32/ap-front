<template functional>
    <button type="button" class="a-datepicker-switch btn-raw" :class="{ 'a-datepicker-switch--gregory': !props.jalaali }" v-on="listeners">
        <span>تاریخ {{ props.jalaali ? 'میلادی' : 'شمسی' }}</span>
    </button>
</template>

<style lang="scss">
    .a-datepicker-switch {
        position: absolute;
        bottom: 15px;
        left: 50%;
        padding: 12px;
        padding-left: 12px + 8px + 20px;
        transform: translateX(-50%);

        background: $white;
        z-index: 20;
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.08);
        border-radius: 100px;

        &, &::after {
            transition: all ease 200ms;
        }

        &::after {
            content: '';
            width: 20px;
            height: 20px;
            background-color: $info;
            left: 12px;
            position: absolute;
            top: 50%;
            margin-top: -10px;
            border-radius: 50%;
        }

        &--gregory {
            padding-left: 12px;
            padding-right: 12px + 8px + 20px;

            &::after {
                left: calc(100% - 12px - 20px);
            }
        }
    }
</style>
