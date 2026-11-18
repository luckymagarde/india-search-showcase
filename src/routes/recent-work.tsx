import {createFileRoute} from '@tanstack/react-router';
import {ExternalLink} from 'lucide-react';
import {PageShell,Intro,SectionHead,FinalCTA} from '@/components/site/page-shell';
import {recentWorkDesigns,seoProjectReferences} from '@/data/recent-work';
import {pageHead} from '@/data/site-pages';
export const Route=createFileRoute('/recent-work')({head:()=>pageHead('recent-work','Recent Work – Website & SEO Portfolio','Explore SEO Expert India’s website design portfolio across fashion, sports, construction, wellness and eCommerce, with a separate SEO projects section.'),component:RecentWork});

function RecentWork(){return <PageShell reviews={false}>
 <Intro name="Recent Work" eyebrow="Websites + search" title="Recent work & website portfolio." description="Website designs across different industries, followed by our SEO project references."/>
 <section aria-labelledby="website-projects"><div className="sp-wrap">
  <div id="website-projects"><SectionHead eyebrow="Website portfolio" title="Website Development Projects"/></div>
  <div className="rw-gallery">{recentWorkDesigns.map(project=><figure className="rw-scroll" key={project.asset.url} tabIndex={0} aria-label={project.alt}>
   <img src={project.asset.url} alt={project.alt} width={project.width} height={project.height} loading="lazy" decoding="async"/>
  </figure>)}</div>
 </div></section>
 <section className="sp-band" aria-labelledby="seo-projects"><div className="sp-wrap">
  <div id="seo-projects"><SectionHead eyebrow="Search portfolio" title="SEO Projects" description="Website references from our original Recent Work page."/></div>
  <div className="sp-grid">{seoProjectReferences.map(([category,url])=><article className="sp-card" key={url}>
   <div className="sp-label">{category}</div><h3>{new URL(url).hostname.replace('www.','')}</h3>
   <a className="sp-service-link" href={url} target="_blank" rel="noopener noreferrer">Visit website<ExternalLink aria-hidden/></a>
  </article>)}</div>
 </div></section><FinalCTA/>
 </PageShell>}
