import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import homeCss from "@/legacy/home.css?raw";
import homeHtml from "@/legacy/home.html?raw";
import pageCss from "@/styles/seo-services.css?raw";
import {
  PAGE_URL, YOUTUBE_VIDEO_ID, strategyPoints, aiServices, aiPlatforms, tools, platforms,
  industries, services, processSteps, packages, whyUs, metrics, faqs,
} from "@/data/seo-services";

// Reuse the site's existing contact form and footer markup verbatim from the home page source.
const formStart = homeHtml.indexOf('<div class="form-shell" id="lead-form">');
const formEnd = homeHtml.indexOf("</form>", formStart);
const successEnd = homeHtml.indexOf("</div>\n</div>\n</div>", formEnd) + "</div>\n</div>".length;
const formHtml = homeHtml.slice(formStart, successEnd);
const footerHtml = homeHtml
  .slice(homeHtml.indexOf('<footer id="contact">'))
  .replace(/href="#contact"/g, 'href="#consultation"')
  .replace(/href="#(?!consultation)/g, 'href="/#');

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

function Video() {
  const [play, setPlay] = useState(false);
  if (!YOUTUBE_VIDEO_ID) {
    return (
      <div className="ss-video" role="img" aria-label="SEO strategy video coming soon">
        <div className="ss-play" style={{ cursor: "default" }}><span aria-hidden>▶</span></div>
        <div className="ss-video-note">Video coming soon</div>
      </div>
    );
  }
  return (
    <div className="ss-video">
      {play ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`} title="SEO strategy video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
      ) : (
        <>
          <img src={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`} alt="SEO strategy video thumbnail" width={480} height={360} loading="lazy" />
          <button className="ss-play" onClick={() => setPlay(true)} aria-label="Play SEO strategy video"><span aria-hidden>▶</span></button>
        </>
      )}
    </div>
  );
}

