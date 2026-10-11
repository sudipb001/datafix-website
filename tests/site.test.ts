import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { existsSync } from 'node:fs'
import App from '../src/App.vue'
import SiteHeader from '../src/components/SiteHeader.vue'
import { products, faqs, navigation } from '../src/data'
afterEach(() => { document.body.innerHTML = '' })
vi.stubEnv('BASE_URL', '/datafix-website/')
describe('public marketing site', () => {
  it('renders both products with authentic icons and correct Store destinations', () => {
    const wrapper = mount(App)
    expect(wrapper.findAll('.product-card')).toHaveLength(2)
    for (const product of products) {
      const card = wrapper.find(`.product-card.${product.id}`)
      expect(card.find('h3').text()).toBe(product.name)
      expect(card.find('.product-top img').attributes('src')).toBe(`/datafix-website/${product.icon}`)
      expect(card.find('.product-top a').attributes('href')).toBe(product.storeUrl)
      expect(card.find('.store-button').attributes('href')).toBe(product.storeUrl)
      expect(card.find('.store-button').text()).toContain('View on Microsoft Store')
    }
    wrapper.unmount()
  })
  it('opens and closes mobile navigation, including Escape', async () => {
    const wrapper = mount(SiteHeader)
    const toggle = wrapper.find('button')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    await wrapper.find('nav a').trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    await wrapper.find('nav').trigger('keydown', { key: 'Escape' })
    expect(toggle.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })
  it('has crawlable navigation, complete FAQs, and valid internal links', () => {
    const wrapper = mount(App)
    for (const item of navigation) expect(wrapper.find(`#${item.id}`).exists()).toBe(true)
    expect(wrapper.findAll('details')).toHaveLength(faqs.length)
    for (const faq of faqs) expect(wrapper.text()).toContain(faq.answer)
    for (const anchor of wrapper.findAll('a[href^="#"]')) expect(wrapper.find(anchor.attributes('href')!).exists()).toBe(true)
    wrapper.unmount()
  })
  it('has all referenced public images', () => {
    for (const product of products) {
      expect(existsSync(`public/${product.icon}`)).toBe(true)
      for (const screenshot of product.screenshots) expect(existsSync(`public/${screenshot.file}`)).toBe(true)
    }
    expect(existsSync('public/images/social-card.png')).toBe(true)
  })
})
