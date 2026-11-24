"""Visual QA: compares every page of the Lovable site (:8080) with the WordPress test site (:8099).
Usage: python3 visual_compare.py WIDTH [paths.json]  -> /tmp/browser/cmp/full-WIDTH.json + diff images."""
import asyncio, sys, json, io, pathlib
from playwright.async_api import async_playwright
from PIL import Image, ImageChops
W=int(sys.argv[1]); H=900
OUT=pathlib.Path('/tmp/browser/cmp'); OUT.mkdir(parents=True, exist_ok=True)
paths=json.load(open(sys.argv[2])) if len(sys.argv)>2 else [p['path'] for p in json.load(open('/mnt/documents/.lovable/wpbuild/out/data/manifest.json'))['pages']]
async def shots(ctx,url):
    pg=await ctx.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
    await pg.goto(url,wait_until='load',timeout=90000)
    await pg.add_style_tag(content='*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.ss-reveal,.ss-tl-item{opacity:1!important;transform:none!important}')
    h=await pg.evaluate('document.documentElement.scrollHeight')
    for y in range(0,h,800): await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(60)
    await pg.wait_for_timeout(800)
    h=await pg.evaluate('document.documentElement.scrollHeight'); sw=await pg.evaluate('document.documentElement.scrollWidth')
    out=[]
    for y in range(0,h,H):
        await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(120)
        out.append(Image.open(io.BytesIO(await pg.screenshot())).convert('RGB'))
    await pg.close(); return h,sw,out,errs
async def one(b,path,sem,res):
    async with sem:
        ctx=await b.new_context(viewport={'width':W,'height':H})
        try:
            a=await shots(ctx,'http://localhost:8080'+path); c=await shots(ctx,'http://localhost:8099'+path)
        except Exception as e:
            res[path]={'error':str(e)[:200]}; await ctx.close(); return
        worst=[]
        for i,(x,y) in enumerate(zip(a[2],c[2])):
            d=ImageChops.difference(x,y).convert('L').point(lambda v:255 if v>40 else 0)
            pct=sum(d.histogram()[255:])/(x.width*x.height)*100
            if pct>3:
                worst.append((i,round(pct,1)))
                if len(worst)<=2:
                    s=Image.new('RGB',(x.width*2,x.height));s.paste(x,(0,0));s.paste(y,(x.width,0))
                    s.save(OUT/f"diff-{W}-{path.strip('/').replace('/','_') or 'home'}-{i}.png")
        res[path]={'lov_h':a[0],'wp_h':c[0],'lov_sw':a[1],'wp_sw':c[1],'screens':len(a[2]),'bad':worst,'wp_errs':c[3][:3]}
        await ctx.close()
async def main():
    res={}
    async with async_playwright() as p:
        b=await p.chromium.launch(headless=True); sem=asyncio.Semaphore(4)
        await asyncio.gather(*[one(b,pa,sem,res) for pa in paths]); await b.close()
    json.dump(res,open(OUT/f'full-{W}.json','w'),indent=1)
    bad=[p for p,v in res.items() if 'error' in v or v['bad'] or abs(v['lov_h']-v['wp_h'])>40 or v['wp_sw']>W or v['wp_errs']]
    for p in sorted(res): 
        if p in bad: print(W,p,res[p])
    print(W,'pages',len(res),'with differences',len(bad))
asyncio.run(main())
