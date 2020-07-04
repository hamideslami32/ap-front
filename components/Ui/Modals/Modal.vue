<template>
  <b-modal id="modal" hide-footer>
    <template v-slot:modal-title>
      {{ title }}
    </template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button class="mt-3" block @click="closeModal">
      Close Me
    </b-button>
  </b-modal>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        openModal() {
            this.$bvModal.show('modal')
        },
        closeModal() {
            this.$bvModal.hide('modal')
        }
    }
}
</script> 

<style lang="scss">
.modal {
  .modal-dialog {
    margin: 0;

    .modal-content {
      height: 100vh;
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
          font-weight: bold;
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
