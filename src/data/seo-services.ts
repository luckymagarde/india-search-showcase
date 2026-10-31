// Editable content for /service/best-seo-services-in-india/
export const strategyVideos = [
  { id: "xNpsxDlSdYQ", title: "SEO strategy: building the foundation", description: "Explore a connected approach to website health, search intent and organic visibility." },
  { id: "UZPw9tkgDnI", title: "Turning search insights into action", description: "A second perspective on prioritizing SEO work and developing a practical growth roadmap." },
];

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
  [
    "Generative Engine Optimization (GEO)",
    "Organize original evidence, clear entities and source context so generative search can interpret your expertise."
  ],
  [
    "Answer Engine Optimization (AEO)",
    "Build useful question-led pages with direct answers, supporting detail and accessible information structure."
  ],
  [
    "AI Overview Optimization",
    "Improve topic coverage and source clarity for queries that surface AI summaries in Google Search."
  ],
  [
    "Large Language Model Optimization (LLMO)",
    "Strengthen consistent brand facts and authoritative references across the sources AI systems may retrieve."
  ],
  [
    "Entity & Semantic SEO",
    "Connect people, services and topics through precise language, internal links and consistent organizational information."
  ],
  [
    "Structured Data Engineering",
    "Implement validated markup that describes visible services, products and business details without unsupported claims."
  ],
  [
    "AI Search Visibility Analysis",
    "Review brand mentions and cited pages across priority conversational queries, recording variability and next actions."
  ]
] as const;

export const aiPlatforms = [
  ["ChatGPT Search", "Conversational answers with cited sources."],
  ["Google AI Overviews", "AI summaries above classic results."],
  ["Google Gemini", "Google's multimodal assistant."],
  ["Perplexity", "Answer engine built on live citations."],
  ["Microsoft Copilot", "AI answers across Bing and Microsoft 365."],
] as const;

export const tools = [
  ["Ahrefs", "Backlink research and competitor keyword gaps."],
  ["SEMrush", "Keyword research, position tracking and site audits."],
  ["Google Search Console", "Indexing, impressions, clicks and query data."],
  ["Google Analytics 4", "Engagement, conversions and organic lead attribution."],
  ["Screaming Frog", "Deep technical crawls, redirects and metadata audits."],
  ["Surfer SEO", "Content analysis and on-page topical coverage."],
] as const;

