import { createFileRoute, notFound } from '@tanstack/react-router';
import { serviceVariants } from '@/data/service-variants';
import { SeoServicesPage } from './service.best-seo-services-in-india';
import { WebsiteDevelopment } from './service.web-development-company-india';

export const Route = createFileRoute('/service/$slug')({
 loader: ({ params }) => { const v = serviceVariants[params.slug]; if (!v) throw notFound(); return v; },
 head: ({ loaderData: v }) => v ? ({
  meta: [{ title: v.title }, { name: 'description', content: v.description }, { property: 'og:title', content: v.title }, { property: 'og:description', content: v.description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: v.url }, { name: 'twitter:card', content: 'summary_large_image' }],
  links: [{ rel: 'canonical', href: v.url }],
 }) : ({ meta: [{ title: 'Service unavailable | SEO Expert India' }, { name: 'robots', content: 'noindex' }] }),
 component: ServiceVariantPage,
});

function ServiceVariantPage() {
 const v = Route.useLoaderData();
 return v.kind === 'seo' ? <SeoServicesPage v={v} /> : <WebsiteDevelopment v={v} />;
}
