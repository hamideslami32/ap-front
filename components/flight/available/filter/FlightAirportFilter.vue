<template>
    <panel title="انتخاب فرودگاه">
        <group-checkbox :value="value" :options="airports" @input="$emit('input', $event)" />
    </panel>
</template>

<script>
export default {
    name: 'FlightAirportFilter',

    data() {
        return {
            airports: [
                {value: 'CDG', title: 'شارل دوگل', code: true},
                {value: 'ORY', title: 'اورلی', code: true},
                {value: 'BVA', title: 'باووایس', code: true}
            ]
        }
    }
}
</script>

<style scoped>

</style>
