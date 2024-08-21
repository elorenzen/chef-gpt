// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    '@nuxtjs/supabase',
    "@nuxt/image",
    "vuetify-nuxt-module"
  ],
  runtimeConfig: {
    public: {
      foodId: process.env.FOOD_KEY
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false // set to 'true', EVENTUALLY
  },
  vuetify: {
    vuetifyOptions: {
      components: [
        'VDialog',
        'VCard',
        'VCardTitle',
        'VBtn',
        'VCardSubtitle',
        'VImg',
        'VAvatar',
        'VCardActions',
        'VList',
        'VListItem',
        'VIcon',
        'VListItemTitle',
        'VRow',
        'VCol',
        'VExpansionPanel',
        'VExpansionPanels',
        'VTextField',
        'VSelect',
        'VChip',
        'VIcon'
      ]
    }
  }
})