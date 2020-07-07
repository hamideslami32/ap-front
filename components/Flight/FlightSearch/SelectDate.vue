<template>
    <div class="select-date">
        <app-date-picker />
    </div>
</template>


<script>
import DatePicker from '~/components/DatePicker/DatePicker.vue'
export default {
    components: {
        appDatePicker: DatePicker
    }
}
</script>

<style lang="scss" scoped>
    .select-date {
        margin-bottom: 20px;
    }
</style>