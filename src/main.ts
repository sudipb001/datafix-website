import { createSSRApp } from 'vue'
import App from './App.vue'
import './style.css'
import { resolvePage } from './pages'
const page = resolvePage(window.location.pathname)
if (page) createSSRApp(App, { page }).mount('#app')