export const platforms: { name: string; intro: string; points: string[] }[] = [
  { name: "WordPress", intro: "WordPress gives businesses extensive control over publishing, but that flexibility can introduce slow plugins, duplicate archives and inconsistent page templates. We audit the theme, permalink structure and SEO settings before refining priority content. Carefully configured metadata, schema and internal links help search engines understand your expertise, while performance improvements make articles and service pages easier for visitors to explore.", points: ["Clean permalink structure and canonical tags on archives, tags and pagination", "Title and meta templates via SEO plugins, reviewed page by page", "Schema for Organization, Service, Article and Breadcrumbs", "Caching, image compression and plugin clean-up for faster Core Web Vitals", "Noindex rules for thin tag, author and attachment pages", "Internal linking and content optimization for priority pages"] },
  { name: "WooCommerce", intro: "WooCommerce combines a content management system with a growing product catalogue, making crawl efficiency and purchase intent especially important. We strengthen category architecture, enrich product descriptions and manage variations that generate duplicate URLs. Our work also reviews structured product information, image delivery and unnecessary scripts, helping shoppers discover relevant collections without allowing filters or unavailable products to overwhelm the index.", points: ["Product and category page optimization with unique descriptions", "Product, Offer and Breadcrumb schema", "Canonical handling for variations, filters and sorting parameters", "Speed optimization for heavy cart and checkout scripts", "Crawl control for faceted navigation", "Out-of-stock and discontinued product handling"] },
  { name: "Shopify", intro: "Shopify provides a dependable storefront foundation, but collection paths, theme code and installed apps can complicate organic discovery. We review product canonicals, collection content and navigation against customer search intent. By refining metadata, structured data and app performance, we help search engines identify the preferred product pages and make the journey from an informational query to a relevant purchase more coherent.", points: ["Canonical fixes for collection-nested product URLs", "Editable title and meta templates for products and collections", "Product and Organization schema in theme code", "App audit to reduce render-blocking scripts", "Collection page content and internal linking", "Sitemap and robots.txt.liquid review"] },
  { name: "Magento", intro: "Magento supports complex catalogues and multiple stores, so successful SEO requires coordinated control of navigation, indexation and page templates. We investigate layered filters, duplicate paths and regional targeting before defining scalable improvements. Product metadata, category content and segmented sitemaps work alongside caching and image optimization, allowing valuable inventory to remain discoverable as the catalogue and number of markets expand.", points: ["Layered navigation and parameter crawl management", "Canonical and hreflang setup for multi-store builds", "Metadata templates across thousands of products", "Full-page cache, CDN and image performance tuning", "Product and category schema", "Index bloat clean-up and XML sitemap segmentation"] },
  { name: "Squarespace", intro: "Squarespace makes polished publishing accessible, yet its managed environment requires thoughtful use of available SEO controls. We organize page hierarchy, refine collection content and align titles with specific customer needs. Image sizing, clean headings and carefully supported structured data improve clarity without fighting the platform. Search Console checks then help distinguish pages worth developing from content that should be consolidated.", points: ["Page titles, descriptions and clean slugs", "Heading hierarchy and image alt text", "Code-injected structured data where supported", "Image sizing and section reduction for speed", "Blog and collection page optimization", "Search Console and indexing checks"] },
  { name: "Wix", intro: "Wix offers increasingly capable SEO settings, but automated templates still need a strategy tailored to the business. We map services to search intent, review dynamic page rules and resolve unnecessary URL changes. Alongside metadata and structured data configuration, we simplify heavy visual elements and strengthen internal links, making important pages easier to crawl and more useful to prospective customers.", points: ["SEO settings and meta templates per page type", "Custom URL slugs and 301 redirect manager", "Structured data markup via Wix SEO tools", "Image and app reduction for faster loading", "Content and heading optimization", "Indexing and crawlability verification"] },
  { name: "Weebly", intro: "Weebly websites benefit from a focused approach that respects the limits of a straightforward site builder. We improve service page depth, navigation and search-friendly titles before reviewing image weight and mobile usability. Practical redirects, accessible headings and supported schema reinforce those changes. Indexing checks help confirm that the pages representing your most important offers can actually be discovered through search.", points: ["Page titles, descriptions and URL clean-up", "Heading structure and keyword mapping", "Basic schema via header code", "Image compression and lighter layouts", "Content expansion for thin pages", "Sitemap submission and indexing checks"] },
  { name: "BigCommerce", intro: "BigCommerce supports ambitious online stores, but faceted navigation and extensive inventory demand disciplined SEO management. We review product URL settings, filter behaviour and category hierarchy to direct crawlers toward useful shopping destinations. Accurate product markup, distinctive descriptions and stronger internal linking support discovery, while performance audits and redirect plans protect the customer experience during catalogue updates or store migrations.", points: ["Product URL structure and canonical settings", "Faceted search crawl and index control", "Product, Review and Breadcrumb schema accuracy", "Theme script and image performance improvements", "Category content and internal linking", "Ecommerce technical audits and redirect mapping"] },
];

