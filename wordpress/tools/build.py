"""Converts captured pages into Elementor data, media and CSS for the theme + importer."""
import json, re, hashlib, pathlib, shutil, random, subprocess, mimetypes
from bs4 import BeautifulSoup, NavigableString, Tag, Comment
random.seed(20261119)
ROOT=pathlib.Path('/mnt/documents/.lovable/wpbuild'); CAP=ROOT/'capture'; OUT=ROOT/'out'
SRC=pathlib.Path('/dev-server/src')
if OUT.exists(): shutil.rmtree(OUT)
DATA=OUT/'data'; MEDIA=DATA/'media'; PAGES=DATA/'pages'; TCSS=OUT/'theme/css'; TIMG=OUT/'theme/images'
for d in (MEDIA,PAGES,TCSS,TIMG): d.mkdir(parents=True,exist_ok=True)
DL=ROOT/'dl'; DL.mkdir(exist_ok=True)
SITE='https://www.seoexpertindia.biz'
HOME='{{SEI_HOME}}'

assets={}
for p in SRC.rglob('*.asset.json'):
    j=json.load(open(p)); local=p.with_name(p.name[:-len('.asset.json')])
    if local.exists(): assets[j['asset_id']]=local
media={}; by_src={}; failed=set()
def fetch(url):
    h=hashlib.md5(url.encode()).hexdigest()[:10]
    hits=[x for x in DL.glob(h+'-*')]
    if hits: return hits[0]
    if url in failed: return None
    tmp=DL/(h+'.part')
    r=subprocess.run(['curl','-sSL','-A','Mozilla/5.0','-o',str(tmp),'-w','%{content_type} %{http_code}',url],capture_output=True,text=True,timeout=60)
    ctype,code=(r.stdout.split(' ')+['',''])[:2]
    if code!='200' or not tmp.exists() or tmp.stat().st_size==0 or 'html' in ctype:
        print('DOWNLOAD FAIL',url,r.stdout); failed.add(url); return None
    ext=mimetypes.guess_extension(ctype.split(';')[0].strip()) or pathlib.Path(url.split('?')[0]).suffix or '.bin'
    if ext=='.jpe': ext='.jpg'
    base=re.sub(r'[^a-zA-Z0-9.-]+','-',pathlib.Path(url.split('?')[0]).stem)[:50] or 'image'
    if url.startswith('https://randomuser.me/'): base='client-portrait-'+'-'.join(url.rstrip('.jpg').split('/')[-2:])
    final=DL/f'{h}-{base}{ext}'; tmp.rename(final); return final
def local_for(url):
    u=url.strip().strip('\'"')
    if u.startswith('data:') or not u: return None
    m=re.match(r'^(?:https?://localhost:8080)?/__l5e/assets-v1/([^/]+)/(.+)$',u)
    if m:
        if m.group(1) in assets: return assets[m.group(1)]
        return fetch('http://localhost:8080'+u[u.index('/__l5e'):])
    m=re.match(r'^(?:https?://localhost:8080)?/@oj-start/fs(/dev-server/[^?]+)',u)
    if m: return pathlib.Path(m.group(1))
    if u.startswith('http'): return fetch(u)
    if u.startswith('/') and (pathlib.Path('/dev-server/public')/u.lstrip('/')).exists(): return pathlib.Path('/dev-server/public')/u.lstrip('/')
    return None
def media_key(url):
    if url in by_src: return by_src[url]
    f=local_for(url)
    if not f: return None
    name=re.sub(r'^[0-9a-f]{10}-','',f.name)
    name=re.sub(r'[^a-zA-Z0-9.-]+','-',name).lower()
    stem,ext=name.rsplit('.',1) if '.' in name else (name,'bin')
    digest=hashlib.md5(f.read_bytes()).hexdigest()
    for k,v in media.items():
        if v['md5']==digest: by_src[url]=k; return k
    key=f'{stem}.{ext}'; i=2
    while key in media: key=f'{stem}-{i}.{ext}'; i+=1
    shutil.copy(f,MEDIA/key); media[key]={'file':key,'md5':digest,'src':url}
    by_src[url]=key; return key
def tok(url):
    k=media_key(url)
    return ('{{SEI_MEDIA:%s}}'%k) if k else url

cat=(SRC/'data/service-catalogue.ts').read_text()
services=re.findall(r'"title":\s*"([^"]+)",\s*"url":\s*"[^"]+",\s*"path":\s*"([^"]+)",\s*"category":\s*"([^"]+)",\s*"icon":\s*"([^"]+)"',cat)
LOCAL_PATHS={'/','/about/','/services/','/recent-work/','/testimonials/','/faq/','/contact/','/blog/'}|{s[1] for s in services}
def link(h):
    if not h: return h
    if h.startswith(SITE):
        rest=h[len(SITE):] or '/'
        p=rest.split('#')[0].split('?')[0]
        if p in LOCAL_PATHS or p.startswith('/blog'): return HOME+rest
        return h
    if h.startswith('/') and not h.startswith('//'): return HOME+h
    return h
