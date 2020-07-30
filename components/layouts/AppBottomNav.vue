<template>
    <footer class="footer">
        <nuxt-link
            :is="$auth.user ? 'nuxt-link' : 'a'"
            href="javascript:void(0)"
            exact-active-class="active"
            class="footer__item"
            to="/login"
            @click="goToProfile"
        >
            <svgicon class="footer__item--icon" name="user" width="30" height="30" />
        </nuxt-link>
        <nuxt-link exact-active-class="active" class="footer__item" to="/">
            <svgicon class="footer__item--icon" name="home" width="30" height="30" />
        </nuxt-link>
        <nuxt-link exact-active-class="active" class="footer__item" to="/orders">
            <svgicon
                class="footer__item--icon"
                name="calendar"
                width="30"
                height="30"
                :orginal="false"
            />
        </nuxt-link>
    </footer>
</template>

<script>
export default {
    methods: {
        goToProfile() {
            this.$auth.authenticate().then(() => {
                this.$router.push('/profile')
            }).catch(err => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 15px 0;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #e6e6e6;
    background-color: $white;

    &__item {
        text-decoration: none;
        position: relative;
        display: flex;
        justify-content: center;

        &--icon {
            cursor: pointer;
            color: $black;

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
