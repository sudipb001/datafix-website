# DataFix product website

Static marketing website for **DataFix** and **DataFix Magic**, native Windows data utilities.

Production: https://sudipb001.github.io/datafix-website/

## Stack and architecture

Vue 3 SFCs, strict TypeScript, Vite, Tailwind CSS 4, and Lucide (`@lucide/vue`). Vitest and Vue Test Utils cover content and navigation; optional Playwright/axe checks cover browser behavior.

`scripts/prerender.mjs` uses Vue's official server renderer at build time through Vite's SFC loader. It renders all six routes from `src/pages.ts` into individual HTML documents and adds page-specific metadata and JSON-LD. The browser hydrates the page selected by its base-path URL. Navigation uses ordinary anchors; no router or runtime server is required. Product links, guide content, mobile navigation, and native FAQ disclosures remain available with JavaScript disabled.

`package-lock.json` locks dependencies. TypeScript 5.9 is a compatibility pin because the tested Vue type checker cannot use TypeScript 7's package exports. Vue Test Utils 2.4.6 avoids newer transitive dependencies requiring a newer Node patch than local Node 24.13. Use Node 24 LTS and npm.

## Development and validation

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Use `npm` instead of `npm.cmd` where PowerShell's execution policy does not block npm's script shim. `npm run check` runs type validation, tests, and the verified production build. ESLint is not configured. `dist/` is generated and ignored.

After building, run `node scripts/browser-check.mjs`. It starts and closes its own static server with no SPA fallback and uses installed Google Chrome at 1440px, 390px, and 320px widths. It checks all six routes, direct navigation, refresh, keyboard controls and focus, mobile navigation, image loading, overflow, hydration errors, and axe WCAG A/AA rules through WCAG 2.2. All six pages are also checked with JavaScript disabled. Screenshots and results go to ignored `qa/`. No preview server is needed for this check. These checks do not replace a manual accessibility audit; no Lighthouse score is claimed.

## Project structure

- `src/components/`: header, hero, products, benefits, screenshot gallery, FAQ, footer.
- `src/data.ts`: typed product metadata, screenshots, FAQs, and JSON-LD.
- `src/pages.ts`: public route registry, unique metadata, URL helpers, breadcrumbs and page JSON-LD.
- `src/product-details.ts`: verified product-page copy and limitations.
- `src/components/ProductPage.vue`, `GuidePage.vue`, `GuideLinks.vue`, `Breadcrumbs.vue`: Phase 2 content and navigation.
- `src/style.css`: Tailwind, design tokens, responsive styling, focus and reduced motion.
- `index.html`: title, description, canonical, Open Graph, Twitter, favicon, prerender placeholders.
- `public/`: approved artwork, screenshots, robots, sitemap.
- `scripts/`: asset preparation, prerendering, production verification, browser QA.
- `tests/`: lightweight automated checks.
- `.github/workflows/deploy.yml`: official GitHub Pages actions.

## Phase 2 routes and maintenance

All paths below are relative to `/datafix-website/` and produce `<path>/index.html` in `dist/`:

| Path | Search intent |
| --- | --- |
| (home) | Choose between the two Windows products |
| `datafix/` | DataFix features, formats, preview and export |
| `datafix-magic/` | Magic validation, duplicate review and reusable workflows |
| `guides/remove-duplicate-rows-csv/` | Safely remove duplicate CSV records |
| `guides/clean-messy-excel-data/` | Clean spreadsheet values while preserving data integrity |
| `guides/fix-common-csv-problems/` | Diagnose CSV syntax, interpretation and data-quality issues |

Vite development uses HTML fallback for local convenience; the production build contains real documents at each route. Browser QA deliberately disables fallback to verify that those documents exist and survive refresh.

To add a product page, first verify its capabilities against actual implementation and record evidence in `docs/SEO-PHASE2-FEATURE-VERIFICATION.md`. Add approved assets and product metadata in `src/data.ts`, verified copy in `src/product-details.ts`, and a route entry in `src/pages.ts`. Extend the product-details keys and rendering as needed for a new product. Do not add another product merely by reusing another product's claims.

