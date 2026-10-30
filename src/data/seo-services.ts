// Editable content for /service/best-seo-services-in-india/
// Set YOUTUBE_VIDEO_ID to a real video ID (e.g. "dQw4w9WgXcQ") to enable the video. Left empty on purpose.
export const YOUTUBE_VIDEO_ID = "";

export const PAGE_URL = "https://www.seoexpertindia.biz/service/best-seo-services-in-india/";

export const strategyPoints = [
  ["SEO Website Audit", "A full review of crawlability, indexation, speed, content and backlinks to find what is really holding the site back."],
  ["Competitor Analysis", "We study who ranks for your money keywords, how their pages are built and where their gaps are."],
  ["Keyword Research", "Keywords grouped by intent and business value, not just by search volume."],
  ["Technical SEO", "Fixes to architecture, canonicals, redirects, structured data and Core Web Vitals."],
  ["Content Strategy", "Topic clusters and page plans that answer real customer questions."],
  ["Link Building", "Relevant, earned authority from real publications and industry websites."],
  ["Performance Tracking", "Search Console and GA4 reporting tied to leads, not vanity metrics."],
];

export const aiServices = [
  ["AI Search Optimization Services", "Preparing your website and brand information so AI-driven search experiences can understand and accurately describe what you offer."],
  ["Generative Engine Optimization (GEO)", "Structuring facts, entities and context so generative systems can extract and synthesize your content reliably."],
  ["Answer Engine Optimization (AEO)", "Question-led content and clear, concise answers designed for featured snippets, voice and answer-first formats."],
  ["AI Overview Optimization", "Aligning key pages with the query types that commonly trigger AI Overviews in Google Search."],
  ["Large Language Model Optimization (LLMO)", "Improving how consistently your brand, services and expertise are represented across the sources language models learn from."],
  ["Entity SEO", "Defining your organization, people, products and locations clearly and consistently across the web."],
  ["Semantic Search Optimization", "Covering topics in depth with natural language that maps to how people actually ask."],
  ["Structured Data Engineering", "Valid Organization, Service, Product and LocalBusiness schema that matches the visible content."],
  ["AI Search Visibility Analysis", "Monitoring how and where your brand appears in AI-generated answers for priority topics."],
  ["Knowledge Graph Optimization", "Strengthening the signals that connect your brand to the right entities and attributes."],
  ["Conversational Search Optimization", "Content shaped around longer, follow-up style questions used in chat and voice search."],
];

export const aiPlatforms = [
  ["ChatGPT Search", "Conversational answers with cited sources."],
  ["Google AI Overviews", "AI summaries above classic results."],
  ["Google Gemini", "Google's multimodal assistant."],
  ["Perplexity", "Answer engine built on live citations."],
  ["Microsoft Copilot", "AI answers across Bing and Microsoft 365."],
];

export const tools = [
  ["Ahrefs", "Backlink research and competitor keyword gaps."],
  ["SEMrush", "Keyword research, position tracking and site audits."],
  ["Google Search Console", "Indexing, impressions, clicks and query data."],
  ["Google Analytics 4", "Engagement, conversions and organic lead attribution."],
  ["Screaming Frog", "Deep technical crawls, redirects and metadata audits."],
  ["Surfer SEO", "Content analysis and on-page topical coverage."],
];