function SeoServicesPage() {
  useLegacyBehaviour();
  const [plat, setPlat] = useState(0);
  const [svc, setSvc] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const p = platforms[plat];
  const s = services[svc];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homeCss + pageCss }} />
      <main className="ss">
        {/* HERO */}
        <section className="ss-hero" id="consultation">
          <div className="ss-grid-bg" />
          <div className="ss-orb" style={{ width: 420, height: 420, background: "#D4A72C", top: -120, right: -80 }} />
          <div className="ss-orb" style={{ width: 360, height: 360, background: "#8B7CF6", bottom: -100, left: -120, animationDelay: "-6s" }} />
          <div className="ss-wrap">
            <nav className="ss-crumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>SEO Services</span></nav>
            <div className="ss-hero-grid">
              <div>
                <div className="ss-eyebrow">SEO Company in India</div>
                <h1>Best <span className="gold">SEO Services in India</span> to Grow Your Business Online</h1>
                <p className="sub">Drive qualified traffic, improve search visibility, and generate sustainable business growth with strategic SEO solutions.</p>
                <p>SEO Expert India is a search engine optimization company that helps businesses in India and international markets earn more visibility on Google and AI-powered search. As an SEO agency in India with hands-on web development experience, we combine technical SEO, content optimization, authority building, local SEO and AI search optimization into one clear plan — focused on the pages, keywords and enquiries that actually matter to your business.</p>
                <ul className="ss-trust">
                  <li><span>✓</span>10+ Years of SEO &amp; Website Development Experience</li>
                  <li><span>✓</span>Data-Driven SEO Strategies</li>
                  <li><span>✓</span>Advanced AI Search Optimization</li>
                </ul>
                <div className="ss-cta-row">
                  <a className="ss-btn ss-btn-gold" href="#lead-form">Get a Free SEO Consultation →</a>
                  <a className="ss-btn ss-btn-ghost" href="#services">Explore Our SEO Services</a>
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
          <div className="ss-wrap ss-two">
            <div className="ss-reveal">
              <div className="ss-eyebrow">Our Approach</div>
              <h2>A Strategic Approach to <span className="gold">Search Engine Optimization</span></h2>
              <p>Successful SEO is never a single tactic. Rankings improve when technical health, keyword targeting, content strategy, competitor research, search intent, user experience and authority all move forward together. Our SEO experts in India plan each campaign around those connected parts, then prioritize the changes most likely to move results for your business.</p>
              <div className="ss-steps">
                {strategyPoints.map(([t, d]) => <div className="ss-step" key={t}><b>{t}</b><small>{d}</small></div>)}
              </div>
            </div>
            <div className="ss-reveal"><Video /></div>
          </div>
        </section>

        {/* AI SEARCH */}
        <section className="ss-sec deep">
          <div className="ss-grid-bg" />
          <div className="ss-wrap">
            <Head2 eyebrow="AI Search Engineering" intro="Search is evolving beyond traditional blue links. Businesses must now optimize their digital presence for AI-powered search experiences, answer engines, semantic discovery, and conversational search.">
              Next-Generation SEO: <span className="gold">AI Search Engineering</span> &amp; Optimization
            </Head2>
            <div className="ss-ai-grid">
              {aiServices.map(([t, d]) => (
                <div className="ss-card ss-reveal" key={t}><h3>{t}</h3><p>{d}</p></div>
              ))}
            </div>
            <h3 className="ss-sub-h">AI Search Platforms We Optimize For</h3>
            <div className="ss-plat-row">
              {aiPlatforms.map(([t, d]) => <div className="ss-plat" key={t}><b>{t}</b><small>{d}</small></div>)}
            </div>
            <h3 className="ss-sub-h">Supporting SEO Tools</h3>
            <p style={{ textAlign: "center", maxWidth: 760, margin: "-6px auto 22px" }}>Professional tools support every stage of our AI SEO services — from keyword and backlink research to technical crawls, content analysis and performance measurement.</p>
            <div className="ss-tools">
              {tools.map(([t, d]) => <div className="ss-tool" key={t}><b>{t}</b><small>{d}</small></div>)}
            </div>
            <p className="ss-disclaim">AI SEO is a strategic optimization service with measurable work and transparent reporting. No agency can guarantee rankings, AI citations or placement in AI-generated answers.</p>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className="ss-sec">
          <div className="ss-wrap">
            <Head2 eyebrow="CMS Expertise" intro="Every platform has its own SEO strengths and limits. Select a platform to see how we approach it.">
              SEO Services for Every Major <span className="gold">Website Platform</span>
            </Head2>
            <div className="ss-tabs" role="tablist" aria-label="Website platforms">
              {platforms.map((pl, i) => (
                <button key={pl.name} role="tab" id={`pt-${i}`} aria-controls="pt-panel" aria-selected={plat === i} className="ss-tab" onClick={() => setPlat(i)}>{pl.name}</button>
              ))}
            </div>
            <div className="ss-glass ss-panel" role="tabpanel" id="pt-panel" aria-labelledby={`pt-${plat}`} key={p.name}>
              <h3 style={{ fontSize: 26 }}>{p.name} SEO</h3>
              <p style={{ marginTop: 10 }}>{p.intro}</p>
              <ul className="ss-checks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
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
              {industries.map(([ic, t, d, size]) => (
                <div className={`ss-card ss-reveal ${size}`} key={t}>
                  <div className="ss-icon" aria-hidden>{ic}</div>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </div>
              ))}
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
                  <button key={x.name} role="tab" id={`sv-${i}`} aria-controls="sv-panel" aria-selected={svc === i} className="ss-svc-btn" onClick={() => setSvc(i)}>
                    <span aria-hidden>{x.icon}</span>{x.name}
                  </button>
                ))}
              </div>
              <div className="ss-glass ss-panel ss-svc-panel" role="tabpanel" id="sv-panel" aria-labelledby={`sv-${svc}`} key={s.name}>
                <div className="ss-icon" aria-hidden>{s.icon}</div>
                <h3>{s.name}</h3>
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
                  <a className={`ss-btn ${k.featured ? "ss-btn-gold" : "ss-btn-ghost"}`} href="#lead-form">Get Started →</a>
                </div>
              ))}
            </div>
            <p className="ss-note">Every business has different SEO requirements. Contact us for a customized SEO strategy and proposal.</p>
          </div>
        </section>

        {/* WHY */}
        <section className="ss-sec alt">
          <div className="ss-wrap ss-why">
            <div className="ss-reveal">
              <div className="ss-eyebrow">Why Us</div>
              <h2>Why Choose SEO Expert India for Your <span className="gold">SEO Growth?</span></h2>
              <p>SEO Expert India is a technical, data-driven SEO and website development company. Because we build websites as well as optimize them, we understand how code, content and structure affect search performance — and we can implement fixes rather than only recommend them.</p>
              <p>Every engagement starts with an honest audit and a customized plan. We follow white-hat practices, report transparently every month and focus on qualified organic opportunities that support long-term growth, whether you are a local business or expanding internationally. If you want an experienced SEO consultant in India who explains what is being done and why, we would like to hear from you.</p>
              <div className="ss-quote">Sustainable search growth comes from doing the fundamentals exceptionally well — and measuring honestly.</div>
            </div>
            <div className="ss-why-grid">
              {whyUs.map((t, i) => <div className="ss-why-item ss-reveal" key={t}><span>{String(i + 1).padStart(2, "0")}</span>{t}</div>)}
            </div>
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
                      <button className="ss-faq-q" aria-expanded={open} aria-controls={`fa-${i}`} id={`fq-${i}`} onClick={() => setFaq(open ? null : i)}>
                        {q}<i aria-hidden>+</i>
                      </button>
                    </h3>
                    <div className="ss-faq-a" id={`fa-${i}`} role="region" aria-labelledby={`fq-${i}`}><div><p>{a}</p></div></div>
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
                <a className="ss-btn ss-btn-dark" href="#lead-form">Get a Free SEO Consultation →</a>
                <a className="ss-btn ss-btn-outline" href="#contact">Contact SEO Expert India</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