To add a tutorial, write useful standalone content in `GuidePage.vue` (or a dedicated component when its size warrants it), then register its unique path, H1, title, description and sharing image in `src/pages.ts`. Guide cards and related links use that registry. Extend the independent expected-route lists in the build verifier and browser QA, update the public sitemap, and run `npm run check` followed by browser QA.

The build generates `dist/sitemap.xml` from the page registry, so new registered routes are included automatically. `public/sitemap.xml` is a matching development copy; keep it in sync. Dates are omitted from the sitemap rather than fabricated from build time. Article JSON-LD omits publication dates and author until the owner can record a real publication event and verified identity. Add stable publication/modification dates when publishing and maintaining the content, never a build timestamp.

`npm run build` runs `scripts/verify-build.mjs`, which inspects every HTML document for unique titles/descriptions/H1s, self-referencing canonicals, Open Graph tags, parsed JSON-LD, meaningful static text, correct Store icon destinations, internal links and anchors, image dimensions/alt text, sitemap membership and namespace, robots, and byte-identical verification files. Homepage content and FAQs also have regression checks.

## Authentic assets

Both application directories were inspected read-only, excluding build outputs and caches. Only selected public artwork and sample-data screenshots were copied. No source project was modified.

| Website file (under `public/images/`) | Original source relative to application directory |
| --- | --- |
| `datafix-icon.png` | DataFix: `installer/msix/Assets/DataFix-Store-Logo.png` |
| `datafix-magic-icon.png` | DataFixMagic: `assets/branding/DataFixMagic-Icon-Master.png` |
| `screenshots/datafix-analysis.webp` | DataFix: `docs/store/screenshots/03-datafix-analysis.png` |
| `screenshots/datafix-preview.webp` | DataFix: `docs/store/screenshots/04-datafix-cleanup-preview.png` |
| `screenshots/magic-grid.webp` | DataFixMagic: `docs/store-screenshots/02-data-grid-dark.png` |
| `screenshots/magic-validation.webp` | DataFixMagic: `docs/store-screenshots/03-validation-results-dark.png` |

DataFix's executable icon is `docs/brand/DataFix.ico`, referenced by `src/DataFix.App/DataFix.App.csproj`. Its brand README confirms that the selected 300px PNG comes from the same original icon-only artwork. DataFix Magic's executable icon is `src/DataFixMagic.App/Assets/AppIcon.ico`, with `AppIcon-256.png` used by WPF. `docs/20-DECISIONS.md` confirms its selected 580px approved master supplies these assets. It is resized to 300px. No logo was invented or redrawn; proportions are preserved and PNGs palette optimized.

Both products have two real screenshots with example data, labeled in the gallery. Screenshots are WebP quality 88; Magic is resized to 1600×900. DataFix's older captures predate a sample-grid header whitespace fix recorded in `docs/STORE_RELEASE.md`; refresh them when the owner supplies updated UI captures. The social card is an original website share graphic composed with authentic icons, not an app screenshot.

`node scripts/prepare-assets.mjs` reproduces the assets from explicit local source paths using Sharp. It is an optional owner maintenance tool and is not run in CI. Original sources are never modified.

To replace icons, overwrite their `public/images/` files with approved icon-only PNGs, preserving proportions. To add screenshots, optimize real captures into WebP under `public/images/screenshots/`, then update the product screenshot array in `src/data.ts` with file paths, actual dimensions, captions, and alt text. Cards use the first image; the gallery uses every entry. Run `npm run check` and optional browser QA afterward.

## Product evidence and open questions

