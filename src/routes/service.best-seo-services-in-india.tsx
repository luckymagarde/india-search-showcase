import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Quote, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { seoAssets } from "@/data/seo-assets";
import { BrandLogo, PlatformVisual, AiEngineeringVisual, aiIcons, serviceIcons, industryIcons } from "@/components/seo/visuals";
import homeCss from "@/legacy/home.css?raw";
import homeHtml from "@/legacy/home.html?raw";
import pageCss from "@/styles/seo-services.css?raw";
import {
  PAGE_URL, strategyVideos, strategyPoints, aiServices, aiPlatforms, tools, platforms,
  industries, services, processSteps, packages, whyUs, metrics, faqs,
} from "@/data/seo-services";

// Reuse the site's existing contact form and footer markup verbatim from the home page source.
const formStart = homeHtml.indexOf('<div class="form-shell" id="lead-form">');
const formEnd = homeHtml.indexOf("</form>", formStart);
const successEnd = homeHtml.indexOf("</div>\n</div>\n</div>", formEnd) + "</div>\n</div>".length;
const formHtml = homeHtml.slice(formStart, successEnd);
const footerHtml = homeHtml.slice(homeHtml.indexOf('<footer id="contact">'));

const TITLE = "Best SEO Services in India | SEO Expert India";
const DESC = "Get the best SEO services in India from SEO Expert India: technical, local, ecommerce, international and AI search SEO with transparent reporting. Free consultation.";

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Organization", name: "SEO Expert India", url: "https://www.seoexpertindia.biz/", email: "info@seoexpertindia.biz", telephone: "+91-903-903-0932",
    address: { "@type": "PostalAddress", streetAddress: "24/B, Chetan Nagar, Near Bengali Square", addressLocality: "Indore", addressRegion: "Madhya Pradesh", postalCode: "452016", addressCountry: "IN" },
    sameAs: ["https://www.facebook.com/seoexpertindia.biz", "https://www.instagram.com/seoexpertindia.biz", "https://www.linkedin.com/company/seoexpertindia-biz/"] },
  { "@context": "https://schema.org", "@type": "Service", name: "SEO Services", serviceType: "Search Engine Optimization", url: PAGE_URL, description: DESC,
    provider: { "@type": "Organization", name: "SEO Expert India", url: "https://www.seoexpertindia.biz/" }, areaServed: ["IN", "Worldwide"] },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.seoexpertindia.biz/" },
    { "@type": "ListItem", position: 2, name: "Best SEO Services in India", item: PAGE_URL }] },
];

export const Route = createFileRoute("/service/best-seo-services-in-india")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: PAGE_URL },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,600&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
    scripts: jsonLd.map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  }),
  component: SeoServicesPage,
});

function useLegacyBehaviour() {
  useEffect(() => {
    // Same validation + submit behaviour as the existing site form.
    const form = document.getElementById("leadForm") as HTMLFormElement | null;
    const onSubmit = (e: Event) => {
      e.preventDefault();
      let valid = true;
      ([["f-name", "name", (v: string) => v.trim().length > 0], ["f-email", "email", (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)], ["f-phone", "phone", (v: string) => v.trim().length >= 7]] as const)
        .forEach(([w, f, test]) => {
          const ok = test((document.getElementById(f) as HTMLInputElement).value);
          document.getElementById(w)?.classList.toggle("error", !ok);
          if (!ok) valid = false;
        });
      if (!valid || !form) return;
      const btn = form.querySelector(".submit") as HTMLButtonElement;
      btn.textContent = "Sending…"; btn.disabled = true;
      setTimeout(() => { form.style.display = "none"; document.getElementById("fSuccess")?.classList.add("show"); }, 800);
    };
    form?.addEventListener("submit", onSubmit);
    const top = document.getElementById("backToTop");
    const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    top?.addEventListener("click", toTop);

    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".ss-reveal,.ss-tl-item").forEach((el) => io.observe(el));
    return () => { form?.removeEventListener("submit", onSubmit); top?.removeEventListener("click", toTop); io.disconnect(); };
  }, []);
}

