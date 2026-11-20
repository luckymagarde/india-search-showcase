"""Captures every page of the running Lovable site (http://localhost:8080) for WordPress conversion."""
import asyncio, json, re, pathlib
from playwright.async_api import async_playwright
SRC=pathlib.Path('/dev-server/src')
OUT=pathlib.Path('/dev-server/wordpress/.build/capture'); OUT.mkdir(parents=True,exist_ok=True)
cat=(SRC/'data/service-catalogue.ts').read_text()
services=re.findall(r'"path":\s*"([^"]+)"',cat)
PAGES=['/','/about/','/services/','/recent-work/','/testimonials/','/faq/','/contact/']+services
JS=r"""async()=>{
 const sleep=t=>new Promise(r=>setTimeout(r,t));
 const tabs={};
 for(const list of document.querySelectorAll('[role=tablist]')){
   if(list.closest('header')) continue;
   const ts=[...list.querySelectorAll('[role=tab]')]; if(!ts.length) continue;
   const pid=ts[0].getAttribute('aria-controls'); const arr=[];
   for(const t of ts){t.click(); await sleep(120); const p=document.getElementById(t.getAttribute('aria-controls')); arr.push({tab:t.id,html:p?p.outerHTML:'',cls:t.className});}
   ts[0].click(); await sleep(120); tabs[pid]=arr;
 }
 const head={title:document.title,
  meta:[...document.querySelectorAll('meta[name],meta[property]')].map(m=>[m.getAttribute('name')||m.getAttribute('property'),m.content]),
  canonical:document.querySelector('link[rel=canonical]')?.href||'',
  jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent)};
 const styles=[...document.querySelectorAll('style')].map(s=>s.textContent);
 const links=[...document.querySelectorAll('link[rel=stylesheet]')].map(l=>l.href);
 const kids=[...document.body.children].filter(c=>!['SCRIPT','STYLE','HEADER'].includes(c.tagName));
 let footer=''; const content=[];
 for(const k of kids){ if(k.querySelector&&k.querySelector(':scope > footer#contact')) footer=k.innerHTML; else content.push(k.outerHTML);}
 const html=content.join('\n');
 const header=document.querySelector('header.site-header')?.outerHTML||'';
 const videos=[];
 for(const b of document.querySelectorAll('.ss-play')){ b.click(); await sleep(80);}
 document.querySelectorAll('.ss-video iframe').forEach(f=>videos.push(f.src));
 return {head,styles,links,html,footer,tabs,videos,header};
}"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(headless=True); pg=await b.new_page(viewport={"width":1280,"height":1800})
        linkcss={}
        for path in PAGES:
            await pg.goto('http://localhost:8080'+path, wait_until='networkidle'); await pg.wait_for_timeout(700)
            d=await pg.evaluate(JS)
            for h in d['links']:
                if h not in linkcss and 'localhost' in h:
                    linkcss[h]=await pg.evaluate("async h=>await (await fetch(h)).text()",h)
            d['path']=path
            name='home' if path=='/' else path.strip('/').replace('/','__')
            (OUT/f'{name}.json').write_text(json.dumps(d))
            print(path,len(d['html']),len(d['footer']),list(d['tabs']),len(d['videos']))
        (OUT/'_linkcss.json').write_text(json.dumps(linkcss))
        await b.close()
asyncio.run(main())
