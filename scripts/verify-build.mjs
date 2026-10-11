import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { Window } from 'happy-dom'
const html = readFileSync('dist/index.html', 'utf8')
const window = new Window()
window.document.write(html)
const doc = window.document
assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://sudipb001.github.io/datafix-website/')
assert.equal(doc.querySelectorAll('h1').length, 1)
assert.equal(doc.querySelectorAll('.product-card').length, 2)
assert.equal(doc.querySelectorAll('.faq-list details').length, 8)
assert.ok(doc.querySelector('main')?.textContent.includes('Messy Data?'))
for (const url of ['https://apps.microsoft.com/detail/9mz4431hr5mz','https://apps.microsoft.com/detail/9nfftr5fv3wv']) assert.ok(doc.querySelector(`.product-card a[href="${url}"]`))
for (const element of doc.querySelectorAll('[src], link[href], a[href]')) {
  const value = element.getAttribute('src') ?? element.getAttribute('href')
  if (value?.startsWith('#')) assert.ok(doc.getElementById(value.slice(1)), `Broken anchor: ${value}`)
  if (value?.startsWith('/')) {
    assert.ok(value.startsWith('/datafix-website/'), `Wrong base: ${value}`)
    assert.ok(existsSync(`dist/${value.slice('/datafix-website/'.length)}`), `Missing asset: ${value}`)
  }
}
for (const file of ['robots.txt','sitemap.xml','images/social-card.png','images/datafix-icon.png','images/datafix-magic-icon.png']) assert.ok(existsSync(`dist/${file}`), `Missing ${file}`)
assert.ok(readFileSync('dist/sitemap.xml','utf8').includes('https://sudipb001.github.io/datafix-website/'))
const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph']
assert.equal(graph.filter(item => item['@type'] === 'SoftwareApplication').length, 2)
assert.ok(!html.includes('<!--app-html-->'))
console.log('Production HTML verified: content, Store links, canonical, structured data, anchors, assets, and Pages base path.')
await window.happyDOM.close()
