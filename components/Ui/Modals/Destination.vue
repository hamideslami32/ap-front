<template>
    <div class="destination-picker">
        <div class="input-holder">
            <InputModal :name="name" :title="title" />
        </div>
    </div>
</template>

<script>
import InputModal from '~/components/Ui/Form/InputModal'

export default {
    name: 'Destination',
    components: {InputModal},
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
