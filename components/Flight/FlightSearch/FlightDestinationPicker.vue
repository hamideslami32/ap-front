<template>
  <div class="flight-destination">
    <app-input-pair>
      <app-reverse-btn />
    </app-input-pair>
  </div>
</template>

<script>
import InputPair from '~/components/Ui/Form/InputPair.vue'
import ReverseBtn from '~/components/Ui/Buttons/ReverseBtn.vue'
export default {
    components: {
        appInputPair: InputPair,
        appReverseBtn: ReverseBtn
    }
}
</script>