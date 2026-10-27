export const heroPills = [
  { t: "Technical SEO", d: "Crawl, speed, structure" },
  { t: "International SEO", d: "Multi-market visibility" },
  { t: "Local SEO", d: "Google Business & Maps" },
];

export const trust = [
  { i: "10+", t: "Years Experience", d: "A decade of hands-on SEO and web development work." },
  { i: "🌐", t: "SEO & Web Development", d: "Combining technical SEO with hands-on website builds." },
  { i: "🌍", t: "India + Global Markets", d: "Serving businesses across India and international markets." },
  { i: "📊", t: "Data-Driven Strategy", d: "Decisions grounded in research, not guesswork." },
  { i: "📋", t: "Transparent Reporting", d: "Clear, regular updates on what's actually happening." },
];

export const services = [
  ["◎", "SEO Services", "Search intent research, technical health, on-page optimization, content and authority building combined into one strategy. We start with an audit, then build a prioritized roadmap focused on qualified traffic."],
  ["🌐", "International SEO", "We research how audiences in each country search, structure your site with correct hreflang and country targeting, and adapt content to local intent."],
  ["📍", "Local SEO", "We optimize Google Business Profile, research local keywords, build location-specific landing pages, and keep citations and NAP details consistent."],
  ["⚙", "Technical SEO", "We audit crawlability, indexation, site architecture, Core Web Vitals, canonicalization and structured data, then fix issues in order of impact."],
  ["🛒", "eCommerce SEO", "We optimize product and category pages, build clean collection architecture and product schema, and resolve duplicate content from filters and sorting."],
  ["🅆", "WordPress SEO", "On-page optimization, technical cleanup, performance tuning and plugin configuration, plus a review of hosting and caching."],
  ["🏢", "Enterprise SEO", "Template-level changes, scalable internal linking patterns and governance around how pages get created — within your existing workflows."],
  ["🤖", "GEO & AEO Services", "Help your brand get discovered, understood and referenced across AI-powered search and answer platforms with structured content and entity optimization."],
  ["🔗", "Link Building", "Earning relevant, quality links through genuine outreach and content worth linking to — evaluated against your audience, not domain metrics alone."],
  ["✎", "Content Marketing", "We map topics to search intent and your customer journey, then build pages and articles that genuinely answer real questions."],
  ["▲", "Google Ads / PPC", "Campaign structure, keyword and audience targeting, ad copy testing and landing page alignment, with spend monitored closely."],
  ["✦", "Social Media Marketing", "Consistent posting aligned with your content strategy, platform-specific messaging and engagement tracking over time."],
  ["💻", "Website Development", "Custom, responsive websites built with SEO in mind from the first line of code — clean semantic HTML and fast-loading pages."],
  ["🛒", "eCommerce Website Development", "Online stores built around product discovery and conversion on Shopify, WooCommerce and Magento."],
  ["🏬", "Multi Vendor Website Development", "Marketplace websites with vendor onboarding, commission and payout logic, and a scalable structure."],
  ["🎓", "LMS Development", "Learning management systems for course delivery, student tracking and assessments, with payment and enrollment flows."],
] as const;

export const tools = [
  ["googleanalytics", "Google Analytics 4", "Behavioral analysis, conversion tracking and cross-platform journey mapping."],
  ["googlesearchconsole", "Google Search Console", "Core Web Vitals, CTR, position shifts, crawl errors and keyword performance."],
  ["ahrefs", "Ahrefs", "Keyword gap analysis, content clusters and backlink profile audits."],
  ["semrush", "Semrush", "Competitor research, position tracking and topic research."],
  ["screamingfrogseo", "Screaming Frog", "Structural site audits, broken links and internal link architecture."],
  ["woorank", "WooRank", "Client-friendly website grading and mobile usability checks."],
  ["yoast", "Yoast SEO", "Schema output, breadcrumbs, robots controls and readability on WordPress."],
  ["rankmath", "RankMath", "Schema library, redirect manager and 404 monitoring for content-heavy sites."],
  ["moz", "Moz Pro", "Domain Authority benchmarking, Link Explorer and rank tracking."],
  ["ubersuggest", "Ubersuggest", "Content idea validation and long-tail keyword discovery."],
  ["majestic", "Majestic", "Trust Flow and Citation Flow as a second opinion on backlinks."],
  ["seranking", "SE Ranking", "Daily rank tracking, local grid reporting and white-label dashboards."],
] as const;

export const aiEngines = [
  ["GPT", "ChatGPT", "OpenAI Search"],
  ["✦", "Gemini", "Google AI"],
  ["AI", "Claude", "Anthropic"],
  ["X", "Grok", "xAI"],
  ["P", "Perplexity AI", "Answer Engine"],
] as const;

