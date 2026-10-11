import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { pages, pageStructuredData, type Page } from './pages'
export { pages }
export const render = (page: Page) => renderToString(createSSRApp(App, { page }))
export const jsonLd = (page: Page) => JSON.stringify(pageStructuredData(page)).replace(/</g, '\\u003c')
