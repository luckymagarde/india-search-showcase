"""Assembles the WordPress theme, importer and Elementor templates from the build output and
writes the four ZIP packages. Run after capture.py and build.py."""
import json, os, re, shutil, zipfile, pathlib, subprocess, datetime
WP = pathlib.Path('/dev-server/wordpress')
SRC = pathlib.Path('/dev-server/src')
BUILD = pathlib.Path('/mnt/documents/.lovable/wpbuild')
OUT = BUILD / 'out'
STAGE = pathlib.Path('/tmp/seoexpertindia-packaging')
DIST = pathlib.Path(os.environ.get('SEI_DIST', '/tmp/seoexpertindia-packages'))
THEME = WP / 'theme/seoexpertindia'
PLUGIN = WP / 'importer/seoexpertindia-demo-importer'
VERSION = '1.0.0'

def php_str(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"

# ---------------- theme assets
(THEME / 'assets/css').mkdir(parents=True, exist_ok=True)
(THEME / 'assets/images').mkdir(parents=True, exist_ok=True)
(THEME / 'assets/js').mkdir(parents=True, exist_ok=True)
(THEME / 'template-parts').mkdir(parents=True, exist_ok=True)
for f in (OUT / 'theme/css').iterdir():
    shutil.copy(f, THEME / 'assets/css' / f.name)
for f in (OUT / 'theme/images').iterdir():
    shutil.copy(f, THEME / 'assets/images' / f.name)
shutil.copy('/dev-server/public/favicon.png', THEME / 'assets/images/favicon.png')

# Homepage behaviour (testimonial slider, counters, FAQ) – original script, form handling is in site.js.
home_js = (SRC / 'legacy/home.js.txt').read_text()
(THEME / 'assets/js/home.js').write_text('/* SEO Expert India – homepage behaviour (original script). */\n(function(){\n' + home_js + '\n})();\n')

icons = json.loads((OUT / 'theme/icons.json').read_text())
lines = ["<?php", "/**", " * Inline SVG icons (Lucide, ISC licence) used by the header and menus.",
         " * Menu items can use any of these names via the CSS class sei-icon-{Name}.", " *",
         " * @package SEOExpertIndia", " */", "", "defined( 'ABSPATH' ) || exit;", "",
         "/** Returns the SVG markup for an icon name, or an empty string. */",
         "function sei_icon( $name ) {", "\tstatic $icons = array("]
for k in sorted(icons):
    lines.append(f"\t\t{php_str(k)} => {php_str(icons[k])},")
lines += ["\t);", "\treturn $icons[ $name ] ?? '';", "}", "",
          "/** Available icon names. */", "function sei_icon_names() {",
          "\treturn array( " + ", ".join(php_str(k) for k in sorted(icons)) + " );", "}", ""]
(THEME / 'inc/icons.php').write_text("\n".join(lines))

manifest = json.loads((OUT / 'data/manifest.json').read_text())
menu = manifest['menu']
dm = ["<?php", "/**", " * Default header menu (same structure as the imported menu); used until a menu is assigned.",
      " *", " * @package SEOExpertIndia", " */", "", "defined( 'ABSPATH' ) || exit;", "", "return array("]
for title, path in menu['top']:
    if path == '/services/':
        dm.append(f"\tarray( 'title' => {php_str(title)}, 'path' => {php_str(path)}, 'mega' => array(")
        for c in menu['mega']:
            dm.append(f"\t\tarray( 'title' => {php_str(c['title'])}, 'icon' => {php_str(c['icon'])}, 'items' => array(")
            for it in c['items']:
                dm.append(f"\t\t\tarray( 'title' => {php_str(it['title'])}, 'path' => {php_str(it['path'])}, 'icon' => {php_str(it['icon'])} ),")
            dm.append("\t\t) ),")
        dm.append("\t) ),")
    else:
        dm.append(f"\tarray( 'title' => {php_str(title)}, 'path' => {php_str(path)} ),")
dm += [");", ""]
(THEME / 'inc/default-menu.php').write_text("\n".join(dm))

# Footer fallback (shown only if the Elementor footer template is missing).
fh = (OUT / 'theme/footer.html').read_text()
media_files = {m['key']: m['file'] for m in manifest['media']}
def media_php(m):
    f = media_files.get(m.group(1), '')
    if (THEME / 'assets/images' / f).exists():
        return "<?php echo esc_url( SEI_THEME_URI . '/assets/images/" + f + "' ); ?>"
    shutil.copy(OUT / 'data/media' / f, THEME / 'assets/images' / f)
    return "<?php echo esc_url( SEI_THEME_URI . '/assets/images/" + f + "' ); ?>"
fh = re.sub(r'\{\{SEI_MEDIA:([^}]+)\}\}', media_php, fh)
fh = fh.replace('{{SEI_HOME}}', "<?php echo esc_url( untrailingslashit( home_url() ) ); ?>")
(THEME / 'template-parts/footer-fallback.php').write_text(
    "<?php\n/**\n * Built-in copy of the original footer, used when the Elementor footer template is not available.\n *\n * @package SEOExpertIndia\n */\n\ndefined( 'ABSPATH' ) || exit;\n?>\n" + fh + "\n")

# ---------------- importer data
shutil.rmtree(PLUGIN / 'data', ignore_errors=True)
shutil.copytree(OUT / 'data', PLUGIN / 'data')
for shot, dest in ((BUILD / 'screenshot.png', THEME / 'screenshot.png'), (BUILD / 'preview.jpg', PLUGIN / 'assets/preview.jpg')):
    if shot.exists():
        shutil.copy(shot, dest)

# ---------------- Elementor templates package
tpl = STAGE / 'seoexpertindia-elementor-templates'
shutil.rmtree(tpl, ignore_errors=True)
(tpl / 'pages').mkdir(parents=True)
(tpl / 'media').mkdir()
def resolve_static(v):
    if isinstance(v, list): return [resolve_static(x) for x in v]
    if isinstance(v, dict): return {k: resolve_static(x) for k, x in v.items()}
    if not isinstance(v, str) or '{{SEI_' not in v: return v
    if re.fullmatch(r'\{\{SEI_MEDIA_ID:[^}]+\}\}', v): return ''
    v = v.replace('{{SEI_HOME}}', '')
    return re.sub(r'\{\{SEI_MEDIA:([^}]+)\}\}', lambda m: '/wp-content/uploads/seoexpertindia-demo/' + media_files.get(m.group(1), ''), v)
for p in manifest['pages']:
    content = resolve_static(json.loads((OUT / 'data/pages' / (p['key'] + '.json')).read_text()))
    (tpl / 'pages' / (p['key'] + '.json')).write_text(json.dumps({'version': '0.4', 'title': 'SEO Expert India – ' + p['title'], 'type': 'page', 'content': content, 'page_settings': []}))
footer = resolve_static(json.loads((OUT / 'data/footer.json').read_text()))
(tpl / 'footer.json').write_text(json.dumps({'version': '0.4', 'title': 'SEO Expert India Footer', 'type': 'section', 'content': footer, 'page_settings': []}))
for f in (OUT / 'data/media').iterdir():
    shutil.copy(f, tpl / 'media' / f.name)
glob = {
    'colors': {'page background': '#07111F', 'page accent': '#C9A957', 'page accent light': '#E0C574', 'page text': '#F5F1E7',
               'primary (gold)': '#D4A72C', 'secondary (navy)': '#020817', 'text': '#EEF2FB', 'accent (light gold)': '#F3C95F',
               'muted text': '#94A3C4', 'card': '#0A1730', 'violet accent': '#8B7CF6'},
    'fonts': {'primary (headings)': 'Plus Jakarta Sans 700', 'secondary (display)': 'Playfair Display 600', 'text': 'DM Sans 400', 'accent (labels)': 'Space Grotesk 600'},
    'container_width_px': 1240,
    'note': 'The demo importer applies these values to Elementor → Site Settings automatically.',
}
(tpl / 'global-settings.json').write_text(json.dumps(glob, indent=2))
(tpl / 'pages-manifest.json').write_text(json.dumps([{k: p[k] for k in ('key', 'path', 'title', 'layout', 'styles')} for p in manifest['pages']], indent=1))
shutil.copy(WP / 'docs/TEMPLATES-README.md', tpl / 'README.md')

# ---------------- ZIPs
def zipdir(src, dest, root):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists(): dest.unlink()
    with zipfile.ZipFile(dest, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for f in sorted(src.rglob('*')):
            if f.is_file() and '.git' not in f.parts and f.name != '.DS_Store':
                z.write(f, root + '/' + str(f.relative_to(src)))
    return dest

STAGE.mkdir(parents=True, exist_ok=True)
pk = STAGE / 'packages'; shutil.rmtree(pk, ignore_errors=True); pk.mkdir()
zipdir(THEME, pk / 'seoexpertindia-theme.zip', 'seoexpertindia')
zipdir(PLUGIN, pk / 'seoexpertindia-demo-importer.zip', 'seoexpertindia-demo-importer')
zipdir(tpl, pk / 'seoexpertindia-elementor-templates.zip', 'seoexpertindia-elementor-templates')
bundle = STAGE / 'bundle'; shutil.rmtree(bundle, ignore_errors=True); bundle.mkdir()
for z in pk.iterdir(): shutil.copy(z, bundle / z.name)
for doc in (WP / 'docs').glob('*.md'):
    if doc.name != 'TEMPLATES-README.md': shutil.copy(doc, bundle / doc.name)
zipdir(bundle, pk / 'seoexpertindia-complete-bundle.zip', 'seoexpertindia-complete-bundle')
DIST.mkdir(parents=True, exist_ok=True)
for z in pk.iterdir():
    shutil.copy(z, DIST / z.name)
    print(z.name, round(z.stat().st_size / 1048576, 2), 'MB')
