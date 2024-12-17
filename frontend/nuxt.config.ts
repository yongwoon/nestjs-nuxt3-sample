// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5002',
          changeOrigin: true,
        },
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
});
