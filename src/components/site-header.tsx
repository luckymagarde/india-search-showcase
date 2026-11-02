import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import css from './site-header.css?raw';
import { pageLinks } from '@/data/site-pages';
export function SiteHeader(){
 const [open,setOpen]=useState(false),[services,setServices]=useState(false);
 const location=useLocation();
 const consultation=location.pathname==='/'||location.pathname.startsWith('/service/')||location.pathname==='/contact/'?'#lead-form':'/contact/#lead-form';
 const consult=(mobile=false)=><Button asChild className={`site-consult ${mobile?'site-mobile-consult':'site-desktop-consult'}`}><a href={consultation} onClick={()=>setOpen(false)}><MessageCircle aria-hidden/>Quick Consultation</a></Button>;
 return <><style dangerouslySetInnerHTML={{__html:css}}/><header className="site-header"><div className="site-header-inner">
  <Link className="site-brand" to="/">SEO Expert India<span>SEARCH. STRATEGY. GROWTH.</span></Link>
  <Button variant="ghost" className="site-menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="site-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button>
  <nav id="site-navigation" className={`site-nav ${open?'open':''}`} aria-label="Main navigation">
   <Link to="/" onClick={()=>setOpen(false)}>Home</Link><Link to="/about/" onClick={()=>setOpen(false)}>About</Link>
   <div className={`site-services ${services?'expanded':''}`}><Link to="/services/" onClick={()=>setOpen(false)}>Services</Link><Button className="site-dropdown-toggle" variant="ghost" aria-label="Expand Services menu" aria-expanded={services} aria-controls="services-submenu" onClick={()=>setServices(!services)}><ChevronDown/></Button><div id="services-submenu" className="site-submenu"><Link to="/service/best-seo-services-in-india/" onClick={()=>{setOpen(false);setServices(false)}}>SEO Services</Link></div></div>
   {pageLinks.filter(p=>p.to!=='/about/'&&p.to!=='/services/').map(p=><Link key={p.to} to={p.to} onClick={()=>setOpen(false)}>{p.label}</Link>)}<a href="https://www.seoexpertindia.biz/blog/">Blog</a>{consult(true)}
  </nav>{consult()}</div></header></>;
}
