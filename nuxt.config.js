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
        title: 'خرید بلیط هواپیما',
        titleTemplate: 'Apro | %s',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
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
        '~plugins/global-components',
        '~plugins/svg',
        '~plugins/numbers',
        '~plugins/auth',
        '~plugins/api',
        '~plugins/flight',
        '~plugins/dayjs',
        '~plugins/portal',
        { src: '~plugins/toast.js', mode: 'client' },
        { src: '~plugins/lottie.js', mode: 'client' },
        '~plugins/veeValidate/veeValidate'
    ],
    server: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    },
    /*
   ** Nuxt.js dev-modules
   */
    buildModules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/pwa',
        '@nuxtjs/router-extras'
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
        baseURL: process.env.API_URL || 'https://apro-dev.ir/api'
    },
    env: {
        STATIC_URL: process.env.STATIC_URL,
        DOMAIN_URL: process.env.DOMAIN_URL,
        API_URL: process.env.API_URL
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
    build: {
        publicPath: process.env.PUBLIC_PATH || '/_nuxt/',
        extractCSS: process.env.NODE_ENV === 'production',
        transpile: [
            'vee-validate/dist/rules'
        ],
        extend(config) {
            config.devServer = {
                inline: false
            }
        }
    },

    bootstrapVue: {
        bootstrapCSS: false, // Or `css: false`
        bootstrapVueCSS: false, // Or `bvCSS: false`
        config: {
            BToast: {
                'toaster': 'b-toaster-bottom-full'
            }
        }
    },
    styleResources: {
        scss: ['assets/styles/_vars.scss']
    },
    layoutTransition: {
        name: 'slide-left',
        mode: ''
    },
    pageTransition: {
        name: 'page-transition',
        mode: ''
    },
    pwa: {
        icon: {
            source: 'assets/images/logo.png'
        },
        meta: {
            mobileAppIOS: true
        },
        manifest: {
            name: 'Apro',
            short_name: 'Apro'
        }
    }
}
