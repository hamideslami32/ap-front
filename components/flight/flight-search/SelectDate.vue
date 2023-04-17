<template>
    <div class="select-date">
        <date-picker />
    </div>
</template>


<script>
import DatePicker from '~/components/date-picker/DateInput.vue'
export default {
    components: {
        DatePicker: DatePicker
    }
}
</script>

<style lang="scss" scoped>
    .select-date {
        margin-bottom: 20px;
    }
</style>
