<template>
    <nav class="side-nav" :class="{ sidenavopen: opened }">
        <div>
            <svgicon color="white" name="arrow-long-right" width="20" height="20" />>
        </div>
        <div>
            <ul>
                <li><a href="#">راهنمای خرید بلیط از اپرو</a></li>
                <li><a href="#">درباره اپرو</a></li>
                <li><a href="#">تماس با اپرو</a></li>
                <li><a href="#">قوانین</a></li>
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
        background-color: #111;
        opacity: 0.9;
        overflow-x: hidden;
        transition: 0.3s;
    }

    .sidenavopen {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        background-color: #111;
        opacity: 0.9;
        overflow-x: hidden;
        transition: 0.3s;
    }
</style>
