# SEO Expert India – WordPress Theme & One-Click Demo (v1.0.0)

This bundle turns the SEO Expert India website into a WordPress website you can edit with Elementor.

| Package | What it is |
|---|---|
| `seoexpertindia-theme.zip` | The WordPress theme (header, Services mega menu, footer, styles, enquiry form mailer, SEO tags) |
| `seoexpertindia-demo-importer.zip` | Plugin that imports the complete website in one click |
| `seoexpertindia-elementor-templates.zip` | All page layouts and the footer as Elementor JSON templates, plus images and global design settings |

## System requirements
- WordPress 6.4 or newer
- PHP 8.0 or newer (8.1–8.3 recommended), memory limit 128 MB or more (256 MB recommended)
- Writable `wp-content/uploads` folder
- Pretty permalinks (the importer switches “Plain” permalinks to “Post name” automatically)
- Server email (PHP `mail()` or an SMTP plugin) for the enquiry forms

## Required plugins
- **Elementor** (free) 3.16 or newer – required
- **Elementor Pro** – recommended (theme-builder footer, Pro widgets). Not needed for the site to display.
- **Rank Math SEO** – optional. When active, Rank Math controls titles, descriptions and site schema; the theme keeps page-specific schema (Service, FAQ) without duplicates.
- Optional: an SMTP plugin (e.g. WP Mail SMTP) for reliable email delivery.

## Installation
1. **Backup** your site (files + database) if it already has content.
2. *Appearance → Themes → Add New → Upload Theme* → choose `seoexpertindia-theme.zip` → **Install** → **Activate**.
3. *Plugins → Add New* → install and activate **Elementor** (and Elementor Pro / Rank Math if you use them).
4. *Plugins → Add New → Upload Plugin* → choose `seoexpertindia-demo-importer.zip` → **Install** → **Activate**.
5. Go to **Dashboard → SEO Expert India → Import Demo**.
6. Check that every required item is green, tick the backup confirmation, click **Import Complete Website** and keep the tab open until the bar reaches 100 % (usually 1–3 minutes).
7. Open the site. Edit any page with *Edit with Elementor*.

## What the import creates
- 36 pages at the original addresses: Home, About, Services, Recent Work, Testimonials, Contact, FAQ and the 29 `/service/…/` pages
- 129 images in the Media Library (folder `uploads/seoexpertindia-demo`) with alt text
- Header menu “SEO Expert India – Primary” with the three-column Services mega menu, assigned to the header
- Global footer as an Elementor template (“SEO Expert India Footer”; set as theme-builder footer when Elementor Pro is active)
- Elementor Site Settings: brand colours, fonts, container width
- Homepage = Home page, Posts page = Blog
- Page titles, meta descriptions, social tags and structured data (also copied into Rank Math / Yoast fields)

It **does not** create users or comments and never changes passwords, admin accounts, hosting or database settings.

### Running the import again
The import is safe to repeat. Every imported item is tagged, so a second run **updates** the same pages,
images, menu and footer instead of creating duplicates. Note: it restores the demo version of those pages,
so edits you made to imported pages are replaced — duplicate a page first if you want to keep your version.

## Editing
- **Pages:** *Pages → Edit with Elementor*. Headings, text, images, buttons and links are separate widgets; complex parts (forms, tables, tab panels, icons) are HTML widgets you can edit too.
- **Header menu:** *Appearance → Menus*. Items under “Services” whose own sub-items exist become mega-menu columns. Add `sei-icon-Search` (or another icon name) in an item's *CSS Classes* to change its icon.
- **Header logo / tagline / Quick Consultation button:** *Appearance → Customize → Site Identity* and *SEO Expert India Header*.
- **Footer:** *Templates → Saved Templates → SEO Expert India Footer* (or *Theme Builder → Footer* with Elementor Pro).
- **Enquiry emails:** *Settings → SEO Expert India Enquiries* – recipients and sender address.
- **SEO:** the *SEO Expert India – SEO* box under each page, or Rank Math when active.

## Enquiry forms
All contact forms send an HTML email through WordPress (`wp_mail`) to the configured recipients
(default: info@seoexpertindia.biz, lucky.magarde@gmail.com, lokesh@seoexpertindia.biz; sender wordpress@your-domain).
Fields are validated in the browser and on the server, spam is filtered by a hidden honeypot field and a minimum fill time,
and nothing is stored in the database. No credentials are exposed in the page.

## Troubleshooting
| Problem | Fix |
|---|---|
| Import button disabled | Fix the red items in the requirements table and tick the confirmation box. |
| Import stops part-way | Click **Import Complete Website** again – finished items are reused, not duplicated. If it keeps failing, raise PHP `memory_limit` to 256M. |
| Pages show 404 | *Settings → Permalinks* → choose **Post name** → **Save**. |
| Layout looks unstyled after editing | *Elementor → Tools → Regenerate CSS & Data*, then clear any caching plugin / CDN. |
| Images missing | Make sure `wp-content/uploads` is writable and re-run the import. |
| Emails not arriving | Install an SMTP plugin or ask your host to enable PHP mail; set SPF/DKIM for your domain; check spam folders. |
| Rank Math shows different titles | Rank Math is active, so its fields win. The importer pre-fills them; edit them in Rank Math. |

## Changelog
### 1.0.0
- First release: theme, one-click demo importer, Elementor templates and complete bundle.
