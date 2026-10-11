import { asset, products, siteUrl, structuredData } from './data'

export interface Page { path: string; title: string; description: string; h1: string; kind: 'home' | 'product' | 'guide'; productId?: string; image: string; imageAlt: string }
export const pages: Page[] = [
  { path: '', kind: 'home', title: 'DataFix & DataFix Magic | Windows Data Cleaning Tools', description: 'Discover DataFix and DataFix Magic, Windows tools for cleaning, inspecting, transforming, and validating data. Explore the apps on Microsoft Store.', h1: 'Messy Data? Meet Your Fix.', image: 'images/social-card.png', imageAlt: 'DataFix and DataFix Magic — Windows tools for cleaner data' },
  { path: 'datafix/', kind: 'product', productId: 'datafix', title: 'DataFix — CSV, Excel & Data Cleaning Tool for Windows', description: 'Inspect, clean, preview, and convert CSV, XLSX, JSON, and SQLite data with DataFix for Windows. Explore real screenshots and its Microsoft Store listing.', h1: 'Clean messy data with DataFix for Windows', image: 'images/screenshots/datafix-analysis.webp', imageAlt: 'DataFix analysis panel with sample CSV data' },
  { path: 'datafix-magic/', kind: 'product', productId: 'datafix-magic', title: 'DataFix Magic — Windows Data Cleanup & Transformation Tool', description: 'Clean CSV and XLSX data, check validation rules, review duplicates, and reuse recipes with DataFix Magic for Windows. See its workflow and screenshots.', h1: 'Build repeatable cleanup workflows with DataFix Magic', image: 'images/screenshots/magic-grid.webp', imageAlt: 'DataFix Magic data grid and cleaning workspace' },
  { path: 'guides/remove-duplicate-rows-csv/', kind: 'guide', title: 'How to Remove Duplicate Rows from a CSV File on Windows', description: 'Choose a safe duplicate rule, clean a CSV using a spreadsheet or DataFix, and validate the result with a worked example and a practical checklist.', h1: 'How to remove duplicate rows from a CSV file on Windows', image: 'images/screenshots/datafix-preview.webp', imageAlt: 'DataFix before and after cleanup preview' },
  { path: 'guides/clean-messy-excel-data/', kind: 'guide', title: 'How to Clean Messy Excel Data on Windows', description: 'Clean spaces, duplicates, blank rows, and inconsistent spreadsheet values while protecting identifiers, dates, formulas, and your original workbook.', h1: 'How to clean messy Excel data on Windows', image: 'images/screenshots/magic-validation.webp', imageAlt: 'DataFix Magic validation results with sample data' },
  { path: 'guides/fix-common-csv-problems/', kind: 'guide', title: 'Common CSV File Problems and How to Fix Them', description: 'Diagnose CSV delimiters, quoting, encoding, dates, leading zeros, and uneven rows. Separate malformed files from import settings and data-quality issues.', h1: 'Common CSV file problems and how to fix them', image: 'images/screenshots/magic-grid.webp', imageAlt: 'DataFix Magic workspace for inspecting imported data' },
]
export const pageHref = (path = '') => asset(path)
export const guides = pages.filter(p => p.kind === 'guide')
export function resolvePage(pathname: string): Page | undefined {
  const base = import.meta.env.BASE_URL
  if (!pathname.startsWith(base)) return undefined
  const path = pathname.slice(base.length).replace(/index\.html$/, '').replace(/\/$/, '')
  return pages.find(p => p.path.replace(/\/$/, '') === path)
}
export function pageStructuredData(page: Page) {
  if (page.kind === 'home') return structuredData
  const url = siteUrl + page.path
  const product = products.find(p => p.id === page.productId)
  const entity = product ? { '@type': 'SoftwareApplication', '@id': url + '#app', name: product.name, description: page.description, url, installUrl: product.storeUrl, operatingSystem: 'Windows', applicationCategory: 'UtilitiesApplication', image: siteUrl + product.icon, featureList: product.features } : { '@type': 'TechArticle', '@id': url + '#article', headline: page.h1, description: page.description, url, mainEntityOfPage: url, image: siteUrl + page.image }
  // Dates and author are omitted until an actual publication event / identity is confirmed.
  return { '@context': 'https://schema.org', '@graph': [entity, { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, ...(page.kind === 'guide' ? [{ '@type': 'ListItem', position: 2, name: 'Guides', item: siteUrl + '#guides' }] : []), { '@type': 'ListItem', position: page.kind === 'guide' ? 3 : 2, name: product?.name ?? page.h1, item: url } ] }] }
}
