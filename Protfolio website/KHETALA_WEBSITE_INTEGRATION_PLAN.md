# Technical Inspection & Integration Plan: Digital Khetala Hisab-Kitab on GitHub Pages

**Date:** 2026-11-11  
**Target Repository:** [`saurav-karki1/portfolio-website`](https://github.com/saurav-karki1/portfolio-website)  
**Live Custom Domain:** `https://www.sauravkarki1.com.np/`  
**Target Sub-path:** `/khetala/` (`https://www.sauravkarki1.com.np/khetala/`)  
**Status:** Inspection Complete — Pending User Approval  

---

## 1. Executive Summary

A comprehensive pre-implementation inspection was conducted on the repository hosting `https://www.sauravkarki1.com.np/`. The repository currently serves Saurav Karki's personal portfolio as a static site hosted on GitHub Pages behind Cloudflare CDN.

**Key Finding:** Adding a completely independent static product website for **Digital Khetala Hisab-Kitab** under `/khetala/` is **100% feasible and natively supported** by the current hosting architecture without requiring any server changes, third-party backend hosting, or changes to DNS/domain settings.

However, an important repository directory hierarchy nuance was uncovered during this inspection (the repository root `D:\protfolio` contains an internal nested copy named `Protfolio website`), which dictates the exact folder placement required so GitHub Pages routes the URL cleanly to `https://www.sauravkarki1.com.np/khetala/`.

---

## 2. Existing Architecture & Asset Inspection

The current portfolio architecture is purely static HTML5, CSS3, and modern Vanilla JavaScript with WebGL.

### 2.1 File Inventory & Purpose

| File / Directory | Size / Lines | Category | Function & Dependency |
|---|---|---|---|
| `index.html` | 35.8 KB / 736 lines | Active Production Page | Primary single-page portfolio. Loads Three.js WebGL hero, design tokens, responsive sections (`#hero`, `#about`, `#skills`, `#work`, `#contact`), JSON-LD Person schema. |
| `about.html` | 3.4 KB | Legacy Page | Standalone page from earlier portfolio version. Refers to `aboutstyle.css` and `Style.css`. |
| `contact.html` | 2.5 KB | Legacy Page | Standalone contact page from earlier version. |
| `project.html` | 3.1 KB | Legacy Page | Standalone project showcase from earlier version. |
| `Final/index.html` | 278 lines | Legacy / Backup | Complete alternative single-page build with its own `Final/css/` and `Final/js/`. Accessible live at `.../Final/`. |
| `css/tokens.css` | 95 lines | Active Styling | CSS custom properties (color variables, spacing, shadows, z-indices). |
| `css/base.css` | 225 lines | Active Styling | CSS resets, global typography (Space Grotesk, Inter, JetBrains Mono), container layouts. |
| `css/nav.css` | 272 lines | Active Styling | Header, glassmorphic navigation bar, hamburger menu, mobile drawer. |
| `css/hero.css` | 388 lines | Active Styling | Hero layout, 3D WebGL canvas container, responsive ordering. |
| `css/about.css` | 129 lines | Active Styling | About bio card and stats grid. |
| `css/skills.css` | 135 lines | Active Styling | Skill badges and category cards. |
| `css/work.css` | 220 lines | Active Styling | Project showcase cards and links. |
| `css/contact.css` | 380 lines | Active Styling | Contact section, input controls, social media buttons. |
| `css/footer.css` | 66 lines | Active Styling | Minimalist footer and back-to-top button. |
| `Style.css` / `Style - Copy.css` | 9.3 KB | Legacy Styling | Monolithic stylesheet from initial site version. |
| `js/three.min.js` | 128 KB | Vendor Library | Three.js (r128) for 3D graphics. |
| `js/hero3d.js` | 203 lines | Active Script | Interactive 3D wireframe mesh animation in hero canvas. |
| `js/nav.js` | 81 lines | Active Script | Mobile drawer open/close, navbar scroll blur, active section spy. |
| `js/scroll-anim.js` | 103 lines | Active Script | IntersectionObserver for fade/slide reveal animations. |
| `js/tilt.js` | 79 lines | Active Script | 3D card tilt physics on pointer hover. |
| `js/parallax.js` | 71 lines | Active Script | Floating element parallax effect. |
| `js/contact.js` | 78 lines | Active Script | Contact form validation and interaction handling. |
| `Script.js` | 2.3 KB | Legacy Script | Earlier script for mobile menu toggling. |
| `images/photo.jpeg` | 165 KB | Active Asset | Saurav's profile picture; also serves as favicon and Open Graph preview image. |
| `robots.txt` | 77 bytes | SEO Configuration | Allows all crawlers, points to `https://www.sauravkarki1.com.np/sitemap.xml`. |
| `sitemap.xml` | 275 bytes | SEO Configuration | XML sitemap containing only `https://www.sauravkarki1.com.np/`. |

---

## 3. Repository Structure & Workspace Discovery

During terminal inspection, a critical repository structure characteristic was identified:

1. **Git Repository Root:** `D:\protfolio` (contains `.git/`).
2. **Current Editor Workspace:** `D:\protfolio\Protfolio website` (a duplicate folder committed inside git on 2026-07-24 in commit `4a2f948`).
3. **Git Tracking Status:** Git currently tracks both the root files (`D:\protfolio\*`) AND the nested folder (`D:\protfolio\Protfolio website\*`).
4. **Git Branch Tracking:**
   - Active branch: `main` (commit `1223684`).
   - `origin/main` is identical to local `main`.
   - Local `main`'s upstream was historically set to `origin/master`, which is why `git status` reports ahead by 6 commits relative to `origin/master`.

### Routing Implication for `/khetala/`:
GitHub Pages serves files directly from the **repository root** (`D:\protfolio`).
- If a folder is placed at `D:\protfolio\khetala\`, GitHub Pages serves it at:  
  **`https://www.sauravkarki1.com.np/khetala/`** (the desired URL).
- If placed inside the nested folder `D:\protfolio\Protfolio website\khetala\`, GitHub Pages would serve it at:  
  `https://www.sauravkarki1.com.np/Protfolio%20website/khetala/` (unwanted).

**Safest Strategy:** Ensure the new `/khetala/` website directory is created at the repository root level (and mirrored if necessary to preserve local IDE visibility).

---

## 4. GitHub Pages Deployment Configuration

- **Publishing Source:** GitHub Pages is configured to build and deploy from the `main` branch root (`/`).
- **Build Engine:** Standard GitHub Pages static file server (no custom GitHub Actions workflow file exists in `.github/workflows/`).
- **Deployment Cadence:** Commits pushed to `origin/main` are immediately deployed by GitHub's internal Pages pipeline within ~60 seconds.
- **Subdirectory Handling:** Verified live via HTTP GET requests:
  - `https://www.sauravkarki1.com.np/Final/` returns `HTTP 200 OK` (renders `Final/index.html`).
  - `https://www.sauravkarki1.com.np/Protfolio%20website/` returns `HTTP 200 OK`.
  - **Conclusion:** Any new directory containing an `index.html` at the repo root automatically becomes an accessible route.

---

## 5. Domain, DNS & CNAME Inspection

- **Git CNAME File:** No physical `CNAME` file exists in the git repository tree or commit history.
- **GitHub Custom Domain:** The custom domain `www.sauravkarki1.com.np` is configured in GitHub Pages repository settings directly.
- **Apex Domain Handling:** Verified live that `https://sauravkarki1.com.np/` issues a `301 Moved Permanently` redirecting to `https://www.sauravkarki1.com.np/` with GitHub Pages headers (`x-github-request-id: FD12:...`).
- **DNS / Edge Network:**
  - Nameservers: `jeff.ns.cloudflare.com`, `kara.ns.cloudflare.com`.
  - Cloudflare proxy is active in front of GitHub Pages edge (Varnish cache / Fastly).
  - SSL/TLS is handled seamlessly across all sub-paths under `https://www.sauravkarki1.com.np/*`.
- **Integrity Rule:** No modifications to DNS, CNAME, or GitHub Pages settings are required or permitted.

---

## 6. Conflict & Risk Analysis

| Area | Potential Conflict | Mitigation / Solution |
|---|---|---|
| **Asset Paths** | Using root-relative paths like `<link href="/css/style.css">` would accidentally pull the portfolio's stylesheet. | Use **strictly relative paths** inside `/khetala/` (e.g. `href="css/khetala.css"` or `href="./css/khetala.css"`). |
| **Trailing Slash** | Requesting `.../khetala` without trailing slash causes GitHub Pages to issue a 301 redirect to `.../khetala/`. | All canonical tags and internal links must explicitly include the trailing slash (`/khetala/`). |
| **CSS Leakage** | CSS class collisions if global tags (`body`, `h1`, `button`, `.btn`) are shared. | Complete isolation: Khetala styles must live in `/khetala/css/` with a dedicated namespace prefix (e.g. `.kh-btn`, `.kh-hero`) and independent CSS custom properties. |
| **JS Global Scope** | Portfolio scripts (Three.js, Tilt, Hero3D) running on Khetala pages. | Zero script sharing: `/khetala/index.html` will only load dedicated scripts from `/khetala/js/`. |
| **SEO Collisions** | Search engines indexing Khetala under Saurav Karki's personal portfolio metadata. | Independent Open Graph tags, Twitter cards, independent JSON-LD SoftwareApplication schema, and separate sitemap entries for `/khetala/`. |
| **SPA / Deep Links** | Using client-side routers (e.g. React Router) will return 404 when refreshing sub-paths on GitHub Pages without 404 tricks. | Use static multi-page architecture (`index.html`, `np/index.html`, `privacy.html`, `terms.html`) which works reliably with 100% uptime on GitHub Pages. |

---

## 7. Recommended Folder Structure

To ensure 100% clean isolation without altering or endangering any existing portfolio files:

```
D:\protfolio\
├── khetala\                               # Completely isolated new website root
│   ├── index.html                         # Primary English Landing Page
│   ├── np\
│   │   └── index.html                     # Dedicated Nepali Landing Page (SEO friendly)
│   ├── privacy.html                       # Privacy Policy (Required for Google Play & APK)
│   ├── terms.html                         # Terms of Service
│   ├── css\
│   │   ├── khetala-tokens.css             # Khetala brand colors (Earthy greens, gold, slate)
│   │   └── khetala-style.css              # Modern, responsive product UI styles
│   ├── js\
│   │   ├── khetala-main.js                # Mobile nav, accordion, smooth scroll
│   │   ├── khetala-i18n.js                # Language switcher & localStorage persistence
│   │   └── khetala-download.js            # APK download counter / modal / direct link
│   ├── images\
│   │   ├── icon.png                       # App icon (high-res logo)
│   │   ├── favicon.ico                    # Khetala custom favicon
│   │   ├── og-khetala.png                 # Social share banner (1200x630)
│   │   ├── mockups\                       # App screenshots in phone frames
│   │   └── features\                      # Feature illustration icons
│   └── downloads\                         # Direct download assets
│       ├── version.json                   # Version manifest for in-app update checks
│       └── README.md                      # Release instructions
│
├── css\                                   # UNTOUCHED: Existing portfolio styles
├── js\                                    # UNTOUCHED: Existing portfolio scripts
├── images\                                # UNTOUCHED: Existing portfolio images
├── Final\                                 # UNTOUCHED: Legacy folder
├── index.html                             # UNTOUCHED: Existing portfolio landing page
├── robots.txt                             # Preserved (can add /khetala/ sitemap pointer)
└── sitemap.xml                            # Preserved (can add /khetala/ URLs)
```

---

## 8. Localization Strategy (English & Nepali)

Digital Khetala Hisab-Kitab serves farmers, agricultural workers, labor contractors, and agri-businesses in Nepal. Bilingual accessibility is essential.

### Recommended Dual-Layer Implementation:
1. **URL-Level Dual Routing (Best for SEO & Google Search):**
   - English default: `https://www.sauravkarki1.com.np/khetala/`
   - Nepali default: `https://www.sauravkarki1.com.np/khetala/np/`
   - Linked via canonical and `hreflang` headers:
     ```html
     <link rel="alternate" hreflang="en" href="https://www.sauravkarki1.com.np/khetala/">
     <link rel="alternate" hreflang="ne" href="https://www.sauravkarki1.com.np/khetala/np/">
     ```
2. **Devanagari Typography Optimization:**
   - Preconnect and load Google Fonts: `Mukta` or `Noto Sans Devanagari` alongside Latin font `Plus Jakarta Sans`.
   - CSS rule scoped to Nepali text:
     ```css
     :lang(ne) { font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif; line-height: 1.6; }
     ```
3. **Instant Interactive Language Switcher:**
   - A toggle button (EN | नेपाली) in the header.
   - Saves language preference in `localStorage.setItem('khetala_lang', 'ne')`.
   - Allows instant switching between `/khetala/` and `/khetala/np/`.

---

## 9. Preservation of Existing Portfolio

- **Zero Global Changes:** No edits will be made to any file in `css/`, `js/`, `images/`, or root `index.html`.
- **No Shared Build Process:** No Webpack/Vite/Parcel configuration is required that could interfere with portfolio files.
- **Independent Git History:** The new files in `khetala/` can be added cleanly in a single, well-documented commit.
- **Future Integration:** In the future (if desired), a featured project card linking to `/khetala/` can be added to the portfolio's Work section, but the portfolio will continue functioning exactly as it does today.

---

## 10. Infrastructure for Future APK Distribution & Analytics

### 10.1 APK Distribution Architecture
1. **GitHub Releases Storage (Recommended for binary files):**
   - Storing large `.apk` binaries directly in Git bloats the repository history and triggers GitHub's 100MB file limit / Git LFS quotas.
   - Recommended pattern: Attach release APKs to GitHub Releases (e.g., `https://github.com/saurav-karki1/portfolio-website/releases/download/v1.0.0/DigitalKhetala_v1.0.0.apk`).
   - The `/khetala/` landing page "Download APK" button links directly to this release asset or an alias.
2. **In-App Update Manifest (`version.json`):**
   - Host a lightweight static JSON manifest at `https://www.sauravkarki1.com.np/khetala/downloads/version.json`:
     ```json
     {
       "app_name": "Digital Khetala Hisab-Kitab",
       "latest_version": "1.0.0",
       "version_code": 1,
       "release_date": "2026-11-15",
       "download_url": "https://github.com/saurav-karki1/portfolio-website/releases/download/v1.0.0/DigitalKhetala.apk",
       "apk_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
       "force_update": false,
       "changelog": {
         "en": "Initial public release of Digital Khetala Hisab-Kitab.",
         "ne": "डिजिटल खेतला हिसाब-किताबको पहिलो सार्वजनिक संस्करण।"
       }
     }
     ```
   - The Android app checks this URL on startup to prompt users when an update is available.
3. **Android Security & Installation UX:**
   - Include clear visual steps on the website explaining how to permit "Install Unknown Apps" on Android 10+.
   - Provide the SHA-256 checksum for verification.
4. **Mandatory Store & Regulatory Pages:**
   - Host `/khetala/privacy.html` and `/khetala/terms.html` to fulfill Google Play Store and Android security compliance.

### 10.2 Analytics Architecture
1. **Cloudflare Web Analytics (Zero-Config & Privacy-Friendly):**
   - Since `sauravkarki1.com.np` already routes through Cloudflare, Cloudflare Web Analytics can be activated directly without adding third-party tracking scripts.
2. **Google Analytics 4 (GA4) with Custom Event Tracking:**
   - Add a lightweight GA4 tag scoped to `/khetala/`.
   - Track custom events:
     - `apk_download_click` (tracks when a user initiates APK download).
     - `language_switch` (tracks EN vs NE preference).
     - `scroll_depth_features` / `faq_expand`.

---

## 11. Recommended Implementation & Deployment Procedure

Following your approval, the implementation will strictly follow these steps:

1. **Phase 1 (Assets & Design Preparation):**
   - Create brand tokens in `khetala/css/khetala-tokens.css` with an agricultural color palette (fresh leaf green, harvest gold, deep slate, clean card surfaces).
   - Prepare placeholder or final app mockup imagery and app icons in `khetala/images/`.
2. **Phase 2 (HTML & Content Authoring):**
   - Author `khetala/index.html` (English landing page) featuring:
     - App Value Proposition & Hero Section with direct "Download APK" CTA.
     - Key Features (Daily wage calculation, labor attendance, crop-wise expense tracking, offline support).
     - App Screenshots Gallery / Phone Mockups.
     - Security & Offline-First highlights.
     - FAQ section with accordion.
     - Footer with links to Privacy Policy and Terms.
   - Author `khetala/np/index.html` with complete Nepali localization and Devanagari typography.
   - Author `khetala/privacy.html` and `khetala/terms.html`.
3. **Phase 3 (Interactive Scripts):**
   - Implement `khetala/js/khetala-main.js` (lightweight navigation and interactive widgets).
   - Implement `khetala/js/khetala-i18n.js` (language toggle and persistence).
   - Implement `khetala/downloads/version.json`.
4. **Phase 4 (Validation & Verification):**
   - Verify all paths are strictly relative.
   - Verify that no existing portfolio files in `css/`, `js/`, `images/`, or root `index.html` have been touched.
   - Perform local browser preview.
5. **Phase 5 (Commit & Push to GitHub):**
   - Commit only the new `/khetala/` directory.
   - Push to `origin/main`.
   - Verify live URL: `https://www.sauravkarki1.com.np/khetala/`.

---

## 12. Strict Adherence Statement

- **Existing portfolio files:** 0 modifications made.
- **CNAME / DNS / GitHub Pages settings:** 0 changes made.
- **Frontend frameworks:** Pure modern HTML/CSS/JS (no heavy framework or build tools required).
- **Deployment status:** Inspection and planning only. Awaiting explicit user confirmation before proceeding.