MEDIA_TAGS={'img','source','video','audio','image','input'}
def clean_soup(soup):
    for t in soup.find_all(True):
        for a in list(t.attrs):
            if a.startswith('data-tsd') or a.lower().startswith('on'): del t[a]
        if t.name=='img' and t.get('src','') in failed:
            t.decompose(); continue
        if t.get('data-status')=='active':
            del t['data-status']
            if t.get('aria-current'): del t['aria-current']
            cl=[c for c in t.get('class',[]) if c!='active']
            if cl: t['class']=cl
            elif t.has_attr('class'): del t['class']
        if t.name in MEDIA_TAGS:
            for a in ('src','poster'):
                if t.has_attr(a):
                    t[a]=tok(t[a])
            if t.name=='img' and t.get('src','') in failed:
                t.decompose(); continue
            if t.has_attr('srcset'):
                t['srcset']=', '.join(' '.join([tok(p.strip().split(' ')[0])]+p.strip().split(' ')[1:]) for p in t['srcset'].split(','))
        if t.has_attr('href') and t.name not in ('link','image','use'): t['href']=link(t['href'])
        if t.has_attr('style'): t['style']=re.sub(r'url\(([^)]+)\)',lambda m:'url('+tok(m.group(1).strip('\'" '))+')',t['style'])
    for c in soup.find_all(string=lambda s:isinstance(s,Comment)): c.extract()
    for t in soup.select('.ss-reveal.in,.ss-tl-item.in'):
        t['class']=[c for c in t['class'] if c!='in']

CONTAINER={'div','section','article','aside','header','footer','main','nav','ul','ol','li','figure','a','blockquote','dl'}
ALWAYS_HTML={'svg','form','table','select','textarea','iframe','video','picture','canvas','details','script','noscript','input','hr','br','audio','object','embed','map'}
INLINE={'span','strong','em','b','i','br','small','sup','sub','mark','code','abbr','time','s','u','svg','kbd','q','cite','del','ins','wbr'}
BOOL={'hidden','inert','disabled','allowfullscreen','novalidate','required','checked','selected','readonly','multiple','open','autofocus','controls','muted','playsinline','loop','data-sei-tabs'}
used_ids=set()
def eid():
    while True:
        i='%07x'%random.getrandbits(28)
        if i not in used_ids: used_ids.add(i); return i
def attr_str(t,skip=()):
    out=[]
    for k,v in t.attrs.items():
        if k in skip: continue
        if isinstance(v,list): v=' '.join(v)
        if (v is None or v=='') and k in BOOL: out.append(k)
        else: out.append('%s="%s"'%(k,str(v or '').replace('&','&amp;').replace('"','&quot;')))
    return ' '.join(out)
def cls(t): return ' '.join(t.get('class',[]))
def inner(t): return t.decode_contents().strip()
def sig_children(t):
    return [c for c in t.children if not isinstance(c,Comment) and not (isinstance(c,NavigableString) and not c.strip())]
def widget(kind,settings): return {'id':eid(),'elType':'widget','widgetType':kind,'settings':settings,'elements':[]}
def base(t,skip=('class','id')):
    s={'sei_tag':t.name,'sei_classes':cls(t),'sei_id':t.get('id',''),'sei_attrs':attr_str(t,skip)}
    return {k:v for k,v in s.items() if v!=''}
stats={}
def urlset(t):
    return {'url':t.get('href',''),'is_external':'on' if t.get('target')=='_blank' else '','nofollow':'on' if 'nofollow' in (t.get('rel') or []) else ''}
def convert(t,inner_flag):
    name=t.name; kids=sig_children(t)
    texty=any(isinstance(c,NavigableString) for c in kids)
    elkids=[c for c in kids if isinstance(c,Tag)]
    if name=='img':
        s=base(t,('class','id','src','alt','srcset','sizes'))
        src=t.get('src',''); m=re.match(r'\{\{SEI_MEDIA:(.+)\}\}',src)
        s['image']={'url':src,'id':('{{SEI_MEDIA_ID:%s}}'%m.group(1)) if m else ''}
        s['alt']=t.get('alt',''); kind='sei-image'
    elif name in ALWAYS_HTML:
        s=base(t); s['html']=inner(t); kind='sei-html'
    elif name in CONTAINER and elkids and not texty and not all(c.name in INLINE for c in elkids):
        st={'content_width':'full','html_tag':name}
        if cls(t): st['css_classes']=cls(t)
        if t.get('id'): st['_element_id']=t['id']
        skip=['class','id']
        if name=='a': st['link']=urlset(t); skip+=['href','target']
        a=attr_str(t,skip)
        if a: st['sei_attrs']=a
        stats['container']=stats.get('container',0)+1
        return {'id':eid(),'elType':'container','isInner':inner_flag,'settings':st,'elements':[convert(c,True) for c in elkids]}
    elif re.fullmatch(r'h[1-6]',name):
        s=base(t); s['title']=inner(t); kind='sei-heading'
    elif name=='a':
        s=base(t,('class','id','href','target')); s['link']=urlset(t); s['text']=inner(t); kind='sei-link'
    else:
        s=base(t); s['content']=inner(t); kind='sei-text'
    s['sei_tag']=name
    stats[kind]=stats.get(kind,0)+1
    return widget(kind,s)
