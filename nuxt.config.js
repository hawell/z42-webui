import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'zone-42',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://www.zone-42.com/logo.png'
      },
      {
        hid: 'og:image:alt',
        name: 'og:image:alt',
        content: 'zone-42 main page'
      },
      { hid: 'description', name: 'description', content: 'authoritative dns resolver' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    recaptcha: {
      siteKey: process.env.NUXT_ENV_RECAPTCHA_SITE_KEY
    },
    axios: {
      browserBaseURL: process.env.NUXT_ENV_API_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.NUXT_ENV_API_BASE_URL
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/z42api.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  server: {
    port: 8000
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-material-design-icons',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/recaptcha',
    '@nuxtjs/toast',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken1,
          secondary: colors.blue.lighten4,
          accent: colors.pink.base,
          error: colors.red.darken1,
          info: colors.cyan.lighten1,
          success: colors.green.lighten1,
          warning: colors.yellow.lighten1
        }
      }
    }
  },

  recaptcha: {
    siteKey: process.env.NUXT_ENV_RECAPTCHA_SITE_KEY,
    hideBadge: true,
    version: 3
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/zones'
    },
    strategies: {
      customStrategy: {
        scheme: '~/schemes/customScheme',
        token: {
          property: 'token',
          global: true,
          type: 'Bearer',
          maxAge: 3600
        },
        user: {
          autoFetch: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh_token', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' },
          user: false
        }
      }
    }
  },

  toast: {
    position: 'top-center',
    iconPack: 'material',
    duration: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth']
  },

  sitemap: {
    hostname: 'https://www.zone-42.com',
    gzip: true,
    routes: [
      '/api',
      '/help',
      '/'
    ]
  },

  robots: {
    UserAgent: '*',
    Disallow: '',
    Sitemap: 'https://www.zone-42.com/sitemap.xml'
  },

  i18n: {
    locales: [
      {code: 'en', iso: 'en-US'}
    ],
    defaultLocale: 'en',
    baseUrl: 'https://zone-42.com'
  }
}
