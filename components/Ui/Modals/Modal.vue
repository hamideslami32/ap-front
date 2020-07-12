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

<style lang="scss">
.modal {
    .modal-dialog {
        margin: 0;

        .modal-content {
            height: 100%;
            min-height: 100vh;
            border-radius: 0;
            border: none;
            background: $backgroundColor;

            .modal-header {
                position: relative;
                text-align: center;
                justify-content: center;
                padding: 15px;
                border-radius: 0;
                border: 1px solid $modalBorder;

                .modal-title {
                    color: $blackColor;
                    font-weight: 700;
                    font-size: 17px;
                    line-height: 32px;
                }

                .close {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                }
            }

            .modal-body {
                padding: 20px 10px;
            }
        }
    }
}
</style>