def to_elementor(html):
    soup=BeautifulSoup(html,'html.parser'); out=[]
    for c in sig_children(soup):
        if isinstance(c,NavigableString): continue
        e=convert(c,False)
        if e['elType']!='container':
            e={'id':eid(),'elType':'container','isInner':False,'settings':{'content_width':'full','html_tag':'div','css_classes':'sei-contents'},'elements':[e]}
        out.append(e)
    return out

KNOWN={'sei-header':SRC/'components/site-header.css','sei-home':SRC/'legacy/home.css','sei-seo-services':SRC/'styles/seo-services.css','sei-site-pages':SRC/'styles/site-pages.css','sei-web-development':SRC/'styles/web-development.css'}
known_norm={h:re.sub(r'\s+','',p.read_text()) for h,p in KNOWN.items()}
css_files={}
def css_urls(text):
    def rep(m):
        u=m.group(1).strip('\'" ')
        if u.startswith('data:') or u.startswith('#'): return m.group(0)
        k=media_key(u)
        if not k: return m.group(0)
        shutil.copy(MEDIA/k,TIMG/k); return f'url("../images/{k}")'
    return re.sub(r'url\(([^)]+)\)',rep,text)
def css_handle(text):
    n=re.sub(r'\s+','',text)
    h=next((h for h,v in known_norm.items() if v==n),None)
    if not h:
        # combined style blocks: name after the known sheets they contain
        parts=[k.replace('sei-','') for k,v in known_norm.items() if v[:400] in n]
        h='sei-'+'-'.join(parts) if parts else 'sei-extra-'+hashlib.md5(n.encode()).hexdigest()[:8]
    if h not in css_files:
        css_files[h]=True; (TCSS/f'{h}.css').write_text(css_urls(text))
    return h
linkcss=json.load(open(CAP/'_linkcss.json'))
app=[v for k,v in linkcss.items() if 'styles.css' in k][0]
app=re.sub(r'/\*# sourceMappingURL=.*?\*/','',app)
(TCSS/'sei-app.css').write_text(css_urls(app))