export const platforms: { name: string; intro: string; points: string[] }[] = [
  { name: "WordPress", intro: "WordPress is flexible, but themes and plugins often create bloat, duplicate archives and thin taxonomy pages.", points: ["Clean permalink structure and canonical tags on archives, tags and pagination", "Title and meta templates via SEO plugins, reviewed page by page", "Schema for Organization, Service, Article and Breadcrumbs", "Caching, image compression and plugin clean-up for faster Core Web Vitals", "Noindex rules for thin tag, author and attachment pages", "Internal linking and content optimization for priority pages"] },
  { name: "WooCommerce", intro: "WooCommerce stores combine WordPress issues with product variations, filters and duplicate product URLs.", points: ["Product and category page optimization with unique descriptions", "Product, Offer and Breadcrumb schema", "Canonical handling for variations, filters and sorting parameters", "Speed optimization for heavy cart and checkout scripts", "Crawl control for faceted navigation", "Out-of-stock and discontinued product handling"] },
  { name: "Shopify", intro: "Shopify is fast to launch but enforces URL patterns like /collections/ and /products/ that can create duplicates.", points: ["Canonical fixes for collection-nested product URLs", "Editable title and meta templates for products and collections", "Product and Organization schema in theme code", "App audit to reduce render-blocking scripts", "Collection page content and internal linking", "Sitemap and robots.txt.liquid review"] },
  { name: "Magento", intro: "Magento suits large catalogues but needs careful control of layered navigation and indexing at scale.", points: ["Layered navigation and parameter crawl management", "Canonical and hreflang setup for multi-store builds", "Metadata templates across thousands of products", "Full-page cache, CDN and image performance tuning", "Product and category schema", "Index bloat clean-up and XML sitemap segmentation"] },
  { name: "Squarespace", intro: "Squarespace limits code access, so SEO work focuses on structure, content and the settings available.", points: ["Page titles, descriptions and clean slugs", "Heading hierarchy and image alt text", "Code-injected structured data where supported", "Image sizing and section reduction for speed", "Blog and collection page optimization", "Search Console and indexing checks"] },
  { name: "Wix", intro: "Modern Wix supports solid SEO when its settings and templates are configured properly.", points: ["SEO settings and meta templates per page type", "Custom URL slugs and 301 redirect manager", "Structured data markup via Wix SEO tools", "Image and app reduction for faster loading", "Content and heading optimization", "Indexing and crawlability verification"] },
  { name: "Weebly", intro: "Weebly sites are simple but often need stronger content, metadata and speed improvements.", points: ["Page titles, descriptions and URL clean-up", "Heading structure and keyword mapping", "Basic schema via header code", "Image compression and lighter layouts", "Content expansion for thin pages", "Sitemap submission and indexing checks"] },
  { name: "BigCommerce", intro: "BigCommerce is SEO-capable for growing stores, with faceted search and URL settings to manage.", points: ["Product URL structure and canonical settings", "Faceted search crawl and index control", "Product, Review and Breadcrumb schema accuracy", "Theme script and image performance improvements", "Category content and internal linking", "Ecommerce technical audits and redirect mapping"] },
];

export const industries = [
  ["🩺", "Healthcare & Medical", "Trust-led content, practitioner entities and local visibility for clinics, hospitals and health brands.", "lg"],
  ["🏙️", "Real Estate", "Location pages, project listings and local search for builders, brokers and property portals.", "md"],
  ["🛒", "Ecommerce & Retail", "Category architecture, product SEO and shopping visibility.", "md"],
  ["🎓", "Education & eLearning", "Course pages, program content and student-intent keywords.", "sm"],
  ["💹", "Finance & FinTech", "Accurate, expert content that meets high trust expectations.", "sm"],
  ["✈️", "Travel & Hospitality", "Destination content, hotel pages and seasonal search demand.", "sm"],
  ["⚖️", "Legal Services", "Practice-area pages and local SEO for law firms and advisors.", "sm"],
  ["🏭", "Manufacturing", "Product specifications and B2B buyer-intent keywords for exporters and OEMs.", "md"],
  ["💻", "SaaS & Technology", "Feature pages, comparison content and product-led growth SEO.", "md"],
  ["📍", "Local Businesses", "Google Business Profile, Maps and neighbourhood search.", "sm"],
  ["🧾", "Professional Services", "Authority content for consultants, agencies and accountants.", "sm"],
  ["🤝", "B2B Companies", "Long sales-cycle content that supports qualified enquiries.", "wide"],
] as const;

