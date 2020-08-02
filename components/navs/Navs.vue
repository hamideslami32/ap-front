<template>
    <div class="navs">
        <nuxt-link
            v-for="link in links"
            :key="link.url"
            active-class="active"
            class="nav-item"
            :to="link.url"
        >
            <svgicon class="align-middle" :name="link.icon" width="24" height="24" />
            <span class="align-middle">
                {{ link.name }}
            </span>
        </nuxt-link>
    </div>
</template>


<script>
export default {
    data() {
        return {
            links: [
                { name: 'جستجوی پرواز', icon: 'flight', url: '/flights' },
                { name: 'جستجوی هتل', icon: 'hotel', url: '/hotels' },
                { name: 'جستجوی تور', icon: 'tour', url: '/tours' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.navs {
    padding: 20px 0;
    overflow: auto;
    text-align: right;
    white-space: nowrap;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > a:first-child {
        margin-right: 10px;
    }

    > a:last-child {
        margin-left: 10px;
    }
}

.nav-item {
    position: relative;
    text-decoration: none;
    display: inline-block;
    padding: 12px 16px;
    background: $white;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    color: inherit;
    transition: all 200ms ease;
    border: 1px solid #e0e0e0;
    font-size: 13px;

    &:not(:first-child) {
        margin-right: 10px;
    }

    &.active{
        background: linear-gradient(90deg, #dd418a 0%, #e3629e 100%);
        color: $white;
    }
}
</style>