TITLES={'/':'Home','/about/':'About','/services/':'Services','/recent-work/':'Recent Work','/testimonials/':'Testimonials','/faq/':'FAQs','/contact/':'Contact'}
svc_title={s[1]:s[0] for s in services}
manifest={'version':'1.0.0','pages':[]}
footer_html=None
for f in sorted(CAP.glob('*.json')):
    if f.name.startswith('_'): continue
    d=json.load(open(f)); path=d['path']
    styles=[css_handle(s) for s in d['styles'] if s.strip()]
    if path=='/': layout='home'
    elif path.startswith('/service/'): layout='service-dev' if 'wd-' in d['html'] else 'service-seo'
    else: layout='company'
    if path=='/':
        raw=(SRC/'legacy/home.html').read_text()
        i=raw.index('<footer id="contact">'); j=raw.index('</footer>',i)+len('</footer>')
        html=raw[:i]+raw[j:]
    else: html=d['html']
    soup=BeautifulSoup(html,'html.parser')
    for ft in soup.select('footer#contact'):
        wrap=ft.parent
        if wrap and wrap.name=='div' and len([c for c in wrap.children if isinstance(c,Tag)])==1: wrap.decompose()
        else: ft.decompose()
    if path!='/' and d['footer']:
        fs=BeautifulSoup(d['footer'],'html.parser'); bar=fs.select_one('.challenge-bar')
        if bar: soup.append(bar)
        if 'Recent Work' in d['footer'] and footer_html is None: footer_html=fs.select_one('footer#contact')
    for pid,items in d['tabs'].items():
        panel=soup.find(id=pid)
        if not panel: continue
        tablist=soup.find(id=items[0]['tab']).find_parent(attrs={'role':'tablist'})
        new=[]
        for i,it in enumerate(items):
            p=BeautifulSoup(it['html'],'html.parser').find(True)
            p['id']=f'{pid}-{i}'; p['aria-labelledby']=it['tab']
            for a in list(p.attrs):
                if a.startswith('data-tsd'): del p[a]
            if i: p['hidden']=''
            new.append(p); soup.find(id=it['tab'])['aria-controls']=f'{pid}-{i}'
        for p in reversed(new): panel.insert_after(p)
        panel.decompose(); tablist['data-sei-tabs']=''
    for b,src in zip(soup.select('.ss-play'),d['videos']): b['data-sei-video']=src
    clean_soup(soup)
    data=to_elementor(str(soup))
    key='home' if path=='/' else path.strip('/').split('/')[-1]
    (PAGES/f'{key}.json').write_text(json.dumps(data))
    head=d['head']; meta=dict(head['meta'])
    fix=lambda s:s.replace(SITE,HOME) if isinstance(s,str) else s
    manifest['pages'].append({'key':key,'path':path,'slug':'' if path=='/' else path.strip('/').split('/')[-1],
        'parent':'service' if path.startswith('/service/') else '','title':TITLES.get(path) or svc_title.get(path) or head['title'],
        'layout':layout,'styles':styles,
        'seo':{'title':head['title'],'description':meta.get('description',''),'robots':meta.get('robots',''),
               'og_title':meta.get('og:title',''),'og_description':meta.get('og:description',''),'og_type':meta.get('og:type','website'),
               'og_image':tok(meta['og:image']) if meta.get('og:image') else '','twitter_card':meta.get('twitter:card','summary_large_image'),
               'jsonld':[fix(j) for j in head['jsonld']]}})
    print(path,layout,styles,len(json.dumps(data))//1024,'KB')
fsoup=BeautifulSoup(str(footer_html),'html.parser'); clean_soup(fsoup)
(DATA/'footer.json').write_text(json.dumps(to_elementor(str(fsoup))))
hd=BeautifulSoup(json.load(open(CAP/'about.json'))['header'],'html.parser')
icons={}
for a in hd.select('#services-submenu li a'):
    svgs=a.find_all('svg'); ic=next((s[3] for s in services if s[1]==a['href']),None)
    if ic: icons[ic]=str(svgs[0]); icons['ArrowUpRight']=str(svgs[-1])
catmap={'SEO Services':'Search','Website Development':'Code2','Industry-Based SEO Services':'Building2'}
for c in hd.select('.site-mega-category'):
    icons[catmap[c.h2.get_text(strip=True)]]=str(c.h2.svg); icons['ChevronDown']=str(c.button.find_all('svg')[-1])
icons['Menu']=str(hd.select_one('.site-menu-toggle svg'))
icons['MessageCircle']=str(hd.select_one('.site-desktop-consult svg'))
icons['X']='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
icons={k:re.sub(r'\s*data-tsd-source="[^"]*"','',v) for k,v in icons.items()}
(OUT/'theme/icons.json').write_text(json.dumps(icons,indent=0))
(OUT/'theme/header-classes.json').write_text(json.dumps({'toggle':' '.join(hd.select_one('.site-menu-toggle')['class']),'consult':' '.join(hd.select_one('.site-desktop-consult')['class'])}))
shutil.copy(local_for(hd.select_one('.site-logo')['src']),TIMG/'logo-header.png')
cats=[]
for c in hd.select('.site-mega-category'):
    t=c.h2.get_text(strip=True)
    cats.append({'title':t,'icon':catmap[t],'items':[{'title':a.find('span').get_text(),'path':a['href'],'icon':next(s[3] for s in services if s[1]==a['href'])} for a in c.select('li a')]})
manifest['menu']={'top':[['Home','/'],['About','/about/'],['Services','/services/'],['Recent Work','/recent-work/'],['Testimonials','/testimonials/'],['Contact','/contact/'],['FAQs','/faq/'],['Blog','/blog/']],'mega':cats}
alts={}
for p in PAGES.glob('*.json'):
    def walk(n):
        if isinstance(n,dict):
            if n.get('widgetType')=='sei-image':
                m=re.match(r'\{\{SEI_MEDIA:(.+)\}\}',n['settings']['image']['url'])
                if m and n['settings'].get('alt'): alts.setdefault(m.group(1),n['settings']['alt'])
            for v in n.values(): walk(v)
        elif isinstance(n,list):
            for v in n: walk(v)
    walk(json.loads(p.read_text()))
def nice(k): return re.sub(r'[-_]+',' ',k.rsplit('.',1)[0]).strip().capitalize()
manifest['media']=[{'key':k,'file':v['file'],'alt':alts.get(k) or nice(k)} for k,v in media.items()]
manifest['stats']=stats
(DATA/'manifest.json').write_text(json.dumps(manifest,indent=1))
print('media',len(media),'failed',sorted(failed),'stats',stats,'css',list(css_files))