DataFix copy follows its README and completed workflow: CSV/XLSX/JSON/SQLite inspection, cleanup, previews, export, conversion, local offline processing. DataFix Magic copy follows its package description, implemented changelog entries, and real workflow QA in `docs/17-MICROSOFT-STORE.md`, `phase22b5-action-center.md`, and `phase22b6-contextual-guidance.md`: CSV/XLSX cleanup, configurable validation, exact/fuzzy duplicate review, recipes, batch processing. No AI claim is made. Magic privacy wording includes Store purchase checks as recorded in `14-SECURITY-PRIVACY.md` and `23-LICENSING-ARCHITECTURE.md`.

The supplied Store URLs are used exactly. Older local release notes say submission was pending; they do not establish current public availability. The web retrieval tool could not read either Store listing during implementation. The owner should confirm live listing availability, current Windows requirements, pricing, and screenshots against the published versions. The site directs visitors to Store listings for these details. No unsupported price, rating, release-status, Windows-version, benchmark, testimonial, or legal/contact information was invented.

## SEO

Essential headings, descriptions, Store links, and FAQs are in built HTML. `scripts/verify-build.mjs` fails for missing content, wrong canonical, broken anchors, missing assets, incorrect base paths, or missing JSON-LD. Structured data includes `WebSite` and two `SoftwareApplication` entities, accurate Store URLs, Windows OS, and confirmed features. No fabricated offers or reviews. FAQ JSON-LD is omitted; a general software marketing website does not qualify for Google's limited FAQ rich-result eligibility.

Homepage metadata stays in `index.html` and its original structured data in `src/data.ts`. New-page metadata and JSON-LD are centralized in `src/pages.ts`, with the build injecting them into each document. Sharing reuses the approved social card and relevant authentic screenshots. Crawler files live in `public/`; the build replaces the sitemap from the registry. All production URLs include `/datafix-website/`. Project Pages sites cannot control host-root `/robots.txt`; the sitemap can be submitted directly to Google Search Console and Bing Webmaster Tools. Following publication, the sitemap and crawlable internal links allow discovery of all six pages; discovery does not guarantee indexing or rich results.

## GitHub Pages deployment

1. Open the repository's **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
2. Ensure Actions is enabled and the `github-pages` environment permits `main`. Free Pages on GitHub Free requires a public repository.
3. Review, commit, and push to `main`. The workflow installs with `npm ci`, runs type checking and tests, builds and verifies static HTML, uploads `dist/`, then deploys using official Pages actions. Only the deployment job receives `pages: write` and `id-token: write`.
4. Check the **Actions** run, then visit https://sudipb001.github.io/datafix-website/ . Future pushes to `main` deploy automatically; manual workflow dispatch is also supported.

Vite base is `/datafix-website/`; asset, page, breadcrumb and homepage-fragment links respect that subpath. The existing workflow uploads all of `dist/`, including nested HTML documents. No deployment token or third-party hosting is needed. See [GitHub's official workflow instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

No commits, pushes, remote changes, or deployments were performed. After reviewing:

```powershell
git diff --check
git add README.md docs index.html src public/sitemap.xml scripts/prerender.mjs scripts/verify-build.mjs scripts/browser-check.mjs tests/site.test.ts
git commit -m "Add verified product pages and practical data cleaning guides"
git push origin main
```

## Phase 1 verification record

- TypeScript validation passed; all four Vitest tests passed.
- Production build passed, including full HTML, canonical, JSON-LD, Store destination, anchor, asset, robots, sitemap, and Pages subpath checks.
- Local Chrome checks passed at 1440×1000, 390×844, and 320×740, including mobile navigation, Escape, keyboard FAQ activation, image loading, no horizontal overflow, and no runtime/hydration errors.
- Axe's selected WCAG A/AA scans reported zero violations at all three widths. JavaScript-disabled product and FAQ checks passed. Desktop and mobile screenshots were visually inspected.
- `git diff --check` passed; the existing remote was preserved. No Lighthouse score is claimed, and deployment has not been run.

For Phase 2 verification and remaining owner checks, see [the implementation report](docs/SEO-PHASE2-REPORT.md) and [feature evidence matrix](docs/SEO-PHASE2-FEATURE-VERIFICATION.md).
