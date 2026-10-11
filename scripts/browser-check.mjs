import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
await mkdir('qa', { recursive: true })
const results = []
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', msg => { if (msg.type() === 'warning' && msg.text().includes('Hydration')) errors.push(msg.text()) })
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
    await page.goto('http://localhost:4173/datafix-website/', { waitUntil: 'networkidle' })
    assert.equal(await page.locator('.product-card').count(), 2)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${viewport.width}`)
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate(img => img.complete ? Promise.resolve() : new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject }))
    }
    assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || i.naturalWidth === 0).length), 0)
    if (viewport.width < 760) {
      await page.getByRole('button', { name: 'Open navigation' }).click()
      assert.equal(await page.locator('#main-navigation').isVisible(), true)
      await page.locator('#main-navigation').getByRole('link', { name: 'Products', exact: true }).click()
      assert.ok(page.url().endsWith('#products'))
      assert.equal(await page.locator('#main-navigation').isVisible(), false)
      await page.getByRole('button', { name: 'Open navigation' }).click()
      await page.locator('#main-navigation a').first().focus()
      await page.keyboard.press('Escape')
      assert.equal(await page.locator('#main-navigation').isVisible(), false)
    } else {
      await page.locator('#main-navigation').getByRole('link', { name: 'Screenshots' }).click()
      assert.ok(page.url().endsWith('#screenshots'))
    }
    await page.locator('summary').first().focus()
    await page.keyboard.press('Enter')
    assert.equal(await page.locator('details').first().getAttribute('open'), '')
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
    results.push({ viewport, errors, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) })
    await page.evaluate(() => { document.querySelectorAll('details').forEach(d => { d.open = false }); window.scrollTo({ top: 0, behavior: 'instant' }) })
    await page.screenshot({ path: `qa/${viewport.width}.png`, fullPage: true })
    await context.close()
  }
  const staticPage = await browser.newPage({ javaScriptEnabled: false })
  await staticPage.goto('http://localhost:4173/datafix-website/')
  assert.equal(await staticPage.locator('.product-card').count(), 2)
  await staticPage.locator('summary').first().click()
  assert.equal(await staticPage.locator('details').first().getAttribute('open'), '')
  await staticPage.close()
  await writeFile('qa/results.json', JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results, null, 2))
  assert.ok(results.every(r => r.errors.length === 0 && r.violations.length === 0), 'Browser or accessibility checks failed; see qa/results.json')
} finally { await browser.close() }