export const services: { icon: string; name: string; desc: string; points: string[] }[] = [
  { icon: "⚙️", name: "Technical SEO", desc: "Our technical SEO services make sure search engines and AI crawlers can find, render and index every important page. We start with a deep crawl, then fix the issues that limit performance — in priority order.", points: ["Website technical audits", "Crawlability and indexability", "XML sitemap optimization", "Robots.txt optimization", "Canonical tag implementation", "Redirect management", "Structured data", "Core Web Vitals", "Website speed optimization", "Mobile usability", "JavaScript SEO", "Duplicate content management"] },
  { icon: "📝", name: "On-Page SEO", desc: "On-page SEO aligns every page with the intent behind the searches you want to win. We map keywords to pages, sharpen titles and headings and improve content so it reads well for people first.", points: ["Title tag optimization", "Meta descriptions", "Heading structure", "Keyword mapping", "Search intent optimization", "Internal linking", "Image SEO", "Content optimization", "URL structure", "Schema implementation"] },
  { icon: "🔗", name: "Off-Page SEO", desc: "Authority is earned, not bought in bulk. Our off-page work focuses on relevant links and genuine brand mentions from sites your customers actually read — quality and relevance over artificial volume.", points: ["Quality link building", "Digital PR", "Relevant backlink acquisition", "Brand mentions", "Authority development", "Competitor backlink analysis"] },
  { icon: "📍", name: "Local SEO", desc: "Our local SEO services help nearby customers find you on Google Maps and in local results, with a complete Google Business Profile and consistent business information everywhere.", points: ["Google Business Profile optimization", "Local keyword research", "Local landing pages", "NAP consistency", "Local citations", "Review strategy", "LocalBusiness schema", "Google Maps visibility"] },
  { icon: "🌍", name: "International SEO", desc: "International SEO services for businesses targeting multiple countries or languages, built on the right URL structure and correct hreflang so the right page reaches the right market.", points: ["Country-specific keyword research", "Language targeting", "Hreflang implementation", "International URL structure", "Country-specific landing pages", "Multilingual content optimization", "International technical SEO"] },
  { icon: "🛍️", name: "Ecommerce SEO", desc: "Ecommerce SEO services that turn category and product pages into dependable sources of organic revenue, while keeping filters and variations from creating index bloat.", points: ["Product page optimization", "Category page SEO", "Product schema", "Shopping search visibility", "Faceted navigation", "Duplicate URL management", "Ecommerce technical SEO", "Conversion-focused content"] },
  { icon: "🏢", name: "Enterprise SEO", desc: "For large websites with thousands of URLs, we design SEO processes that scale — from architecture and indexation to automation and reporting for multiple teams.", points: ["Large website SEO architecture", "Advanced technical audits", "Scalable content strategies", "Large-scale internal linking", "Indexation management", "SEO automation opportunities", "Enterprise reporting"] },
  { icon: "🔍", name: "Keyword Research & Content SEO", desc: "Content that ranks starts with research. We find the questions your buyers ask, map them to intent and build topic clusters that grow topical authority over time.", points: ["Keyword discovery", "Search intent mapping", "Competitor keyword gaps", "Topic clusters", "Content planning", "Content optimization", "Topical authority development"] },
];

export const processSteps = [
  ["🔎", "Website SEO Audit", "Technical, content and backlink review to establish a clear baseline."],
  ["📊", "Keyword & Competitor Research", "Intent-based keywords and a clear view of who you compete with."],
  ["🧭", "SEO Strategy Development", "A prioritized roadmap based on impact and effort."],
  ["🛠️", "Technical SEO Implementation", "Fixing crawl, index, speed and structured data issues."],
  ["✍️", "On-Page & Content Optimization", "Improving existing pages and publishing new content."],
  ["🔗", "Authority & Link Building", "Earning relevant links and brand mentions."],
  ["📈", "Performance Monitoring", "Tracking visibility, traffic and conversions every month."],
  ["🚀", "Continuous Optimization & Growth", "Refining the plan as data and search behaviour change."],
];

// Prices and deliverables are editable.
export const packages = [
  { name: "Starter SEO", price: "€599", period: "/month", fit: "Suitable for small businesses and new websites.", featured: false, items: ["Initial SEO audit", "Keyword research", "On-page optimization", "Technical SEO recommendations", "Basic content optimization", "Monthly performance report"] },
  { name: "Business Growth SEO", price: "€1000", period: "/month", fit: "Suitable for growing businesses targeting competitive keywords.", featured: true, items: ["Advanced SEO audit", "Expanded keyword strategy", "Technical SEO implementation", "On-page optimization", "Content strategy", "Quality link building", "Local SEO where applicable", "Competitor analysis", "Monthly reporting"] },
  { name: "Enterprise SEO", price: "€1500", period: "/month", fit: "Suitable for large websites and competitive industries.", featured: false, items: ["Comprehensive technical SEO", "Advanced keyword research", "Enterprise website architecture", "International SEO where required", "Advanced content strategy", "Authority development", "Advanced analytics and reporting", "Ongoing SEO consulting"] },
];