function Head2({ eyebrow, children, intro }: { eyebrow: string; children: React.ReactNode; intro?: string }) {
  return (
    <div className="ss-center ss-reveal">
      <div className="ss-eyebrow">{eyebrow}</div>
      <h2>{children}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function Video({ video, index }: { video: typeof strategyVideos[number]; index: number }) {
  const [play, setPlay] = useState(false);
  return <article className="ss-video-card">
    <div className="ss-video">
      {play ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`} title={video.title} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /> : <>
        <img src={seoAssets[index === 0 ? "strategy-video-one" : "strategy-video-two"]} alt={`YouTube thumbnail: ${video.title}`} width={480} height={360} loading="lazy" />
        <Button variant="ghost" className="ss-play" onClick={() => setPlay(true)} aria-label={`Play ${video.title}`}><span><Play aria-hidden /></span></Button>
      </>}
    </div><div className="ss-video-copy"><h3>{video.title}</h3><p>{video.description}</p></div>
  </article>;
}

const previewReviews = [
  { theme: "SEO strategy", copy: "Editable sample placeholder: add an authentic client review about campaign planning and the clarity of the proposed SEO roadmap." },
  { theme: "Technical optimization", copy: "Editable sample placeholder: add an authentic client review about the website audit, implementation process and ongoing communication." },
  { theme: "Transparent communication", copy: "Editable sample placeholder: add an authentic client review about reporting, collaboration and the explanation of next steps." },
];
function Reviews() {
  const [start, setStart] = useState(0);
  return <section className="ss-sec alt" id="client-reviews"><div className="ss-wrap">
    <Head2 eyebrow="Client Perspectives" intro="Discover how businesses value our approach to SEO strategy, technical optimization, transparent communication, and long-term search growth.">What Our Clients Say About <span className="gold">SEO Expert India</span></Head2>
    <div className="ss-review-grid">{previewReviews.map((_,i) => { const review = previewReviews[(start+i)%previewReviews.length]; if (!review) return null; return <article className="ss-review" key={review.theme}><Quote aria-hidden/><span className="ss-sample-label">EDITABLE SAMPLE · NOT A CUSTOMER REVIEW</span><h3>{review.theme}</h3><p>{review.copy}</p><div className="ss-review-source">Customer attribution pending</div></article>; })}</div>
    <div className="ss-review-controls"><Button variant="ghost" aria-label="Previous review" onClick={()=>setStart((start+2)%3)}><ChevronLeft/></Button><span>{start+1} / 3</span><Button variant="ghost" aria-label="Next review" onClick={()=>setStart((start+1)%3)}><ChevronRight/></Button></div>
  </div></section>;
}
function tabKeys(e: React.KeyboardEvent, index: number, count: number, select: (i:number)=>void, prefix: string) {
  let next=index;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next=(index+1)%count;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next=(index+count-1)%count;
  else if (e.key === "Home") next=0;
  else if (e.key === "End") next=count-1;
  else return;
  e.preventDefault();select(next);document.getElementById(`${prefix}-${next}`)?.focus();
}

function SeoServicesPage() {
  useLegacyBehaviour();
  const [plat, setPlat] = useState(0);
  const [svc, setSvc] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const p = platforms[plat];
  const s = services[svc];
  if (!p || !s) return null;
  const ServiceIcon = serviceIcons[svc] ?? serviceIcons[0];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homeCss + pageCss }} />
      <main className="ss">
        {/* HERO */}
        <section className="ss-hero" id="consultation">
          <div className="ss-grid-bg" />
          <div className="ss-wrap">
            <nav className="ss-crumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>SEO Services</span></nav>
            <div className="ss-hero-grid">
              <div>
                <div className="ss-eyebrow">SEO Company in India</div>
                <h1>Best <span className="gold">SEO Services in India</span> to Grow Your Business Online</h1>
                <p className="sub">Drive qualified traffic, improve search visibility, and generate sustainable business growth with strategic SEO solutions.</p>
                <p>SEO Expert India is a search engine optimization company that helps businesses in India and international markets earn more visibility on Google and AI-powered search. As an SEO agency in India with hands-on web development experience, we combine technical SEO, content optimization, authority building, local SEO and AI search optimization into one clear plan — focused on the pages, keywords and enquiries that actually matter to your business.</p>
                <ul className="ss-trust">
                  <li><span>✓</span>SEO &amp; Website Development Expertise</li>
                  <li><span>✓</span>Data-Driven SEO Strategies</li>
                  <li><span>✓</span>Advanced AI Search Optimization</li>
                </ul>
                <div className="ss-cta-row">
                  <Button asChild className="ss-btn ss-btn-gold"><a href="#lead-form">Get a Free SEO Consultation →</a></Button>
                  <Button asChild className="ss-btn ss-btn-ghost"><a href="#services">Explore Our SEO Services</a></Button>
                </div>
              </div>
              <div className="ss-form-card ss-glass" dangerouslySetInnerHTML={{ __html: formHtml }} />
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="ss-sec alt">
          <div className="ss-wrap">
            <div className="ss-center ss-reveal" style={{ marginBottom: 0 }}>
              <div className="ss-eyebrow">The Fundamentals</div>
              <h2>What Are <span className="serif gold">SEO Services?</span></h2>
              <p>SEO services are the professional work of improving a website so it appears more often — and more prominently — in organic search results. The goal is not just traffic, but the right traffic: people actively searching for the products or services you offer.</p>
              <p>Professional SEO services begin with keyword research and search intent analysis, so every important page targets what customers really type. Technical website optimization makes sure search engines can crawl, render and index the site quickly. On-page SEO and content optimization improve titles, headings, copy and internal links, while link building and authority development earn trust from relevant websites.</p>
              <p>Depending on your goals, the work extends to local SEO for nearby customers and international SEO for multiple countries. Throughout, search engine performance monitoring and conversion optimization connect rankings to real outcomes — enquiries, calls and sales.</p>
            </div>
            <div className="ss-pills ss-reveal">
              {["Organic visibility", "Keyword & intent research", "Technical optimization", "On-page & content SEO", "Links & authority", "Tracking & conversions"].map((t, i) => (
                <div className="ss-pill" key={t}><b>0{i + 1}</b>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* STRATEGY + VIDEO */}
        <section className="ss-sec">
          <div className="ss-wrap">
            <div className="ss-reveal">
              <div className="ss-eyebrow">Our Approach</div>
              <h2>A Strategic Approach to <span className="gold">Search Engine Optimization</span></h2>
              <p>Successful SEO is never a single tactic. Rankings improve when technical health, keyword targeting, content strategy, competitor research, search intent, user experience and authority all move forward together. Our SEO experts in India plan each campaign around those connected parts, then prioritize the changes most likely to move results for your business.</p>
              <div className="ss-steps">
                {strategyPoints.map(([t, d]) => <div className="ss-step" key={t}><b>{t}</b><small>{d}</small></div>)}
              </div>
            </div>
            <div className="ss-video-grid">{strategyVideos.map((video,index)=><Video key={video.id} video={video} index={index}/>)}</div>
          </div>
        </section>

        {/* AI SEARCH */}
        <section className="ss-sec deep">
          <div className="ss-grid-bg" />
          <div className="ss-wrap">
            <Head2 eyebrow="AI Search Engineering" intro="Search is evolving beyond traditional blue links. Businesses must now optimize their digital presence for AI-powered search experiences, answer engines, semantic discovery, and conversational search.">
              Next-Generation SEO: <span className="gold">AI Search Engineering</span> &amp; Optimization
            </Head2>
            <AiEngineeringVisual />
            <div className="ss-ai-grid">
              {aiServices.map(([t,d],i)=>{const Icon=aiIcons[i] ?? aiIcons[0];return <article className="ss-card ss-reveal" key={t}><div className="ss-icon-heading"><Icon aria-hidden/><h3>{t}</h3></div><p>{d}</p></article>;})}
            </div>
          </div>
        </section>
        <section className="ss-sec alt" id="ai-platforms"><div className="ss-wrap">
            <Head2 eyebrow="Conversational Discovery">AI Search Platforms <span className="gold">We Optimize For</span></Head2>
            <div className="ss-ai-platform-layout">
              <figure className="ss-ai-image"><img src={seoAssets["ai-search-platforms"]} alt="AI SEO network connecting ChatGPT, Gemini, Perplexity and Microsoft Copilot" width={1536} height={768} loading="lazy"/></figure>
              <div className="ss-platform-list">{aiPlatforms.map(([t,d],i)=><div className="ss-platform-list-item" key={t}><BrandLogo asset={["chatgpt","google","gemini","perplexity","copilot"][i] ?? "google"} name={t}/><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
            </div>
            <div className="ss-tools-heading"><Head2 eyebrow="Research & Measurement" intro="Professional research, technical crawling and measurement tools inform priorities — not promises.">Supporting <span className="gold">SEO Tools</span></Head2></div>
            <div className="ss-tools">
              {tools.map(([t,d],i)=><article className="ss-tool" key={t}><BrandLogo asset={["ahrefs","semrush","search-console","analytics","screamingfrog","surfer"][i] ?? "google"} name={t}/><div><h3>{t}</h3><p>{d}</p></div></article>)}
            </div>
            <p className="ss-disclaim">AI SEO is a strategic optimization service with measurable work and transparent reporting. No agency can guarantee rankings, AI citations or placement in AI-generated answers.</p>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className="ss-sec">
          <div className="ss-wrap">
            <Head2 eyebrow="CMS Expertise" intro="Platform-specific expertise, from publishing foundations to complex ecommerce catalogues.">
              SEO Services for Every Major <span className="gold">Website Platform</span>
            </Head2>
            <div className="ss-tabs" role="tablist" aria-label="Website platforms">
              {platforms.map((pl, i) => (
                <Button variant="ghost" tabIndex={plat === i ? 0 : -1} onKeyDown={e=>tabKeys(e,i,platforms.length,setPlat,"pt")} key={pl.name} role="tab" id={`pt-${i}`} aria-controls="pt-panel" aria-selected={plat === i} className="ss-tab" onClick={() => setPlat(i)}>{pl.name}</Button>
              ))}
            </div>
            <div className="ss-panel ss-platform-panel" role="tabpanel" id="pt-panel" aria-labelledby={`pt-${plat}`} key={p.name}>
              <div className="ss-platform-intro"><h3>{p.name} SEO Services</h3><p>{p.intro}</p></div>
              <div className="ss-platform-deliverables"><h4>Optimization priorities</h4><ul className="ss-checks">{p.points.map(x=><li key={x}>{x}</li>)}</ul></div>
              <PlatformVisual name={p.name}/>

            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="ss-sec alt">
          <div className="ss-wrap">
            <Head2 eyebrow="Industries" intro="Search behaviour differs by industry. We adapt keyword strategy, content and trust signals to how your customers research and buy.">
              SEO Solutions for <span className="serif gold">Every Industry</span>
            </Head2>
            <div className="ss-bento">
              {industries.map(([, t, d, size],i) => {const Icon=industryIcons[i] ?? industryIcons[0];return (
                <div className={`ss-card ss-reveal ${size}`} key={t}>
                  <div className="ss-icon" aria-hidden><Icon/></div>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </div>
              );})}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="ss-sec" id="services">
          <div className="ss-wrap">
            <Head2 eyebrow="What We Do" intro="From technical SEO services to local, ecommerce and international SEO services — explore each discipline below.">
              Our Comprehensive <span className="gold">SEO Services</span>
            </Head2>
            <div className="ss-svc">
              <div className="ss-svc-list" role="tablist" aria-label="SEO services" aria-orientation="vertical">
                {services.map((x, i) => (
                  <Button variant="ghost" tabIndex={svc === i ? 0 : -1} onKeyDown={e=>tabKeys(e,i,services.length,setSvc,"sv")} key={x.name} role="tab" id={`sv-${i}`} aria-controls="sv-panel" aria-selected={svc === i} className="ss-svc-btn" onClick={() => setSvc(i)}>
                    <span aria-hidden>{(() => {const Icon=serviceIcons[i] ?? serviceIcons[0];return <Icon/>;})()}</span>{x.name}
                  </Button>
                ))}
              </div>
              <div className="ss-panel ss-svc-panel" role="tabpanel" id="sv-panel" aria-labelledby={`sv-${svc}`} key={s.name}>
                <div className="ss-icon-heading ss-service-heading"><ServiceIcon aria-hidden/><h3>{s.name}</h3></div>
                <p>{s.desc}</p>
                <ul className="ss-checks">{s.points.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="ss-sec deep">
          <div className="ss-wrap">
            <Head2 eyebrow="How We Work" intro="A transparent, eight-stage process that turns research into steady, compounding organic growth.">
              Our Proven <span className="gold">SEO Process</span>
            </Head2>
            <div className="ss-tl">
              {processSteps.map(([ic, t, d], i) => (
                <div className="ss-tl-item" key={t} style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                  <span className="ss-tl-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ss-icon" aria-hidden>{ic}</div>
                  <h3>{t}</h3><p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="ss-sec">
          <div className="ss-wrap">
            <Head2 eyebrow="Pricing" intro="Affordable SEO services in India, with clear deliverables at every level.">
              SEO Packages Designed for <span className="serif gold">Business Growth</span>
            </Head2>
            <div className="ss-price">
              {packages.map((k) => (
                <div className={`ss-pcard ${k.featured ? "feat" : ""}`} key={k.name}>
                  {k.featured && <span className="ss-badge">MOST POPULAR</span>}
                  <h3>{k.name}</h3>
                  <div className="ss-amt">{k.price}<small>{k.period}</small></div>
                  <p style={{ fontSize: 14.5 }}>{k.fit}</p>
                  <ul className="ss-checks">{k.items.map((x) => <li key={x}>{x}</li>)}</ul>
                  <Button asChild className={`ss-btn ${k.featured ? "ss-btn-gold" : "ss-btn-ghost"}`}><a href="#lead-form">Get Started →</a></Button>
                </div>
              ))}
            </div>
            <p className="ss-note">Every business has different SEO requirements. Contact us for a customized SEO strategy and proposal.</p>
          </div>
        </section>

        {/* METRICS */}
        <section className="ss-sec deep">
          <div className="ss-wrap">
            <Head2 eyebrow="Reporting" intro="Clear monthly reports built from Google Search Console, GA4 and our SEO tools — showing what changed, why, and what comes next.">
              SEO Results &amp; <span className="gold">Transparent Reporting</span>
            </Head2>
            <div className="ss-metrics">
              {metrics.map(([t, d]) => <div className="ss-metric ss-reveal" key={t}><b>{t}</b><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="ss-sec alt">
          <div className="ss-wrap">
            <div className="ss-reveal">
              <div className="ss-eyebrow">Why Us</div>
              <h2>Why Choose SEO Expert India for Your <span className="gold">SEO Growth?</span></h2>
              <p>SEO Expert India is a technical, data-driven SEO and website development company. Because we build websites as well as optimize them, we understand how code, content and structure affect search performance — and we can implement fixes rather than only recommend them.</p>
              <p>Every engagement starts with an honest audit and a customized plan. We follow white-hat practices, report transparently every month and focus on qualified organic opportunities that support long-term growth, whether you are a local business or expanding internationally. If you want an experienced SEO consultant in India who explains what is being done and why, we would like to hear from you.</p>

            </div>
            <div className="ss-why-grid">
              {whyUs.map((t, i) => <div className="ss-why-item ss-reveal" key={t}><ShieldCheck aria-hidden/>{t}</div>)}
            </div>
            <div className="ss-quote">Sustainable search growth comes from doing the <span className="gold">fundamentals exceptionally well</span> — and <span className="gold">measuring honestly.</span></div>
          </div>
        </section>

        <Reviews />

        {/* FAQ */}
        <section className="ss-sec">
          <div className="ss-wrap">
            <Head2 eyebrow="FAQ">Frequently Asked Questions About <span className="gold">SEO Services</span></Head2>
            <div className="ss-faq">
              {faqs.map(([q, a], i) => {
                const open = faq === i;
                return (
                  <div className={`ss-faq-item ${open ? "open" : ""}`} key={q}>
                    <h3 style={{ fontSize: "inherit" }}>
                      <Button variant="ghost" className="ss-faq-q" aria-expanded={open} aria-controls={`fa-${i}`} id={`fq-${i}`} onClick={() => setFaq(open ? null : i)}>
                        <span>{q}</span><i aria-hidden>+</i>
                      </Button>
                    </h3>
                    <div className="ss-faq-a" inert={!open} aria-hidden={!open} id={`fa-${i}`} role="region" aria-labelledby={`fq-${i}`}><div><p>{a}</p></div></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="ss-final">
          <div className="ss-wrap">
            <div className="ss-final-box">
              <h2>Ready to Grow Your Business with Strategic SEO?</h2>
              <p>Let's build a search optimization strategy that improves your online visibility, attracts qualified visitors, and supports long-term business growth.</p>
              <div className="ss-cta-row">
                <Button asChild className="ss-btn ss-btn-dark"><a href="#lead-form">Get a Free SEO Consultation →</a></Button>
                <Button asChild className="ss-btn ss-btn-outline"><a href="#contact">Contact SEO Expert India</a></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
