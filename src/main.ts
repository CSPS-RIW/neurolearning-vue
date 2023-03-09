import { createApp } from 'vue'
import App from './App.vue'
import messages from '@intlify/unplugin-vue-i18n/messages'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery'
import { createI18n } from 'vue-i18n'
import './scss/index.scss'
import './assets/fontawesome-free-5.9.0-web/css/all.min.css'

const i18n = createI18n({
    legacy: true,
    globalInjection: true,
    locale: "en",
    fallbackLocale: "en",
    availableLocales: ["en", "fr"],
    messages,
  })

const app = createApp(App)

// app.use(router)

app.use(i18n)

app.mount('#app')