export const whyUs = [
  "10+ Years of Industry Experience", "Customized SEO Strategies", "Technical SEO & Website Development Expertise", "AI Search Engineering", "International SEO Experience", "White-Hat SEO Practices", "Transparent Reporting", "Data-Driven Decisions", "Conversion-Focused Optimization", "Long-Term Organic Growth Strategy",
];

export const metrics = [
  ["Organic Traffic", "Sessions from unpaid search, segmented by page and market."],
  ["Keyword Visibility", "Movement across your tracked keyword set."],
  ["Search Impressions", "How often your pages appear in Google results."],
  ["Click-Through Rate", "How compelling your titles and snippets are."],
  ["Indexed Pages", "Which important pages Google has actually indexed."],
  ["Backlink Growth", "New referring domains and their relevance."],
  ["Organic Conversions", "Goals and purchases attributed to organic search."],
  ["Leads and Enquiries", "Form fills, calls and WhatsApp messages from SEO."],
  ["Core Web Vitals", "LCP, INP and CLS measured from real users."],
];

export const faqs: [string, string][] = [
  ["What are SEO services and how do they work?", "SEO services are the ongoing work of improving a website so it earns more visibility in organic search. A professional SEO company audits the site, researches keywords and competitors, fixes technical issues, improves content and builds authority. Search engines then crawl and re-evaluate the improved pages, which over time can lead to better rankings, more qualified traffic and more enquiries."],
  ["How long does SEO take to show results?", "Technical fixes can show measurable movement within a few weeks, while meaningful ranking and traffic growth from content and authority work usually takes three to six months, and longer in very competitive markets. Timelines depend on your website's current state, competition and how quickly changes are implemented, so we report progress transparently every month rather than promising a fixed date."],
  ["How much do SEO services cost in India?", "The cost of SEO services in India depends on the size of the website, the competitiveness of your keywords, the markets you target and the amount of content and link building required. Our packages start from the Starter SEO plan shown above, and every proposal is customized after a free consultation so you only pay for the work your business actually needs."],
  ["What is included in a professional SEO package?", "A professional SEO package typically includes an SEO audit, keyword research, technical SEO, on-page optimization, content strategy, link building and monthly reporting. Higher tiers add competitor analysis, local or international SEO, advanced analytics and ongoing consulting. Deliverables are always agreed in writing before work starts."],
  ["What is the difference between on-page and off-page SEO?", "On-page SEO covers everything on your own website — titles, headings, content, internal links, images and schema. Off-page SEO covers signals from outside your website, mainly relevant backlinks, digital PR and brand mentions that build authority and trust. Both are needed: strong pages without authority struggle to rank, and authority cannot compensate for weak pages."],
  ["Do you provide local SEO services?", "Yes. Our local SEO services include Google Business Profile optimization, local keyword research, local landing pages, NAP consistency, citations, review strategy and LocalBusiness schema to improve visibility in Google Maps and local search results."],
  ["Can you improve the SEO of an existing website?", "Yes — most of our work is improving existing websites. We begin with an audit to understand what is already working, protect the pages and links that bring traffic today and then fix technical, content and authority gaps in priority order. A full rebuild is only recommended when the current platform genuinely limits growth."],
  ["Do you provide international SEO services?", "Yes. We help businesses expand into new countries and languages with country-specific keyword research, the right URL structure, correct hreflang implementation and localized landing pages, alongside the technical SEO needed to support multiple markets."],
  ["What is AI Search Optimization?", "AI Search Optimization is the practice of making your content and brand information easy for AI-powered search experiences — such as Google AI Overviews, ChatGPT Search, Gemini, Perplexity and Copilot — to understand and reference. It combines GEO, AEO, entity SEO and structured data. No one can guarantee inclusion in AI-generated answers, but clear, well-structured and credible content measurably improves the odds."],
  ["How can I get started with SEO Expert India?", "Fill in the consultation form at the top of this page or contact us by phone or WhatsApp. We will review your website and goals, discuss your market and competitors and send a customized SEO strategy and proposal — with no obligation."],
];
