# Project Technical Details — Web Politisi

Website personal branding untuk Ridho Saputra, anggota DPRD dari Partai GEMA (Gerakan Muda Mendunia). Fully built and functional with 5 main pages, theme switching, WhatsApp integration, and static data layer.

---

## 1. System Overview & Tech Stack
* **Framework**: React 19 + Vite 8
* **Routing**: React Router DOM v7
* **Icons**: React Icons (Feather + Font Awesome)
* **Styling**: Vanilla CSS with CSS custom properties (design tokens in `src/index.css`)
* **Data Layer**: Static JS files in `src/data/` — dummy content, CMS integration planned for future
* **Theme System**: 6 color variants (blue default, red, green, purple, teal, orange) via `data-theme` attribute + localStorage
* **WhatsApp Integration**: Forms submit via `wa.me` deep links with pre-formatted messages
* **Google Font**: Plus Jakarta Sans (loaded in `index.html`)

---

## 2. Active Routing & Navigation

| Path | Component | Menu |
|------|-----------|------|
| `/` | `HomePage` | Beranda |
| `/aspirasi` | `AspirasiPage` | Aspirasi |
| `/aspirasi/transparansi` | `TransparansiPage` | (sub-page) |
| `/kabar` | `KabarPage` | Kabar |
| `/kabar/:slug` | `KabarDetailPage` | (sub-page) |
| `/rekam-jejak` | `RekamJejakPage` | Rekam Jejak |
| `/relawan` | `RelawanPage` | Relawan |
| `/pengaturan-tampilan-rs` | `SettingsPage` | (hidden — not in nav) |

**Navbar**: Fixed top with glassmorphism on scroll, 5 main links + CTA button, mobile hamburger drawer.

---

## 3. Permanently Cleaned Up & Removed Features
* Removed default Vite boilerplate (`App.css` content, `assets/react.svg` reference)
* No backend/CMS — all data is static JSON

---

## 4. Key Configurations & Restorations
* **Theme switching**: Hidden at `/pengaturan-tampilan-rs`, persisted in `localStorage` key `web-politisi-theme`
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
* No automated deployments

---

## 6. Verification Pipeline & Smoke Tests
```bash
npm run build    # Must pass with 0 errors
npm run dev      # Visual verification at http://localhost:5173
```
