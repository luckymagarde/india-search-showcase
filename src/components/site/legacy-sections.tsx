import { useEffect, useRef } from 'react';
import homeHtml from '@/legacy/home.html?raw';
import { pageLinks } from '@/data/site-pages';

function elementSource(marker:string,tag:string){
 const start=homeHtml.indexOf(marker); if(start<0)return '';
 const re=new RegExp(`<\\/?${tag}\\b[^>]*>`,'g'); re.lastIndex=start; let depth=0;
 for(let m=re.exec(homeHtml);m;m=re.exec(homeHtml)){depth+=m[0].startsWith('</')?-1:1;if(depth===0)return homeHtml.slice(start,re.lastIndex);}
 return '';
}
export const legacyFormHtml=elementSource('<div class="form-shell" id="lead-form">','div');
export const legacyFooterHtml=elementSource('<footer id="contact">','footer');
export function integrateFooter(footer:HTMLElement){
 const heading=Array.from(footer.querySelectorAll('h4')).find(h=>h.textContent==='Company');
 const list=heading?.parentElement?.querySelector('ul'); if(!list)return;
 for(const a of Array.from(list.querySelectorAll('a'))){const match=pageLinks.find(p=>p.label===a.textContent || (p.label==='FAQs' && a.textContent==='FAQ'));if(match)a.href=match.to;else if(a.getAttribute('href')?.startsWith('#'))a.href='/'+a.getAttribute('href');}
 for(const p of pageLinks){if(Array.from(list.querySelectorAll('a')).some(a=>a.getAttribute('href')===p.to))continue;const li=document.createElement('li');const a=document.createElement('a');a.href=p.to;a.textContent=p.label;li.append(a);list.append(li);}
 const social=['Facebook','Instagram','LinkedIn'];footer.querySelectorAll('.socials a').forEach((a,i)=>a.setAttribute('aria-label',social[i]??'Social profile'));
 footer.querySelectorAll('a[href="#services"]').forEach(a=>a.setAttribute('href','/service/best-seo-services-in-india/'));
}
export function LegacyFooter(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const f=ref.current?.querySelector('footer');if(f)integrateFooter(f);},[]);return <div ref={ref} dangerouslySetInnerHTML={{__html:legacyFooterHtml}}/>;}
export function LegacyContactForm(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{
 const container=ref.current, form=container?.querySelector<HTMLFormElement>('#leadForm');if(!container||!form)return;
 let timer:ReturnType<typeof setTimeout>|undefined;
 const submit=(e:Event)=>{e.preventDefault();let valid=true;for(const [wrap,id,test] of [['f-name','name',(v:string)=>v.trim().length>0],['f-email','email',(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)],['f-phone','phone',(v:string)=>v.trim().length>=7]] as const){const input=container.querySelector<HTMLInputElement>(`#${id}`);const ok=Boolean(input&&test(input.value));container.querySelector(`#${wrap}`)?.classList.toggle('error',!ok);input?.setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;}if(!valid)return;const b=form.querySelector<HTMLButtonElement>('.submit');if(b){b.textContent='Sending…';b.disabled=true;}timer=setTimeout(()=>{form.style.display='none';container.querySelector('#fSuccess')?.classList.add('show');},800);};
 form.addEventListener('submit',submit);return()=>{form.removeEventListener('submit',submit);clearTimeout(timer);};
 },[]);return <div ref={ref} dangerouslySetInnerHTML={{__html:legacyFormHtml}}/>;}