export const framework = [
  ["Search & Competitor Research", "Understand demand, intent and the competitive landscape."],
  ["Technical SEO", "Fix crawl, indexation and site-speed foundations."],
  ["Content & On-Page SEO", "Build pages that satisfy intent and search relevance."],
  ["Authority & Link Building", "Earn trust signals through relevant, quality links."],
  ["Conversion & UX", "Turn organic visitors into enquiries and customers."],
  ["Measurement & Optimization", "Track what matters and refine continuously."],
] as const;

export const platforms = ["Shopify", "WooCommerce", "WordPress", "Magento", "Squarespace", "Wix", "Weebly", "BigCommerce"];

export const industries = [
  ["🎓", "Education", "Program pages, campus local visibility, and content answering what students and parents search for."],
  ["💻", "IT & Software", "Crawlability, structured data and speed alongside content built around how your audience searches."],
  ["📡", "Telecommunication", "Local SEO for service areas combined with technical and content work for consumer and B2B search."],
  ["❤️", "Healthcare", "Local search, clear service pages and content meeting trust and accuracy standards."],
  ["🛍️", "eCommerce", "Collection architecture, product schema and internal linking for efficient catalog crawling."],
  ["🏠", "Home Improvement", "Google Business Profile, service-area landing pages and review management."],
  ["🎨", "Interior Design", "Image SEO and portfolio pages so visual work is discoverable."],
  ["📷", "Photography", "Image-heavy portfolio sites optimized without sacrificing quality."],
  ["⚖️", "Law Firm SEO", "Practice-area pages, local citations and content reflecting how people seek legal help."],
  ["🏢", "Real Estate", "Listing page SEO, location-based content and technical optimization."],
] as const;

export const plans = [
  { tag: "STARTER", name: "Starter", sub: "For businesses beginning focused SEO work", price: "€599", featured: false,
    f: ["10 Keywords Target", "10 Keywords Optimization", "On-Page SEO + Technical SEO Audit", "Google Business Profile Optimization", "4 GBP Content Posts / Month", "Local SEO & Citation Check", "Monthly Content Recommendations", "Monthly SEO Performance Reporting"] },
  { tag: "★ MOST POPULAR", name: "Growth", sub: "For businesses scaling organic visibility", price: "€1,000", featured: true,
    f: ["20 Keywords Target", "20 Keywords Optimization", "Full On-Page + Technical + Off-Page SEO", "Google Business Profile Optimization", "Weekly GBP Content", "Content Strategy & SEO Content Creation", "AEO + GEO Optimization for AI Search", "Link Building + Competitor Monitoring"] },
  { tag: "ADVANCED", name: "Enterprise", sub: "For larger sites, brands and multi-market growth", price: "€1,500", featured: false,
    f: ["30+ Keywords Target", "30+ Keywords + International SEO Strategy", "Full Technical, On-Page & Authority SEO Suite", "Advanced Google Business Profile Optimization", "Weekly GMB Content + Local Growth Management", "Advanced AEO + GEO + AI Search Optimization", "Advanced Content, Digital PR & Link Acquisition", "Dedicated Account Management + Priority Reporting"] },
];

export const portfolio = [
  ["Education", "EduLearn Academy", "15X"], ["Healthcare", "MedCare Hospital", "12X"], ["IT Services", "TechVista Solutions", "18X"],
  ["Home Improvement", "HomeStyle Interiors", "10X"], ["eCommerce", "LuxeCart Store", "20X"], ["Law Firm", "Carter & Blake Law", "14X"],
  ["Automobile", "AutoDrive Motors", "11X"], ["Photography", "SnapShutter Studio", "16X"], ["Real Estate", "PrimeRealty Group", "13X"],
  ["Telecommunication", "CloudNet Telecom", "17X"], ["eCommerce", "FreshMart Online", "19X"], ["Home Improvement", "GreenHome Builders", "12X"],
] as const;

export const stats = [["10+", "Years of experience"], ["500+", "Happy clients"], ["2000+", "Projects delivered"], ["98%", "Client satisfaction"]] as const;

export const whyUs = [
  ["10X", "10X Growth Guarantee", "Data-driven strategies designed to multiply business visibility across search and digital channels."],
  ["AI", "AI-Powered Marketing", "Modern AI workflows, search intelligence and automation make SEO, content and campaigns smarter."],
  ["✓", "Certified Professionals", "Our team works with Google, Meta, Ahrefs, HubSpot and WooRank."],
] as const;

export const insights = [
  ["SEO STRATEGY", "Build an SEO foundation that can scale", "How technical SEO, content structure and search intent work together to create a stronger organic growth engine."],
  ["GROWTH FRAMEWORK", "From search research to measurable growth", "The connected SEO layers that turn research, content and authority into qualified traffic."],
  ["AI SEARCH", "Prepare your website for modern search", "How AEO, GEO, structured content and clear entities support visibility across evolving search."],
  ["SEO TOOLKIT", "Turn SEO data into smarter decisions", "Use analytics, Search Console and SEO platforms to find opportunities and measure progress."],
] as const;
