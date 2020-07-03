<template>
  <div class="search-btn">
    <app-full-btn icon="arrow-left">
      جستجو
    </app-full-btn>
  </div>
</template>


<script>
import FullBtn from '~/components/Ui/Buttons/FullBtn'
export default {
    components: {
        appFullBtn: FullBtn
    }
}
</script>

<style lang="scss" scoped>
  .search-btn {
    margin-bottom: 20px;
  }
</style>
