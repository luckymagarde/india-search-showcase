import { createFileRoute, notFound } from '@tanstack/react-router';
import { serviceVariants } from '@/data/service-variants';
import { SeoServicesPage } from './service.best-seo-services-in-india';
import { WebsiteDevelopment } from './service.web-development-company-india';

export const Route = createFileRoute('/service/$slug')({
 loader: ({ params }) => { const v = serviceVariants[params.slug]; if (!v) throw notFound(); return v; },
 head: ({ loaderData: v }) => v ? ({
  meta: [{ title: v.title }, { name: 'description', content: v.description }, { property: 'og:title', content: v.title }, { property: 'og:description', content: v.description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: v.url }, { name: 'twitter:card', content: 'summary_large_image' }],
  links: [{ rel: 'canonical', href: v.url }],
  scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context':'https://schema.org', '@graph':[
   { '@type':'Service', name:v.h1, serviceType:v.kind==='seo'?'Search engine optimization':'Website design and development', url:v.url, description:v.description, provider:{'@type':'Organization',name:'SEO Expert India',url:'https://www.seoexpertindia.biz/'} },
   { '@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.seoexpertindia.biz/'},{'@type':'ListItem',position:2,name:'Services',item:'https://www.seoexpertindia.biz/services/'},{'@type':'ListItem',position:3,name:v.crumb,item:v.url}]}
  ]}) }],
 }) : ({ meta: [{ title: 'Service unavailable | SEO Expert India' }, { name: 'robots', content: 'noindex' }] }),
 component: ServiceVariantPage,
});

function ServiceVariantPage() {
 const v = Route.useLoaderData();
 return v.kind === 'seo' ? <SeoServicesPage v={v} /> : <WebsiteDevelopment v={v} />;
}
