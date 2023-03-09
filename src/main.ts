import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'animate.css'
import 'jquery'
import './assets/fontawesome-free-5.9.0-web/css/all.min.css'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages';
import './scss/index.scss'


import './scss/chat-buble.scss'

const i18n = createI18n({
    legacy: true,
    globalInjection: true,
    locale: "en",
    fallbackLocale: "en",
    availableLocales: ["en", "fr"],
    messages,
  })

const app = createApp(App)

app.use(router)

app.use(i18n)

app.mount('#app')
