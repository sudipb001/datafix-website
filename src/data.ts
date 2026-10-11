export const siteUrl = 'https://sudipb001.github.io/datafix-website/'
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
export interface Screenshot { file: string; alt: string; caption: string; width: number; height: number }
export interface Product { id: string; name: string; label: string; description: string; formats: string[]; features: string[]; icon: string; storeUrl: string; screenshots: Screenshot[] }
export const products: Product[] = [
  { id: 'datafix', name: 'DataFix', label: 'THE EVERYDAY DATA TOOL', description: 'From messy file to clean export. Inspect, repair, and convert your data with a straightforward Windows workflow.', formats: ['CSV', 'XLSX', 'JSON', 'SQLite'], features: ['Find duplicates, blank values, and whitespace issues', 'Preview transformations before exporting', 'Convert between supported file formats'], icon: 'images/datafix-icon.png', storeUrl: 'https://apps.microsoft.com/detail/9mz4431hr5mz', screenshots: [
    { file: 'images/screenshots/datafix-analysis.webp', alt: 'DataFix analysis panel showing issues in a sample customer CSV', caption: 'Understand your data. Review detected issues before choosing your next step.', width: 1264, height: 1022 },
    { file: 'images/screenshots/datafix-preview.webp', alt: 'DataFix before and after cleanup preview using sample data', caption: 'See the difference. Preview cleanup changes before exporting a new file.', width: 1264, height: 1022 }
  ] },
  { id: 'datafix-magic', name: 'DataFix Magic', label: 'FOR REPEATABLE WORKFLOWS', description: 'Bring structure to recurring CSV and Excel work. Clean, validate, review duplicates, and reuse your cleaning steps.', formats: ['CSV', 'XLSX'], features: ['Validate data with configurable rules', 'Review exact and fuzzy duplicate matches', 'Reuse cleaning recipes and process folders in batches'], icon: 'images/datafix-magic-icon.png', storeUrl: 'https://apps.microsoft.com/detail/9nfftr5fv3wv', screenshots: [
    { file: 'images/screenshots/magic-grid.webp', alt: 'DataFix Magic dark theme showing its data grid and cleaning tools', caption: 'A workspace for CSV and Excel. Inspect your file and choose a cleaning operation.', width: 1600, height: 900 },
    { file: 'images/screenshots/magic-validation.webp', alt: 'DataFix Magic validation results panel with sample data', caption: 'Check with confidence. Review validation results alongside your data.', width: 1600, height: 900 }
  ] }
]
export const navigation = [{ id: 'products', label: 'Products' }, { id: 'features', label: 'Features' }, { id: 'screenshots', label: 'Screenshots' }, { id: 'faq', label: 'FAQ' }]
export const faqs = [
  { question: 'What is DataFix?', answer: 'DataFix is a native Windows utility for inspecting, cleaning, repairing, transforming, and converting CSV, Excel XLSX, JSON, and SQLite files. Ordinary workflows do not require programming knowledge.' },
  { question: 'What is DataFix Magic?', answer: 'DataFix Magic is a Windows application focused on CSV and Excel XLSX business data. It adds configurable validation, exact and fuzzy duplicate review, reusable cleaning recipes, and folder-based batch processing.' },
  { question: 'What file formats does DataFix support?', answer: 'DataFix supports CSV, Excel XLSX, JSON, and SQLite. DataFix Magic focuses on CSV and XLSX data files; its exported recipe JSON is a workflow format, not general JSON data import.' },
  { question: 'Can DataFix clean Excel and CSV files?', answer: 'Yes. DataFix can inspect CSV and XLSX files for issues such as duplicate rows, blank values, and unwanted whitespace, preview supported transformations, and export a cleaned file.' },
  { question: 'Can I use these apps on Windows 11?', answer: 'Both applications are built for Windows desktop. Check each Microsoft Store listing for current system requirements, device compatibility, and availability before purchasing.' },
  { question: 'Where can I get DataFix and DataFix Magic?', answer: 'Use the “View on Microsoft Store” links on this page to open the official listing for each application. The Store provides current pricing, availability, and installation details.' },
  { question: 'Does DataFix upload my files to the cloud?', answer: 'DataFix processes files offline on your computer, with no cloud sync or telemetry. DataFix Magic also processes data locally; it checks your purchase through Microsoft Store on Windows. File contents are not part of that license check.' },
  { question: 'Which app should I choose?', answer: 'Choose DataFix for straightforward cleanup and conversion across CSV, XLSX, JSON, and SQLite. Consider DataFix Magic for recurring CSV/XLSX work that needs validation, duplicate review, reusable recipes, or batch processing.' }
]
export const structuredData = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': `${siteUrl}#website`, name: 'DataFix', url: siteUrl },
  ...products.map(p => ({ '@type': 'SoftwareApplication', '@id': `${siteUrl}#${p.id}`, name: p.name, description: p.description, url: p.storeUrl, installUrl: p.storeUrl, operatingSystem: 'Windows', applicationCategory: 'UtilitiesApplication', image: `${siteUrl}${p.icon}`, featureList: p.features }))
] }
