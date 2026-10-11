import { createServer } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { Window } from 'happy-dom'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { render, jsonLd, pages } = await server.ssrLoadModule('/src/entry-static.ts')
  const template = await readFile('dist/index.html', 'utf8')
  for (const page of pages) {
    const window = new Window()
    const doc = window.document
    doc.write(template.replace('<!--app-html-->', await render(page)).replace('<!--structured-data-->', `<script type="application/ld+json">${jsonLd(page)}</script>`))
    if (page.kind !== 'home') {
      doc.title = page.title
      const set = (selector, value) => doc.querySelector(selector).setAttribute('content', value)
      set('meta[name="description"]', page.description)
      doc.querySelector('link[rel="canonical"]').setAttribute('href', 'https://sudipb001.github.io/datafix-website/' + page.path)
      for (const prefix of ['og', 'twitter']) {
        const attr = prefix === 'og' ? 'property' : 'name'
        set(`meta[${attr}="${prefix}:title"]`, page.title)
        set(`meta[${attr}="${prefix}:description"]`, page.description)
        set(`meta[${attr}="${prefix}:image"]`, 'https://sudipb001.github.io/datafix-website/' + page.image)
      }
      set('meta[property="og:url"]', 'https://sudipb001.github.io/datafix-website/' + page.path)
      set('meta[property="og:type"]', page.kind === 'guide' ? 'article' : 'website')
      set('meta[property="og:image:alt"]', page.imageAlt)
      // The homepage share-card dimensions do not describe screenshot images.
      doc.querySelector('meta[property="og:image:width"]').remove()
      doc.querySelector('meta[property="og:image:height"]').remove()
    }
    await mkdir('dist/' + page.path, { recursive: true })
    await writeFile('dist/' + page.path + 'index.html', '<!doctype html>\n' + doc.documentElement.outerHTML)
    await window.happyDOM.close()
  }
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => `  <url><loc>https://sudipb001.github.io/datafix-website/${page.path}</loc></url>`).join('\n') + '\n</urlset>\n'
  await writeFile('dist/sitemap.xml', sitemap)
} finally { await server.close() }
