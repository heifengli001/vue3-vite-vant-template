import { createApp } from 'vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'

import 'amfe-flexible'
const app=createApp(App)
app.use(store).use(router)

app.mount('#app')
