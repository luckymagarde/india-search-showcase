import { serviceCatalogue } from "./service-catalogue";

const aliases: Record<string, string> = {
  education: "seo-services-for-education-industry",
  "education & elearning": "seo-services-for-education-industry",
  "educational websites": "seo-services-for-education-industry",
  healthcare: "healthcare-website-seo-services",
  "healthcare & medical": "healthcare-website-seo-services",
  "healthcare websites": "healthcare-website-seo-services",
  ecommerce: "ecommerce-website-seo-services",
  "ecommerce & retail": "ecommerce-website-seo-services",
  "ecommerce websites": "ecommerce-website-seo-services",
  "real estate": "real-estate-website-seo-services",
  "real estate websites": "real-estate-website-seo-services",
  "legal services": "seo-for-law-firm",
  "law firm seo": "seo-for-law-firm",
  legal: "seo-for-law-firm",
  "it & software": "seo-for-it-industry",
  "it & saas seo": "seo-for-it-industry",
  "saas & technology": "seo-for-it-industry",
  technology: "seo-for-it-industry",
  "home improvement": "home-improvements",
  "home improvements": "home-improvements",
  automotive: "automobile-industries-seo",
  "pet services": "pet-services",
  "local businesses": "best-local-seo-services-in-india",
  "local business seo": "best-local-seo-services-in-india",
};

/** Only resolves existing catalogue pages; unsupported categories stay unlinked. */
export function industryPath(name: string): string | undefined {
  const slug = aliases[name.toLowerCase().trim()];
  return serviceCatalogue.find((service) => service.path === `/service/${slug}/`)?.path;
}
