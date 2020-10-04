<template>
    <nav class="side-nav" :class="{ 'side-nav--open': open }">
        <a href="javascript:void(0)" class="side-nav__close d-xl-none p-3" @click="close">
            <svgicon name="arrow-long-right" class="text-gray-700" width="20" height="20" />
        </a>
        <div class="pt-4 text-center border-bottom pb-4">
            <logo />
        </div>

        <ul class="side-nav__menu mb-5 mt-3">
            <li v-for="(item, i) in menuData" :key="i" @click="$emit('close')">
                <n-link :to="item.link">
                    <svgicon
                        class="ml-2"
                        :name="item.icon"
                        width="30"
                        height="30"
                    />
                    <span class="align-middle">
                        {{ item.text }}
                    </span>
                </n-link>
            </li>
        </ul>

        <a-btn
            v-if="!$auth.user"
            variant="info"
            class="text-white"
            block
            @click.prevent="login"
        >
            ورود / عضویت
        </a-btn>

        <div class="side-nav__contact px-3 mt-3">
            <div class="py-4 text-gray-900 text-center">
                <span class="text-weight-700">پشتیبانی</span><span class="text-weight-500 text-2 mr-2">(از ساعت ۹ صبح الی ۲۰)</span>
            </div>
            <a href="tel:02172475">
                <a-btn
                    icon="phone"
                    block
                    wrapper-class="contact-btn mb-3"
                    class="bg-white"
                    variant="outline-primary"
                >
                    021-72475
                </a-btn>
            </a>
        </div>
    </nav>
</template>

<script>
import Logo from '~/components/logo/Logo'

export default {
    name: 'SidebarNav',
    components: {Logo},
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menuData: [
                {
                    link: '/',
                    icon: 'home',
                    text: 'خانه'
                },
                {
                    link: '/contact',
                    icon: 'phone',
                    text: 'تماس با اپرو'
                },
                {
                    link: '/about',
                    icon: 'warning-cube',
                    text: 'درباره اپرو'
                }
            ]
        }
    },
    watch: {
        '$route.path'() {
            this.close()
        }
    },
    methods: {
        close() {
            this.$emit('update:open', false)
        },
        login() {
            this.$auth.authenticate().then(() => {
                this.$router.push('/profile')
            }).catch(err => {})
        }
    }
}
</script>

<style lang='scss'>
    @keyframes showItems {
        0% {
            opacity: 0;
        }

        70% {
            opacity: 0.3;
        }

        100% {
            opacity: 1;
        }
    }


    .side-nav {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 200;
        top: 0;
        right: 0;
        background-color: $white;
        overflow-x: hidden;
        transition: 0.3s;
        transform: translateX(100%);
        padding: 0 15px;

        &__close {
            position: absolute;
            top: 0;
            right: 0;
        }

        &__contact {
            background: map_get($grays, '200');
            border: 1px solid map_get($grays, '400');
            border-radius: 5px;
        }

        @include media-breakpoint-up(xl) {
            width: 300px !important;
        }

        &__menu {
            padding: 0;
            animation: showItems 1s ease;
            list-style: none;

            > li {
                a {
                    display: block;
                    padding: 10px 0;
                    color: map-get($grays, '900');

                    &.nuxt-link-exact-active {
                        color: $primary;
                        position: relative;

                        &::after {
                            content: ' ';
                            position: absolute;
                            left: 0;
                            top: calc(50% - 2px);
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background-color: $primary;
                        }
                    }
                }
            }
        }

        @include media-breakpoint-up(xl) {
            width: 300px !important;
            transition: none;
            &__menu ul {
                animation: unset !important;
                opacity: 1;
            }
        }
    }

    .side-nav--open {
        position: fixed;
        transform: translateX(0);
        background-color: $white;
        overflow-x: hidden;
    }


    .contact-btn {
        position: relative;

        /deep/ .btn:focus, .btn:active {
            background-color: $primary !important;
            color: $white !important;

        }
        /deep/ .btn:hover {
            color: $primary;
        }

        > button {
            border-radius: 5px;

            &:before {
                content: '';
                position: absolute;
                width: 8px;
                height: 8px;
                background: $primary;
                border-radius: 50%;
                right: 10px;
                top: 10px;
            }
        }

        .btn-icon {
            background-color: $primary;
            color: $white;
        }
    }

</style>
