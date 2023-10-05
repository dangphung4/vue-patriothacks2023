
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app')

