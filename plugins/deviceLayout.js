import Vue from 'vue'

Vue.mixin({
    layout: (ctx) => ctx.isMobile ? 'mobile' : 'default'
});
