import { createServer } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { render, jsonLd } = await server.ssrLoadModule('/src/entry-static.ts')
  const template = await readFile('dist/index.html', 'utf8')
  await writeFile('dist/index.html', template.replace('<!--app-html-->', await render()).replace('<!--structured-data-->', `<script type="application/ld+json">${jsonLd}</script>`))
} finally { await server.close() }
