import { readFileSync, existsSync, readdirSync } from 'node:fs'
import assert from 'node:assert/strict'
import { Window } from 'happy-dom'
const origin = 'https://sudipb001.github.io'
const base = '/datafix-website/'
// Independent acceptance list detects accidentally omitted routes.
const paths = ['', 'datafix/', 'datafix-magic/', 'guides/remove-duplicate-rows-csv/', 'guides/clean-messy-excel-data/', 'guides/fix-common-csv-problems/']
const docs = new Map(), windows = []
for (const path of paths) {
  const html = readFileSync(`dist/${path}index.html`, 'utf8')
  const window = new Window()
  windows.push(window)
  window.document.write(html)
  docs.set(base + path, window.document)
  assert.ok(!html.includes('<!--app-html-->') && !html.includes('<!--structured-data-->'))
  assert.ok(!html.includes('Â©'), 'Corrupted UTF-8 text')
}
const titles = new Set(), descriptions = new Set(), headings = new Set()
for (const [pathname, doc] of docs) {
  const url = origin + pathname
  assert.equal(doc.querySelectorAll('h1').length, 1, url)
  assert.ok(doc.querySelector('main').textContent.trim().length > 1500, `Thin static content: ${url}`)
  titles.add(doc.title)
  descriptions.add(doc.querySelector('meta[name="description"]').content)
  headings.add(doc.querySelector('h1').textContent.trim())
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1)
  assert.equal(doc.querySelector('link[rel="canonical"]').href, url)
  assert.equal(doc.querySelector('meta[property="og:url"]').content, url)
  for (const property of ['og:title', 'og:description', 'og:image', 'og:image:alt']) assert.ok(doc.querySelector(`meta[property="${property}"]`).content)
  assert.ok(!doc.querySelector('meta[name="robots"]').content.includes('noindex'))
  const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph']
  assert.ok(graph.length > 0)
  for (const entity of graph) for (const forbidden of ['aggregateRating', 'review', 'offers', 'award']) assert.ok(!(forbidden in entity))
  if (pathname === base) {
    assert.equal(doc.querySelectorAll('.product-card').length, 2)
    assert.equal(doc.querySelectorAll('.faq-list details').length, 8)
    assert.ok(doc.querySelector('main').textContent.includes('Messy Data?'))
    assert.equal(graph.filter(item => item['@type'] === 'SoftwareApplication').length, 2)
  } else {
    assert.equal(graph[0].url, url)
    assert.equal(graph[0]['@type'], pathname.includes('/guides/') ? 'TechArticle' : 'SoftwareApplication')
    assert.ok(doc.querySelector('nav[aria-label="Breadcrumb"] a'))
  }
  for (const image of doc.querySelectorAll('img')) {
    assert.ok(image.hasAttribute('alt'))
    assert.ok(image.getAttribute('width') && image.getAttribute('height'))
    // Empty alt is appropriate for decorative icons beside visible product names.
    if (!image.closest('.brand') && !image.closest('.gallery-group h3')) assert.ok(image.alt.length > 10)
  }
  for (const element of doc.querySelectorAll('[src], link[href], a[href], meta[property="og:image"]')) {
    const value = element.getAttribute('src') ?? element.getAttribute('href') ?? element.getAttribute('content')
    assert.notEqual(value, '#', 'Placeholder link')
    if (!value || (!value.startsWith('/') && !value.startsWith('#') && !value.startsWith(origin))) continue
    const resolved = new URL(value, url)
    assert.ok(resolved.pathname.startsWith(base), `Wrong base: ${value}`)
    const targetDoc = docs.get(resolved.pathname)
    if (targetDoc) {
      if (resolved.hash) assert.ok(targetDoc.getElementById(decodeURIComponent(resolved.hash.slice(1))), `Broken anchor: ${value}`)
    } else assert.ok(existsSync(`dist/${resolved.pathname.slice(base.length)}`), `Missing target: ${value}`)
  }
  for (const product of [{ id: 'datafix', store: '9mz4431hr5mz' }, { id: 'datafix-magic', store: '9nfftr5fv3wv' }]) {
    for (const icon of doc.querySelectorAll(`a img[src="${base}images/${product.id}-icon.png"]`)) if (!icon.closest('.brand')) assert.equal(icon.closest('a').getAttribute('href'), `https://apps.microsoft.com/detail/${product.store}`)
  }
  for (const link of doc.querySelectorAll('a[href^="https://apps.microsoft.com/"]')) assert.ok(['https://apps.microsoft.com/detail/9mz4431hr5mz', 'https://apps.microsoft.com/detail/9nfftr5fv3wv'].includes(link.href))
}
assert.equal(titles.size, 6); assert.equal(descriptions.size, 6); assert.equal(headings.size, 6)
const sitemapWindow = new Window()
const sitemap = new sitemapWindow.DOMParser().parseFromString(readFileSync('dist/sitemap.xml', 'utf8'), 'application/xml')
assert.equal(sitemap.documentElement.namespaceURI, 'http://www.sitemaps.org/schemas/sitemap/0.9')
assert.deepEqual([...sitemap.querySelectorAll('loc')].map(el => el.textContent).sort(), paths.map(path => origin + base + path).sort())
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes('Sitemap: ' + origin + base + 'sitemap.xml'))
assert.ok(!/^Disallow:\s*\/(?:datafix-website\/)?\s*$/mi.test(readFileSync('dist/robots.txt', 'utf8')))
for (const file of ['google1f23c30587ddef6f.html', 'BingSiteAuth.xml', 'robots.txt', 'images/social-card.png', 'images/datafix-icon.png', 'images/datafix-magic-icon.png']) assert.deepEqual(readFileSync(`dist/${file}`), readFileSync(`public/${file}`))
const htmlFiles = readdirSync('dist', { recursive: true }).filter(file => String(file).endsWith('.html') && !String(file).includes('google'))
assert.equal(htmlFiles.length, 6)
console.log('All six static pages verified: unique SEO, H1s, content, JSON-LD, links, images, Store icons, sitemap, robots, verification files and base paths.')
await Promise.all([...windows, sitemapWindow].map(w => w.happyDOM.close()))
