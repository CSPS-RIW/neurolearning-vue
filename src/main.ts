import { createApp } from 'vue'
import App from '../src/App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
