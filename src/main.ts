import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'animate.css'
import 'jquery'
import './assets/fontawesome-free-5.9.0-web/css/all.min.css'


import './scss/chat-buble.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
