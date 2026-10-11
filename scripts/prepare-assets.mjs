// Run only when intentionally refreshing the public, approved product artwork.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
await mkdir('public/images/screenshots', { recursive: true })
const sources = [
  ['C:/Users/sudip/dev/DataFix/installer/msix/Assets/DataFix-Store-Logo.png', 'public/images/datafix-icon.png', 300],
  ['C:/Users/sudip/dev/DataFixMagic/assets/branding/DataFixMagic-Icon-Master.png', 'public/images/datafix-magic-icon.png', 300],
  ['C:/Users/sudip/dev/DataFix/docs/store/screenshots/03-datafix-analysis.png', 'public/images/screenshots/datafix-analysis.webp', 1264],
  ['C:/Users/sudip/dev/DataFix/docs/store/screenshots/04-datafix-cleanup-preview.png', 'public/images/screenshots/datafix-preview.webp', 1264],
  ['C:/Users/sudip/dev/DataFixMagic/docs/store-screenshots/02-data-grid-dark.png', 'public/images/screenshots/magic-grid.webp', 1600],
  ['C:/Users/sudip/dev/DataFixMagic/docs/store-screenshots/03-validation-results-dark.png', 'public/images/screenshots/magic-validation.webp', 1600]
]
for (const [source, destination, width] of sources) {
  const image = sharp(source).resize({ width, withoutEnlargement: true })
  await (destination.endsWith('.webp') ? image.webp({ quality: 88 }) : image.png({ compressionLevel: 9, palette: true, quality: 95 })).toFile(destination)
  console.log(destination, await sharp(destination).metadata().then(m => `${m.width}×${m.height}`))
}
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg"><stop stop-color="#0b1426"/><stop offset="1" stop-color="#202b50"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><circle cx="950" cy="280" r="230" fill="none" stroke="#395482"/><text x="70" y="110" font-family="Segoe UI, sans-serif" font-size="23" fill="#8bb7ff" letter-spacing="3">DATAFIX · WINDOWS DATA TOOLS</text><text x="70" y="260" font-family="Segoe UI, sans-serif" font-size="70" font-weight="700" fill="white">Messy Data?</text><text x="70" y="345" font-family="Segoe UI, sans-serif" font-size="70" font-weight="700" fill="#8db5ff">Meet Your Fix.</text><text x="70" y="470" font-family="Segoe UI, sans-serif" font-size="26" fill="#c4cee2">Clean. Inspect. Transform.</text><text x="70" y="540" font-family="Segoe UI, sans-serif" font-size="20" fill="#aabbd6">DataFix &amp; DataFix Magic</text></svg>`
await sharp(Buffer.from(svg)).composite([
  { input: await sharp('public/images/datafix-icon.png').resize(165).toBuffer(), left: 835, top: 150 },
  { input: await sharp('public/images/datafix-magic-icon.png').resize(165).toBuffer(), left: 965, top: 310 }
]).png().toFile('public/images/social-card.png')
await writeFile('public/.nojekyll', '')
