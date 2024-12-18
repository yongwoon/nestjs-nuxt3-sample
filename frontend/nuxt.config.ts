// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vite: {
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://backend:5002',
          changeOrigin: true,
        },
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
});
