# Project Technical Details — Web Politisi

Website personal branding untuk Ridho Saputra, anggota DPRD dari Partai GEMA (Gerakan Muda Mendunia). Deployed and fully functional.

---

## 1. System Overview & Tech Stack
* **Framework**: React 19 + Vite 8
* **Routing**: React Router DOM v7 (Switched to **HashRouter** for seamless GitHub Pages routing)
* **Icons**: React Icons (Feather + Font Awesome)
* **Styling**: Vanilla CSS with CSS custom properties (design tokens in `src/index.css`)
* **Data Layer**: Static JS files in `src/data/` — dummy content, CMS integration planned for future
* **Theme System**: 6 color variants (red default, blue, green, purple, teal, orange) via `data-theme` attribute + localStorage
* **WhatsApp Integration**: Forms submit via `wa.me` deep links with pre-formatted messages
* **Google Font**: Plus Jakarta Sans (loaded in `index.html`)

---

## 2. Active Routing & Navigation

Routing uses `#` (HashRouter) to guarantee page refreshes do not trigger 404 errors on static hosting:

| Path | Component | Menu |
|------|-----------|------|
| `#/` | `HomePage` | Beranda |
| `#/aspirasi` | `AspirasiPage` | Aspirasi |
| `#/aspirasi/transparansi` | `TransparansiPage` | (sub-page) |
| `#/kabar` | `KabarPage` | Kabar |
| `#/kabar/:slug` | `KabarDetailPage` | (sub-page) |
| `#/rekam-jejak` | `RekamJejakPage` | Rekam Jejak (Concept 5 Checkerboard) |
| `#/relawan` | `RelawanPage` | Relawan |
| `#/pengaturan-tampilan-rs` | `SettingsPage` | (hidden — not in nav) |

**Navbar**: Fixed top with glassmorphism on scroll, 5 main links + CTA button, mobile hamburger drawer.

---

## 3. Permanently Cleaned Up & Removed Features
* Removed default Vite boilerplate (`App.css` content, `assets/react.svg` reference)
* No backend/CMS — all data is static JSON
* Removed old horizontal scrolling timeline in favor of the **Concept 5: Checkerboard Matrix (Aspirasi vs Realisasi)**.

---

## 4. Key Configurations & Restorations
* **Vite Base**: Configured in `vite.config.js` as `base: "/web_branding/"` for GitHub Pages.
* **Deployment URL**: Live at [https://doni-wahyudi.github.io/web_branding/](https://doni-wahyudi.github.io/web_branding/)
* **Theme switching**: Hidden at `#/pengaturan-tampilan-rs`, persisted in `localStorage` key `web-politisi-theme`
* **WhatsApp number**: Configured in `src/data/siteConfig.js` → `whatsapp: "6281234567890"` (placeholder)
* **Images**: Generated AI images stored in `public/images/`
* **SEO**: Meta tags configured in `index.html` for Indonesian audience

---

## 5. Guidelines for Future Chats & Agents
* Always use CSS custom properties from `src/index.css` — never hardcode colors
* Theme variants are defined via `[data-theme="xxx"]` selectors in `index.css`
* Blog content uses static data in `src/data/blogPosts.js` — each post has a `slug` for routing
* Aspirations use static data in `src/data/aspirations.js` — status: `received`, `processing`, `done`
* No git commits or pushes without explicit user instruction
* Deploys are run via `npm run deploy` which builds and pushes the `dist/` directory to `gh-pages` branch

---

## 6. Verification Pipeline & Smoke Tests
```bash
npm run build    # Must pass with 0 errors
npm run deploy   # Builds and deploys latest to GitHub Pages
```
