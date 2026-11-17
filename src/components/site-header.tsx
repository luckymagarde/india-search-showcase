import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import css from './site-header.css?raw';
import { pageLinks } from '@/data/site-pages';
import logoHeader from '@/assets/logo-header.png';
import { serviceCatalogue, serviceCategories } from '@/data/service-catalogue';
import { ServiceIcon } from '@/components/site/service-icon';
export function SiteHeader(){
 const [open,setOpen]=useState(false),[services,setServices]=useState(false);
 const [categoryOpen,setCategoryOpen]=useState<Record<string,boolean>>({seo:true});
 const menuRef=useRef<HTMLDivElement>(null);
 const close=()=>{setOpen(false);setServices(false)};
 const location=useLocation();
 useEffect(()=>{setOpen(false);setServices(false)},[location.pathname]);
 useEffect(()=>{
  const outside=(event:PointerEvent)=>{if(event.target instanceof Node&&!menuRef.current?.contains(event.target))setServices(false)};
  document.addEventListener('pointerdown',outside);
  return()=>document.removeEventListener('pointerdown',outside);
 },[]);
 const consultation=location.pathname==='/'||location.pathname.startsWith('/service/')||location.pathname==='/contact/'?'#lead-form':'/contact/#lead-form';
 const consult=(mobile=false)=><Button asChild className={`site-consult ${mobile?'site-mobile-consult':'site-desktop-consult'}`}><a href={consultation} onClick={()=>setOpen(false)}><MessageCircle aria-hidden/>Quick Consultation</a></Button>;
 return <><style dangerouslySetInnerHTML={{__html:css}}/><header className="site-header"><div className="site-header-inner">
  <Link className="site-brand" to="/" aria-label="SEO Expert India — home"><img src={logoHeader} alt="SEO Expert India" className="site-logo" width={211} height={72}/><span className="site-brand-tag">SEARCH. STRATEGY. GROWTH.</span></Link>
  <Button variant="ghost" className="site-menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="site-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button>
  <nav id="site-navigation" className={`site-nav ${open?'open':''}`} aria-label="Main navigation">
   <Link to="/" onClick={()=>setOpen(false)}>Home</Link><Link to="/about/" onClick={()=>setOpen(false)}>About</Link>
   <div ref={menuRef} className={`site-services ${services?'expanded':''}`} onMouseEnter={()=>{if(window.matchMedia('(min-width:1151px) and (hover:hover)').matches)setServices(true)}} onMouseLeave={()=>{if(window.matchMedia('(min-width:1151px) and (hover:hover)').matches)setServices(false)}} onKeyDown={event=>{if(event.key==='Escape'){setServices(false);menuRef.current?.querySelector<HTMLButtonElement>('.site-dropdown-toggle')?.focus()}}}><Link to="/services/" onClick={close}>Services</Link><Button className="site-dropdown-toggle" variant="ghost" aria-label={services?'Collapse Services menu':'Expand Services menu'} aria-expanded={services} aria-controls="services-submenu" onClick={()=>setServices(!services)}><ChevronDown/></Button><div id="services-submenu" className="site-submenu site-mega" hidden={!services}>{serviceCategories.map(category=><div className={`site-mega-category ${categoryOpen[category.id]?'category-open':''}`} key={category.id}><h2><ServiceIcon name={category.icon}/>{category.title}</h2><Button variant="ghost" className="site-category-toggle" aria-expanded={Boolean(categoryOpen[category.id])} aria-controls={`service-category-${category.id}`} onClick={()=>setCategoryOpen(current=>({...current,[category.id]:!current[category.id]}))}><ServiceIcon name={category.icon}/><span>{category.title}</span><ChevronDown/></Button><ul id={`service-category-${category.id}`}>{serviceCatalogue.filter(service=>service.category===category.id).map(service=><li key={service.path}>{service.local?<Link to={service.path==='/service/web-development-company-india/'?'/service/web-development-company-india/':'/service/best-seo-services-in-india/'} onClick={close}><ServiceIcon name={service.icon}/><span>{service.path==='/service/best-seo-services-in-india/'?'SEO Services':service.title}</span><ArrowUpRight/></Link>:<a href={service.url} onClick={close}><ServiceIcon name={service.icon}/><span>{service.title}</span><ArrowUpRight/></a>}</li>)}</ul></div>)}</div></div>
   {pageLinks.filter(p=>p.to!=='/about/'&&p.to!=='/services/').map(p=><Link key={p.to} to={p.to} onClick={()=>setOpen(false)}>{p.label}</Link>)}<a href="https://www.seoexpertindia.biz/blog/">Blog</a>{consult(true)}
  </nav>{consult()}</div></header></>;
}