export const industries = [
  [
    "🩺",
    "Healthcare & Medical",
    "Trust and proximity shape how patients choose care. We research treatment, symptom and local clinic queries, then organize service pages around accurate medical information rather than unsupported promises. Practitioner credentials, editorial review and clear contact details strengthen credibility. Local business information, relevant schema and accessible mobile navigation help people find appropriate services while preserving sensitivity around personal health decisions.",
    "lg"
  ],
  [
    "🏙️",
    "Real Estate",
    "Property searches combine location, budget and intent, from neighborhood research to ready-to-view listings. We develop useful area pages, improve listing architecture and manage expired properties without creating dead ends. Descriptive amenities, clear availability and relevant property information support discovery. Internal links connect projects to local guidance, while crawl controls prevent filters and near-identical listings from consuming attention unnecessarily.",
    "md"
  ],
  [
    "🛒",
    "Ecommerce & Retail",
    "Shoppers move between broad categories, detailed comparisons and exact product searches. We map that journey into clear collection architecture, distinctive descriptions and helpful buying guidance. Technical audits address variants, filters, unavailable inventory and duplicate URLs. Accurate product markup and faster image delivery support eligible shopping appearances, while conversion analysis identifies where organic visitors need clearer information before purchasing.",
    "md"
  ],
  [
    "🎓",
    "Education & eLearning",
    "Prospective students compare course outcomes, eligibility, teaching format and cost before committing. We research those questions and build informative program pages supported by curriculum detail and relevant resources. Course organization, accessible video context and clear enrollment pathways improve usefulness. Technical work manages overlapping campus or course URLs, while timely content addresses application cycles without manufacturing placement or accreditation claims.",
    "sm"
  ],
  [
    "💹",
    "Finance & FinTech",
    "Financial decisions require careful explanation and credible sourcing. We organize product and educational content around suitability, fees, risk and customer questions, with expert review where appropriate. Keyword opportunities span comparison searches, regulatory topics and practical financial tasks. Clear author information, current disclosures and accurate structured data strengthen trust, while technical optimization helps important material remain accessible across devices.",
    "sm"
  ],
  [
    "✈️",
    "Travel & Hospitality",
    "Travel discovery depends on destination, season, availability and the experience a visitor wants. We develop useful destination guides and accommodation pages with original amenities, location information and practical planning detail. Image performance, local visibility and clear booking pathways support mobile travelers. Managing seasonal updates and duplicate booking parameters keeps search engines focused on stable pages rather than transient availability combinations.",
    "sm"
  ],
  [
    "⚖️",
    "Legal Services",
    "People seeking legal help often search by practice area, location and immediate concern. We structure pages around those needs, explaining processes and qualifications without promising case outcomes. Attorney profiles, accurate jurisdiction information and carefully reviewed educational content reinforce credibility. Local search optimization, relevant schema and accessible contact options help potential clients evaluate the right service before requesting advice.",
    "sm"
  ],
  [
    "🏭",
    "Manufacturing",
    "Industrial buyers search for specifications, production capabilities, certifications and supply reliability. We build clear product taxonomies and detailed capability pages that answer technical procurement questions. Original application guides and downloadable specification context support longer research cycles. International targeting, distributor consistency and crawlable catalogue information help manufacturers reach relevant buyers without relying on vague high-volume keywords or unverified certification claims.",
    "md"
  ],
  [
    "💻",
    "SaaS & Technology",
    "Technology buyers compare features, integrations, alternatives and implementation effort across a long evaluation journey. We connect solution pages with specific use cases, product documentation and honest comparison content. Technical audits address JavaScript rendering, duplicate documentation and changing product URLs. Topic clusters and internal links strengthen discovery, while signup and enquiry measurement clarify which organic visits represent meaningful product interest.",
    "md"
  ],
  [
    "📍",
    "Local Businesses",
    "Nearby customers look for availability, directions, services and practical reasons to choose a provider. We align business profiles with accurate opening information and relevant service categories, then develop genuinely useful location pages. Consistent citations, a responsible review process and LocalBusiness markup support clarity. Mobile performance and prominent contact details reduce friction when visitors are ready to call or visit.",
    "sm"
  ],
  [
    "🧾",
    "Professional Services",
    "Consultants, accountants and specialist firms need to demonstrate expertise before an enquiry becomes a conversation. We research problem-led queries, clarify service scope and create useful guidance around the client decision process. Author credentials, relevant case material supplied by the business and logical internal links strengthen trust. Technical improvements and lead tracking connect those content efforts to qualified commercial opportunities.",
    "sm"
  ],
  [
    "🤝",
    "B2B Companies",
    "Business buyers often involve several stakeholders and compare suppliers over months rather than minutes. We organize content around procurement questions, industry applications and clear solution differences. Detailed service pages, technical resources and helpful comparisons support each evaluation stage. Scalable internal links and CRM-compatible conversion definitions help connect organic discovery to meaningful enquiries without mistaking every informational visit for buying intent.",
    "wide"
  ]
] as const;

