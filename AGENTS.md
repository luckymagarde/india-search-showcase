<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The home page renders the original Elementor HTML/CSS/JS verbatim from src/legacy/ — the user requires a pixel-exact match, so edit those files rather than rebuilding in Tailwind.
- The SEO Services page (/service/best-seo-services-in-india/) reuses the contact form and footer by slicing src/legacy/home.html at runtime, so both stay identical to the home page; its own styles live in src/styles/seo-services.css (ss- prefix) and editable copy in src/data/seo-services.ts.
- Shared navigation renders once in the root layout through SiteHeader; legacy homepage markup stays untouched so menu improvements do not rewrite its content.
- SEO-specific visual components live in src/components/seo and consume CDN asset pointers via src/data/seo-assets.ts, keeping brand media separate from editable content.
- The six company pages share PageShell, legacy form/footer extraction and site-pages content; reuse these to preserve original appearance and avoid duplicate forms. Footer link integration runs in the root so legacy source remains unchanged.
- Portfolio media reuses CDN pointers to original homepage mockups; existing testimonial copy is derived from the homepage without stock portrait identities, and unverified endorsements/results must not receive review schema.
