<template>
    <nav class="side-nav" :class="{ 'side-nav-open': opened }">
        <div class="side-nav-open__close p-3" @click="$emit('close')">
            <svgicon name="arrow-long-right" class="text-gray-700" width="20" height="20" />
        </div>
        <div class="side-nav__logo-wrapper py-4 text-center">
            <logo />
        </div>
        <div v-if="opened" class="side-nav-open__menu mt-3">
            <ul class="pr-0">
                <li v-for="(item, i) in menuData" :key="i" @click="$emit('close')">
                    <svgicon
                        class="ml-2 text-gray-700"
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
    .side-nav {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        background-color: $lightPrimary;
        overflow-x: hidden;
        transition: 0.3s;


        &__logo-wrapper {
            border-bottom: 1px solid map_get($grays, '700');
        }
    }

    .side-nav-open {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 5;
        top: 0;
        right: 0;
        background-color: white;
        overflow-x: hidden;
        transition: 0.3s;

        &__menu {
            ul {
                animation: showItems 500ms 1 ease-in-out;
                opacity: 1;

                li {
                    list-style: none;
                    padding: 15px;
                }
            }
        }

        &__close {
            text-align: right;
        }
    }

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

</style>
