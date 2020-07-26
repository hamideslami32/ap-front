export default {
    /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
    mode: 'universal',
    /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
    },
    /*
   ** Global CSS
   */
    css: ['~assets/styles/app.scss'],
    /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
    plugins: [
        '~plugins/svg',
        '~plugins/numbers',
        '~plugins/auth',
        '~plugins/api',
        '~plugins/dayjs',
        '~plugins/toast.js'
    ],
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    /*
   ** Nuxt.js dev-modules
   */
    buildModules: [
        '@nuxtjs/style-resources'
        /*     '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module' */
        // Doc: https://github.com/nuxt-community/eslint-module
        // Doc: https://github.com/nuxt-community/stylelint-module
    ],
    /*
   ** Nuxt.js modules
   */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt/content
        // '@nuxt/content',
        '@nuxtjs/device',
        '@nuxtjs/universal-storage',
        'bootstrap-vue/nuxt'
    ],
    /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
    axios: {
        baseURL: process.env.API_URL
    },
    /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
    content: {},
    /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
    build: {},

    bootstrapVue: {
        bootstrapCSS: false, // Or `css: false`
        bootstrapVueCSS: false // Or `bvCSS: false`
    },
    styleResources: {
        scss: ['assets/styles/_vars.scss']
    }
}
