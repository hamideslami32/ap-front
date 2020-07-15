<template>
    <b-modal id="modal" :visible="value" hide-footer v-on="$listeners">
        <template v-slot:modal-title>
            انتخاب {{ title }}
        </template>
        <slot />
    </b-modal>
</template>

<script>
export default {
    model: {
        event: 'change'
    },
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        openModal() {
            this.$bvModal.show('modal')
        }
    }
}
</script>