export const services: { icon: string; name: string; desc: string; points: string[] }[] = [
  { icon: "⚙️", name: "Technical SEO", desc: "Technical SEO creates the conditions that allow search engines to discover, render and evaluate important pages reliably. We begin with a crawl and a review of indexing evidence, then prioritize issues by their effect on valuable content rather than the number of warnings in a tool. Architecture, redirects, canonicals, robots directives and sitemaps are checked together so they do not send conflicting signals. Performance work examines image delivery, scripts and mobile interaction, while structured data is validated against visible information. For JavaScript websites, we compare rendered output with source content. Changes are documented and retested after implementation. The objective is a stable, understandable website that supports content discovery and avoids preventable losses during updates or migrations.", points: ["Website technical audits", "Crawlability and indexability", "XML sitemap optimization", "Robots.txt optimization", "Canonical tag implementation", "Redirect management", "Structured data", "Core Web Vitals", "Website speed optimization", "Mobile usability", "JavaScript SEO", "Duplicate content management"] },
  { icon: "📝", name: "On-Page SEO", desc: "On-page SEO connects the purpose of each page with the questions and expectations behind a search. We research intent before assigning target topics, then improve titles, descriptions, headings and body content without forcing repetitive keywords. Clear answers, relevant examples and useful comparison details help visitors assess your offer. Internal links connect related resources and indicate which pages deserve attention, while image descriptions and concise URLs improve accessibility and context. We also review structured data eligibility and the relationship between pages targeting similar queries. Existing successful content is protected rather than rewritten blindly. The result is a more coherent information experience, supported by measurable engagement and conversion checks instead of isolated ranking targets.", points: ["Title tag optimization", "Meta descriptions", "Heading structure", "Keyword mapping", "Search intent optimization", "Internal linking", "Image SEO", "Content optimization", "URL structure", "Schema implementation"] },
  { icon: "🔗", name: "Off-Page SEO", desc: "Off-page SEO develops credible signals beyond your own website through relevant coverage, references and earned links. We evaluate your existing backlink profile and competitors to understand which publications, communities and resources genuinely influence the audience you want to reach. Outreach is built around useful assets and editorial relevance, not bulk placements or guaranteed link counts. Digital public relations, supplier relationships and accurate brand mentions can support discoverability when they fit the business. Suspicious patterns are investigated carefully before any removal or disavow recommendation. Every opportunity is reviewed for context and quality. Reporting records acquired references and associated referral activity, helping authority development remain transparent without implying that a specific link guarantees a ranking.", points: ["Quality link building", "Digital PR", "Relevant backlink acquisition", "Brand mentions", "Authority development", "Competitor backlink analysis"] },
  { icon: "📍", name: "Local SEO", desc: "Local SEO helps a business present accurate, useful information to people searching nearby. We start with service areas, real locations and the categories that best describe your offer, then review Google Business Profile completeness and consistency across business directories. Location pages are developed around genuine differences in services and customer needs rather than swapping city names into identical text. Local keyword research informs those pages and supports clear contact pathways. We encourage a responsible review process without buying endorsements or filtering out dissatisfied customers. Relevant business markup and mobile usability reinforce the work. Reporting considers local queries, profile interactions and enquiries together, while recognizing that visibility varies with location, competition and individual search context.", points: ["Google Business Profile optimization", "Local keyword research", "Local landing pages", "NAP consistency", "Local citations", "Review strategy", "LocalBusiness schema", "Google Maps visibility"] },
  { icon: "🌍", name: "International SEO", desc: "International SEO coordinates discovery across countries and languages while respecting differences in customer vocabulary, intent and commercial expectations. We assess the existing domain and URL structure before recommending an approach suited to the markets you actually serve. Hreflang relationships, canonical consistency and regional sitemap coverage are checked together to reduce contradictory targeting signals. Research is localized rather than limited to translating keywords, and content explains relevant offers, availability and practical details for each audience. Teams receive clear guidance for maintaining language variants as the website changes. Performance is segmented by market so broad totals do not hide weak coverage. The objective is accurate regional discovery without duplicating content indiscriminately or claiming guaranteed international rankings.", points: ["Country-specific keyword research", "Language targeting", "Hreflang implementation", "International URL structure", "Country-specific landing pages", "Multilingual content optimization", "International technical SEO"] },
  { icon: "🛍️", name: "Ecommerce SEO", desc: "Ecommerce SEO connects catalogue architecture with the way customers research and buy products. We examine category demand, product differentiation and navigation before refining collections, descriptions and supporting buying guidance. Variations, filters and sorting parameters are reviewed to keep duplicate combinations from overwhelming crawl activity. Accurate product and offer markup reflects visible price and availability, while image delivery and theme performance support a smoother mobile shopping experience. Discontinued inventory receives a considered redirect or retention strategy instead of automatic deletion. Internal links highlight meaningful alternatives and related categories. Organic sessions are evaluated alongside transactions and assisted journeys where tracking permits, allowing priorities to reflect commercial usefulness without promising a fixed revenue increase.", points: ["Product page optimization", "Category page SEO", "Product schema", "Shopping search visibility", "Faceted navigation", "Duplicate URL management", "Ecommerce technical SEO", "Conversion-focused content"] },
  { icon: "🏢", name: "Enterprise SEO", desc: "Enterprise SEO makes organic discovery manageable across large websites, multiple teams and frequent release cycles. We identify systemic issues in templates, architecture and indexation before proposing scalable changes that can be tested on representative page groups. Content governance, internal linking rules and technical acceptance criteria help prevent the same problems from returning with each launch. Automation is considered for repeatable checks rather than used to publish unchecked material at scale. Collaboration with development, product and editorial teams turns recommendations into a shared implementation roadmap. Reporting separates segments and markets so priorities remain visible. This approach supports dependable operations and informed investment while protecting valuable existing pages through migrations, platform changes and catalogue expansion.", points: ["Large website SEO architecture", "Advanced technical audits", "Scalable content strategies", "Large-scale internal linking", "Indexation management", "SEO automation opportunities", "Enterprise reporting"] },
  { icon: "🔍", name: "Keyword Research & Content SEO", desc: "Keyword research and content SEO turn customer questions into a practical editorial and page development plan. We investigate intent, competing results and the business relevance of each topic instead of selecting phrases only because they have high search volume. Related queries are grouped into clear page purposes, helping avoid overlapping content that competes with itself. Existing resources are assessed for accuracy, depth and usefulness before new material is commissioned. Briefs describe the answer readers need, supporting evidence, internal links and suitable conversion paths. Expert input is incorporated where the subject demands it. Ongoing reviews use search and engagement evidence to refine coverage, supporting sustainable topical relevance rather than mass-produced articles or artificial keyword density.", points: ["Keyword discovery", "Search intent mapping", "Competitor keyword gaps", "Topic clusters", "Content planning", "Content optimization", "Topical authority development"] },
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
  { name: "Starter SEO", price: "$599", period: "/month", fit: "Suitable for small businesses and new websites.", featured: false, items: ["Initial SEO audit", "Keyword research", "On-page optimization", "Technical SEO recommendations", "Basic content optimization", "Monthly performance report"] },
  { name: "Business Growth SEO", price: "$1000", period: "/month", fit: "Suitable for growing businesses targeting competitive keywords.", featured: true, items: ["Advanced SEO audit", "Expanded keyword strategy", "Technical SEO implementation", "On-page optimization", "Content strategy", "Quality link building", "Local SEO where applicable", "Competitor analysis", "Monthly reporting"] },
  { name: "Enterprise SEO", price: "$1500", period: "/month", fit: "Suitable for large websites and competitive industries.", featured: false, items: ["Comprehensive technical SEO", "Advanced keyword research", "Enterprise website architecture", "International SEO where required", "Advanced content strategy", "Authority development", "Advanced analytics and reporting", "Ongoing SEO consulting"] },
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
  ["What is technical SEO?", "Technical SEO improves the infrastructure that lets search engines crawl, render and index a website. It covers redirects, canonical URLs, robots directives, sitemaps, structured data, mobile usability and performance. We prioritize problems affecting important pages and verify the changes, rather than treating every automated audit warning as equally urgent."],
  ["Do you provide local SEO services?", "Yes. Our local SEO services include Google Business Profile optimization, local keyword research, local landing pages, NAP consistency, citations, review strategy and LocalBusiness schema to improve visibility in Google Maps and local search results."],
  ["Can you improve the SEO of an existing website?", "Yes — most of our work is improving existing websites. We begin with an audit to understand what is already working, protect the pages and links that bring traffic today and then fix technical, content and authority gaps in priority order. A full rebuild is only recommended when the current platform genuinely limits growth."],
  ["Do you provide international SEO services?", "Yes. We help businesses expand into new countries and languages with country-specific keyword research, the right URL structure, correct hreflang implementation and localized landing pages, alongside the technical SEO needed to support multiple markets."],
  ["What is AI Search Optimization?", "AI Search Optimization is the practice of making your content and brand information easy for AI-powered search experiences — such as Google AI Overviews, ChatGPT Search, Gemini, Perplexity and Copilot — to understand and reference. It combines GEO, AEO, entity SEO and structured data. No one can guarantee inclusion in AI-generated answers, but clear, well-structured and credible content measurably improves the odds."],
  ["How can I get started with SEO Expert India?", "Fill in the consultation form at the top of this page or contact us by phone or WhatsApp. We will review your website and goals, discuss your market and competitors and send a customized SEO strategy and proposal — with no obligation."],
];
