<template>
  <div class="container-fluid footer-wrapper">
    <footer class="footer">
      <nuxt-link exact-active-class="active" class="footer__item" to="/login">
        <svgicon class="footer__item--icon" name="user-add" width="30" height="30" />
      </nuxt-link>
      <nuxt-link exact-active-class="active" class="footer__item" to="/">
        <svgicon class="footer__item--icon" name="home" width="30" height="30" />
      </nuxt-link>
      <nuxt-link exact-active-class="active" class="footer__item" to="/profile">
        <svgicon
          class="footer__item--icon"
          name="calendar"
          width="30"
          height="30"
          :orginal="false"
        />
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import '~/components/icons'
export default {}
</script>

<style lang="scss" scoped>
.footer-wrapper {
    position: fixed;
    bottom: 0;
    background-color: #FAFAFA;
}

.footer {
    padding: 15px 0;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__item {
        text-decoration: none;
        position: relative;
        display: flex;
        justify-content: center;

        &--icon {
            cursor: pointer;
            color: $blackColor;

            &:hover {
                color: $primary;
            }
        }

        &.active {
            &::before {
                content: '';
                width: 4px;
                height: 4px;
                background: $primary;
                position: absolute;
                bottom: -10px;
                border-radius: 50%;
            }

            .footer__item {
                &--icon {
                    color: $primary;
                    position: relative;
                }
            }
        }
    }
}
</style>
