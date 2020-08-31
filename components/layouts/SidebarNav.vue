<template>
    <nav class="side-nav" :class="{ 'side-nav-open': opened }">
        <div class="side-nav-open__close p-3" @click="$emit('close')">
            <svgicon color="white" name="arrow-long-right" width="20" height="20" />
        </div>
        <div v-if="opened" class="side-nav-open__menu mt-3">
            <ul class="pr-0">
                <li v-for="(item, i) in menuData" :key="i" @click="$emit('close')">
                    <svgicon
                        class="ml-2"
                        color="white"
                        :name="item.icon"
                        width="25"
                        height="25"
                    />
                    <a :href="item.link">{{ item.text }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'SidebarNav',
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
                    link: '#',
                    icon: 'user',
                    text: 'راهنمای خرید بلیط از اپرو'
                },
                {
                    link: '#',
                    icon: 'user',
                    text: 'تماس با اپرو'
                },
                {
                    link: '#',
                    icon: 'user',
                    text: 'درباره اپرو'
                },
                {
                    link: '#',
                    icon: 'user',
                    text: 'قوانین و مقررات'
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
    }

    .side-nav-open {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 5;
        top: 0;
        right: 0;
        background-color: $lightPrimary;
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
