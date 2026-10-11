import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { structuredData } from './data'
export const render = () => renderToString(createSSRApp(App))
export const jsonLd = JSON.stringify(structuredData).replace(/</g, '\\u003c')
