import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://10.164.58.62/HINSEI/server/public/api/';

const pinia = createPinia()
const app = createApp(App)

app.use(VueSweetalert2);
app.use(router)
app.use(pinia)
app.mount('#app')
