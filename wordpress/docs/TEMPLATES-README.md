# SEO Expert India – Elementor templates (v1.0.0)

These are the Elementor layouts of every page of the SEO Expert India website plus the global footer.

**Recommended:** use the *SEO Expert India – Demo Importer* plugin. It imports these same layouts,
puts every image in the Media Library and fixes all links automatically.

Contents:
- `pages/*.json` – one Elementor template per page (36 pages). Import via *Templates → Saved Templates → Import Templates*.
- `footer.json` – the global footer.
- `media/` – all images used by the layouts.
- `global-settings.json` – brand colours, fonts and container width (the importer applies these to *Elementor → Site Settings*).
- `pages-manifest.json` – page address, layout type and stylesheet set used by each template.

Manual import notes:
1. The **SEO Expert India theme must be active** – the layouts use its widgets and stylesheets.
2. Image addresses point to `/wp-content/uploads/seoexpertindia-demo/`. Upload the `media/` files to that folder
   (or run the demo importer once) so images appear. Internal links are root-relative (e.g. `/contact/`).
3. After inserting a template into a page, set the page's address to the one listed in `pages-manifest.json`.
