import { serviceCatalogue } from './service-catalogue';

type Kind = 'seo' | 'development';
const focus: Record<string, string> = {
 'newcastle-seo-expert': 'businesses in Newcastle upon Tyne and across the North East of England',
 'best-seo-linkbuilding-services-in-india': 'brands that need relevant, editorially earned links and safer authority building',
 'best-seo-services-in-uae': 'businesses in Dubai, Abu Dhabi and across the UAE',
 'global-seo-services': 'businesses expanding into multiple countries and languages',
 'seo-expert-new-york': 'businesses competing for customers in New York City',
 'san-diego-seo-expert': 'businesses serving customers in San Diego and Southern California',
 'seo-expert-london-uk': 'businesses targeting customers in London and the wider UK',
 'seo-expert-denmark': 'businesses targeting customers in Copenhagen and across Denmark',
 'best-seo-experts-in-malta': 'businesses in Valletta, Sliema and across Malta',
 'best-local-seo-services-in-india': 'local businesses that want more nearby calls, visits and map visibility in India',
 'seo-for-law-firm': 'law firms and legal practices that want more qualified client enquiries',
 'seo-services-for-education-industry': 'schools, colleges, coaching institutes and education providers',
 'home-improvements': 'home improvement, renovation and trade businesses',
 'pet-services': 'pet clinics, groomers, trainers and pet product businesses',
 'seo-for-it-industry': 'IT, SaaS and technology service companies',
 'automobile-industries-seo': 'car dealers, workshops and automobile businesses',
 'ecommerce-website-seo-services': 'online stores that want more organic product and category sales',
 'real-estate-website-seo-services': 'real estate agents, developers and property portals',
 'healthcare-website-seo-services': 'clinics, hospitals and healthcare practitioners',
 'web-agency-copenhagen-denmark': 'companies in Copenhagen and across Denmark',
 'web-development-company-paris': 'companies in Paris and across France',
 'web-development-company-netherlands': 'companies in Amsterdam, Rotterdam and across the Netherlands',
 'web-development-company-uk': 'companies across the United Kingdom',
 'web-development-agency-germany': 'companies in Berlin, Munich and across Germany',
 'web-development-company-washington': 'organisations and businesses in Washington, DC',
 'web-development-company-usa': 'companies across the United States',
 'website-development-company-malta': 'companies in Malta and Gozo',
};

export type Variant = { slug: string; kind: Kind; url: string; title: string; description: string; eyebrow: string; h1: string; crumb: string; intro: string };

export const serviceVariants: Record<string, Variant> = Object.fromEntries(
 serviceCatalogue.filter(s => !s.local).map(s => {
  const slug = s.path.split('/')[2] ?? '';
  const kind: Kind = s.category === 'development' ? 'development' : 'seo';
  const who = focus[slug];
  const intro = kind === 'seo'
   ? `SEO Expert India provides ${s.title} for ${who}. Since 2016 we have combined technical SEO, keyword and intent research, content optimisation, authority building and AI search readiness into one transparent plan built around your audience, competition and enquiry goals — with honest monthly reporting and no ranking guarantees.`
   : `SEO Expert India is a ${s.title.replace(/,.*/, '')} partner for ${who}. We plan, design and build fast, responsive, SEO-friendly websites — business sites, WordPress, custom builds and eCommerce — with clear scope, collaborative reviews, full ownership and support after launch.`;
  const title = `${s.title} | SEO Expert India`;
  const description = kind === 'seo'
   ? `${s.title} from SEO Expert India for ${who}: technical, content, local and AI search SEO with transparent reporting. Free consultation.`
   : `${s.title}: SEO Expert India builds responsive, SEO-friendly business, WordPress and eCommerce websites for ${who}. Get a free quote.`;
  return [slug, { slug, kind, url: s.url, title, description, eyebrow: s.category === 'industry' ? 'Industry SEO Services' : kind === 'seo' ? 'SEO Services' : 'Website Design & Development', h1: s.title, crumb: s.title, intro }];
 }),
);
