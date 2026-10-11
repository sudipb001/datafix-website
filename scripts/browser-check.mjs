import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { resolve, sep, extname } from 'node:path'

// No SPA fallback: a missing HTML document must return 404.
const root = resolve('dist')
const base = '/datafix-website/'
const paths = ['', 'datafix/', 'datafix-magic/', 'guides/remove-duplicate-rows-csv/', 'guides/clean-messy-excel-data/', 'guides/fix-common-csv-problems/']
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' }
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (!pathname.startsWith(base)) throw new Error('Wrong base')
    let file = resolve(root, pathname.slice(base.length))
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Invalid path')
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
    const body = await readFile(file)
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' }); response.end(body)
  } catch { response.writeHead(404); response.end('Not found') }
})
await new Promise(resolveReady => server.listen(0, '127.0.0.1', resolveReady))
const origin = `http://127.0.0.1:${server.address().port}`
let browser
const results = []
await mkdir('qa', { recursive: true })
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true })
  const missing = await fetch(origin + base + 'missing/')
  assert.equal(missing.status, 404)
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
    for (const path of paths) {
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', msg => { if ((msg.type() === 'warning' || msg.type() === 'error') && msg.text().includes('Hydration')) errors.push(msg.text()) })
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
      const response = await page.goto(origin + base + path, { waitUntil: 'networkidle' })
      assert.equal(response.status(), 200)
      const h1 = await page.locator('h1').textContent()
      assert.equal(await page.locator('h1').count(), 1)
      assert.equal((await page.reload({ waitUntil: 'networkidle' })).status(), 200)
      assert.equal(await page.locator('h1').textContent(), h1)
      if (!path) assert.equal(await page.locator('.product-card').count(), 2)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${path} at ${viewport.width}`)
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded()
        await image.evaluate(img => img.complete ? Promise.resolve() : new Promise((resolveLoad, reject) => { img.onload = resolveLoad; img.onerror = reject }))
      }
      assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || i.naturalWidth === 0).length), 0)
      // Keyboard navigation includes a visible focus indicator and mobile Escape focus restoration.
      if (viewport.width < 760) {
        const toggle = page.getByRole('button', { name: 'Open navigation' })
        await toggle.focus(); await page.keyboard.press('Enter')
        assert.equal(await page.locator('#main-navigation').isVisible(), true)
        await page.locator('#main-navigation a').first().focus()
        await page.keyboard.press('Escape')
        assert.equal(await page.locator('#main-navigation').isVisible(), false)
        assert.equal(await toggle.evaluate(el => el === document.activeElement), true)
        assert.notEqual(await toggle.evaluate(el => getComputedStyle(el).outlineStyle), 'none')
      } else {
        const home = page.locator('#main-navigation a').first()
        await home.focus()
        assert.notEqual(await home.evaluate(el => getComputedStyle(el).outlineStyle), 'none')
      }
      if (await page.locator('summary').count()) {
        await page.locator('summary').first().focus(); await page.keyboard.press('Enter')
        assert.equal(await page.locator('details').first().getAttribute('open'), '')
      }
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      results.push({ path, viewport, errors, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) })
      await page.evaluate(() => { document.querySelectorAll('details').forEach(d => { d.open = false }); window.scrollTo({ top: 0, behavior: 'instant' }) })
      await page.screenshot({ path: `qa/${path.replaceAll('/', '-') || 'home'}-${viewport.width}.png`, fullPage: true })
      // Follow a real internal navigation link, then return via Home.
      if (viewport.width < 760) await page.getByRole('button', { name: 'Open navigation' }).click()
      await page.locator('#main-navigation').getByRole('link', { name: path === 'datafix/' ? 'DataFix Magic' : 'DataFix', exact: true }).click()
      assert.ok(page.url().endsWith(path === 'datafix/' ? '/datafix-magic/' : '/datafix/'))
      if (viewport.width < 760) await page.getByRole('button', { name: 'Open navigation' }).click()
      await page.locator('#main-navigation').getByRole('link', { name: 'Home', exact: true }).click()
      assert.ok(page.url().endsWith(base))
      await page.close()
      console.log(`Checked ${path || 'home'} at ${viewport.width}px: ${errors.length} errors, ${axe.violations.length} axe violations`)
    }
    await context.close()
  }
  for (const path of paths) {
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
    assert.equal((await page.goto(origin + base + path)).status(), 200)
    assert.equal(await page.locator('h1').count(), 1)
    assert.ok((await page.locator('main').textContent()).length > 1500)
    assert.equal(await page.locator('#main-navigation').isVisible(), true)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    if (await page.locator('summary').count()) { await page.locator('summary').first().click(); assert.equal(await page.locator('details').first().getAttribute('open'), '') }
    await page.locator('#main-navigation').getByRole('link', { name: 'DataFix', exact: true }).click()
    assert.ok(page.url().endsWith('/datafix/'))
    await page.close()
  }
  await writeFile('qa/results.json', JSON.stringify(results, null, 2))
  assert.ok(results.every(r => r.errors.length === 0 && r.violations.length === 0), 'Browser or accessibility checks failed; see qa/results.json')
  console.log('18 desktop/mobile route scans, direct loads, refreshes, keyboard navigation, image loads and six JavaScript-disabled routes passed against a static server without fallback.')
} finally { await browser?.close(); await new Promise(resolveClose => server.close(resolveClose)) }
