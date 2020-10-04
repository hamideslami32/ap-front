<template>
    <nav class="side-nav" :class="{ 'side-nav-open': opened }">
        <div class="side-nav-open__close p-3" @click="$emit('close')">
            <svgicon name="arrow-long-right" class="text-gray-700" width="20" height="20" />
        </div>
        <div class="side-nav__logo-wrapper py-4 text-center">
            <logo />
        </div>
        <div class="side-nav-open__menu mt-3 mb-5">
            <ul class="pr-0">
                <li v-for="(item, i) in menuData" :key="i" @click="$emit('close')">
                    <svgicon
                        class="ml-2"
                        :name="item.icon"
                        width="30"
                        height="30"
                    />
                    <n-link class="text-gray-900 text-weight-500" :to="item.link">
                        {{ item.text }}
                    </n-link>
                </li>
            </ul>
        </div>
        <a-btn variant="info" class="side-nav__btn text-white" block>
            ورود / عضویت
        </a-btn>

        <div class="side-nav__contact px-3 mt-3">
            <div class="py-4 text-gray-900 text-center">
                <span class="text-weight-700">پشتیبانی</span><span class="text-weight-500 text-2 mr-2">(از ساعت ۹ صبح الی ۲۰)</span>
            </div>
            <a-btn
                icon="phone"
                block
                wrapper-class="side-nav__contact__btn mb-3"
                class="bg-white"
                variant="outline-primary"
            >
                021-72475
            </a-btn>
        </div>
    </nav>
</template>

<script>
import Logo from '~/components/logo/Logo'

export default {
    name: 'SidebarNav',
    components: {Logo},
    props: {
        opened: {
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
                },
                {
                    link: '#',
                    icon: 'user',
                    text: 'انتقادات و پیشنهادات'
                }


            ]
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
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        background-color: $white;
        overflow-x: hidden;
        transition: 0.3s;


        &__logo-wrapper {
            border-bottom: 1px solid map_get($grays, '500');
        }

        &__btn {
            border-radius: 5px;
            max-width: 260px;
            margin: 0 auto;
        }

        &__contact {
            background: map_get($grays, '200');
            border: 1px solid map_get($grays, '400');
            border-radius: 5px;
            margin: 0 auto;
            max-width: 260px;

            &__btn {
                position: relative;

                /deep/ .btn:focus, .btn:active {
                    background-color: $primary !important;
                    
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
        }

        @include media-breakpoint-up(xl) {
            width: 300px !important;
            .side-nav-open__close {
                display: none;
            }
        }
    }

    .side-nav-open {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 5;
        top: 0;
        right: 0;
        background-color: $white;
        overflow-x: hidden;
        transition: 0.3s;

        &__menu {
            ul {
                animation: showItems 1s ease;

                li {
                    list-style: none;
                    padding: 20px;

                    svg {
                        color: $borderColor;
                    }
                }
            }
        }

        &__close {
            text-align: right;
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



</style>
