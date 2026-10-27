import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Check, Plus, Minus, ArrowRight } from "lucide-react";
import founder from "@/assets/founder.webp.asset.json";
import faq from "@/data/faq.json";
import {
  heroPills, trust, services, tools, aiEngines, framework, platforms, industries,
  plans, portfolio, stats, whyUs, insights,
} from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEO Expert India — SEO, GEO, AEO & Web Development" },
      { name: "description", content: "Technical, local, international and AI-search SEO plus website development for businesses in India and global markets." },
      { property: "og:title", content: "SEO Expert India — SEO Strategies That Drive Growth" },
      { property: "og:description", content: "Turn search visibility into business growth with technical SEO, content, authority building and AI search optimization." },
    ],
  }),
  component: Index,
});

const nav = [["Services", "#services"], ["Framework", "#framework"], ["Pricing", "#pricing"], ["Work", "#work"], ["FAQ", "#faq"]];

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary">{children}</p>;
}
function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl ${className}`}>{children}</h2>;
}
function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`py-16 md:py-24 ${className}`}><div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div></section>;
}
function Head({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      {sub && <p className="mt-4 text-muted-foreground md:text-lg">{sub}</p>}
    </div>
  );
}
const card = "rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-primary/50";
const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition hover:border-primary hover:text-primary";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition ${scrolled || open ? "border-border bg-background/85 backdrop-blur-lg" : "border-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#" className="flex items-center gap-2 whitespace-nowrap font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-gold text-sm text-primary-foreground">SE</span>
          SEO Expert India
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-foreground">{l}</a>)}
        </nav>
        <div className="hidden lg:block"><a href="#contact" className={`${btnPrimary} !px-5 !py-2 text-sm`}>Free Consultation</a></div>
        <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 pb-5 lg:hidden">
          {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-muted-foreground">{l}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} className={btnPrimary}>Free Consultation</a>
        </nav>
      )}
    </header>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary";
  if (sent) return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground"><Check /></div>
      <h3 className="font-display text-2xl font-bold">Thank you!</h3>
      <p className="mt-2 text-muted-foreground">Your enquiry has been received. We'll get back to you shortly.</p>
    </div>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
      <div>
        <h3 className="font-display text-2xl font-bold">Let's Grow Your Organic Traffic</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tell us about your business and SEO goals.</p>
      </div>
      <input required placeholder="Full Name *" className={input} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required type="email" placeholder="Email Address *" className={input} />
        <input required type="tel" placeholder="WhatsApp Number *" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input placeholder="Website URL" className={input} />
        <select defaultValue="" className={input}>
          <option value="" disabled>Monthly SEO Budget</option>
          {["Under $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <textarea rows={3} placeholder="Tell Us About Your Goals" className={input} />
      <button className={`${btnPrimary} w-full`}>Request My Free SEO Consultation <ArrowRight className="h-4 w-4" /></button>
      <p className="text-center text-xs text-muted-foreground">Your information is kept confidential.</p>
    </form>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {faq.filter((f) => f.a.length).map((f, i) => (
        <div key={f.q} className="rounded-2xl border border-border bg-card/50">
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold md:text-lg">
            {f.q}{open === i ? <Minus className="h-5 w-5 shrink-0 text-primary" /> : <Plus className="h-5 w-5 shrink-0 text-primary" />}
          </button>
          {open === i && <div className="space-y-3 px-5 pb-5 text-muted-foreground">{f.a.map((p, j) => <p key={j}>{p}</p>)}</div>}
        </div>
      ))}
    </div>
  );
}

function Index() {
  return (
    <div className="relative overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[900px] bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[640px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <Header />

      {/* HERO */}
      <section id="contact" className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary">GLOBAL SEO & DIGITAL GROWTH</span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              SEO Strategies That Turn <span className="text-gradient">Search Visibility</span> Into Business Growth
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">We help businesses build stronger search visibility through technical SEO, content, authority building and conversion-focused digital strategies — across India and international markets.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className={btnPrimary}>Get Free SEO Consultation <ArrowRight className="h-4 w-4" /></a>
              <a href="#services" className={btnGhost}>Explore SEO Services</a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroPills.map((p) => (
                <div key={p.t} className="rounded-xl border border-border bg-card/50 p-4">
                  <p className="font-semibold">{p.t}</p><p className="text-sm text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-glow backdrop-blur md:p-8"><ContactForm /></div>
        </div>
      </section>

      {/* TRUST */}
      <Section className="!py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trust.map((t) => (
            <div key={t.t} className={card}>
              <div className="mb-3 font-display text-2xl font-bold text-primary">{t.i}</div>
              <p className="font-semibold">{t.t}</p><p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>WHY SEO EXPERT INDIA</Eyebrow>
            <H2>Nearly a Decade of <span className="text-gradient">Search & Growth</span> Expertise</H2>
            <p className="mt-6 text-muted-foreground">SEO Expert India has been helping businesses grow their search visibility since 2016. We've worked with 500+ clients and completed 2000+ website development and SEO projects across India, the US, UK, Canada, Australia, Europe and the Middle East. Our in-house team of 10+ specialists covers web development, technical SEO and digital marketing.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className={card}><p className="text-2xl">🌍</p><p className="mt-2 font-semibold">Global Service Capability</p><p className="mt-1 text-sm text-muted-foreground">Strategy adapted to each region's search behavior.</p></div>
              <div className={card}><p className="text-2xl">👥</p><p className="mt-2 font-semibold">Experienced, In-House Team</p><p className="mt-1 text-sm text-muted-foreground">10+ specialists working together, not outsourcing.</p></div>
            </div>
          </div>
          <div className="relative">
            <img src={founder.url} alt="Lokesh Magarde, Founder of SEO Expert India, at his desk" className="aspect-[4/3] w-full rounded-3xl border border-border object-cover" />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-gradient-gold px-6 py-4 text-primary-foreground shadow-glow">
              <p className="font-display text-3xl font-bold">10+</p><p className="text-sm font-semibold">Years of Excellence</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FOUNDER */}
      <Section className="!pt-8">
        <div className="rounded-3xl border border-border bg-card/50 p-8 md:p-12">
          <Eyebrow>ABOUT THE FOUNDER</Eyebrow>
          <h3 className="font-display text-3xl font-bold md:text-4xl">Lokesh Magarde</h3>
          <p className="mt-4 max-w-4xl text-muted-foreground">Lokesh Magarde founded SEO Expert India in Indore, Madhya Pradesh, bringing over a decade of hands-on experience in SEO and website development. He leads a strategy-first approach combining technical SEO, content and conversion-focused design to help businesses build sustainable organic visibility.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["📈 10+ Years Experience", "💻 SEO & Web Development", "🌍 India + Global Markets", "🧭 Founder-Led Strategy"].map((b) => <span key={b} className="rounded-full border border-border px-4 py-2 text-sm">{b}</span>)}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-muted-foreground">
            <span className="text-sm font-semibold text-foreground">Certified By:</span>
            {["HubSpot", "WooRank", "Google", "Meta", "Ahrefs"].map((c) => <span key={c} className="font-display text-lg font-semibold">{c}</span>)}
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <Head eyebrow="WHAT WE DO" title="SEO services built around your business goals" sub="From technical foundations to global expansion, every engagement starts with strategy before execution." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([i, t, d]) => (
            <div key={t} className={`${card} flex flex-col`}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">{i}</div>
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn More <ArrowRight className="h-4 w-4" /></a>
            </div>
          ))}
        </div>
      </Section>

      {/* TOOLS */}
      <Section>
        <Head eyebrow="OUR ARSENAL" title="Marketing tools & technologies we use" sub="A working toolkit for research, technical audits, content and reporting — not a badge wall." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(([slug, t, d]) => (
            <div key={t} className={card}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground"><img src={`https://cdn.simpleicons.org/${slug}`} alt="" className="h-6 w-6" loading="lazy" /></span>
                <h3 className="font-semibold">{t}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AI */}
      <Section>
        <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/15 to-primary/10 p-8 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>AEO & AI SEARCH</Eyebrow>
              <H2>Expert in AI search & engineering tools</H2>
              <p className="mt-4 text-muted-foreground">Optimizing digital footprints for Answer Engine Optimization (AEO) and AI search platforms, so client websites surface inside AI engine responses — not just traditional search results.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {aiEngines.map(([i, t, s]) => (
                <div key={t} className="rounded-2xl border border-border bg-background/60 p-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-primary-foreground">{i}</div>
                  <p className="font-semibold">{t}</p><p className="text-xs text-muted-foreground">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FRAMEWORK */}
      <Section id="framework">
        <Head eyebrow="OUR GROWTH ENGINE" title="Our SEO growth framework" sub="Six connected layers that turn search visibility into qualified traffic and business outcomes." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {framework.map(([t, d], i) => (
            <div key={t} className={card}>
              <p className="font-display text-4xl font-bold text-gradient">0{i + 1}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PLATFORMS */}
      <Section className="!py-12">
        <Head eyebrow="SEO FOR EVERY PLATFORM" title="Platform SEO expertise" sub="We deliver SEO across major eCommerce and website platforms." />
        <div className="flex flex-wrap justify-center gap-3">
          {platforms.map((p) => <span key={p} className="rounded-full border border-border bg-card/50 px-6 py-3 font-display font-semibold">{p}</span>)}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section>
        <Head eyebrow="INDUSTRY EXPERTISE" title="Industry-specific SEO expertise" sub="Search behavior, sales cycles and content needs shift by industry. Here's how our approach adapts." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map(([i, t, d]) => (
            <div key={t} className={card}>
              <p className="text-3xl">{i}</p>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <Head eyebrow="PRICING" title="SEO plans built for sustainable growth" sub="Every plan combines SEO fundamentals with Google Business Profile support." />
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`flex flex-col rounded-3xl border p-8 ${p.featured ? "border-primary bg-card shadow-glow lg:-translate-y-4" : "border-border bg-card/50"}`}>
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-widest ${p.featured ? "bg-gradient-gold text-primary-foreground" : "bg-primary/10 text-primary"}`}>{p.tag}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.sub}</p>
              <p className="mt-6 font-display text-5xl font-bold">{p.price}<span className="text-base font-normal text-muted-foreground">/month</span></p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.f.map((f) => <li key={f} className="flex gap-3 text-sm"><Check className="h-5 w-5 shrink-0 text-primary" />{f}</li>)}
              </ul>
              <a href="#contact" className={`mt-8 ${p.featured ? btnPrimary : btnGhost}`}>Get Started</a>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section id="work">
        <Head eyebrow="OUR WORK" title="Success portfolio" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map(([c, n, g]) => (
            <div key={n} className={card}>
              <p className="text-xs font-semibold tracking-widest text-primary">{c.toUpperCase()}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{n}</h3>
              <p className="mt-4 font-display text-3xl font-bold text-gradient">{g}</p>
              <p className="text-sm text-muted-foreground">Business Growth</p>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS + WHY */}
      <Section>
        <Head eyebrow="WHY US" title={<>Unveiling The Success Of Our <span className="text-gradient">Achievements Growth</span></>} sub="By blending creativity with strategy, we create visibility that not only captures attention but also drives action." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-card/50 p-6 text-center">
              <p className="font-display text-4xl font-bold text-gradient md:text-5xl">{n}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {whyUs.map(([i, t, d]) => (
            <div key={t} className={card}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold font-bold text-primary-foreground">{i}</div>
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* STRATEGY */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card/50 p-8">
            <Eyebrow>STRATEGY</Eyebrow>
            <h3 className="font-display text-2xl font-bold md:text-3xl">Advanced SEO Strategies That Drive Growth</h3>
            <p className="mt-4 text-muted-foreground">We build SEO around business intent, combining technical health, search demand and competitor intelligence into one focused plan — fixing crawlability, indexation, Core Web Vitals, schema and internal linking first.</p>
            <p className="mt-3 text-muted-foreground">Then we map high-value keywords to pages, create useful content and strengthen authority. Search Console, GA4 and rank data guide continuous improvement.</p>
          </div>
          <div className="rounded-3xl border border-border bg-card/50 p-8">
            <Eyebrow>EXECUTION</Eyebrow>
            <h3 className="font-display text-2xl font-bold md:text-3xl">Next-Generation SEO: AI Search, Technical & On-Page</h3>
            <p className="mt-4 text-muted-foreground">People now get answers from Google's AI experiences, ChatGPT, Gemini, Claude and Perplexity. Our AEO and GEO work focuses on clear entities, structured schema, semantic HTML and consistent brand information.</p>
            <p className="mt-3 text-muted-foreground">On a solid technical base — crawlability, architecture and Core Web Vitals — we align every page with real search intent and a clear next step.</p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Head eyebrow="QUESTIONS" title="Frequently asked questions" />
        <Faq />
      </Section>

      {/* INSIGHTS */}
      <Section>
        <Head eyebrow="SEO INSIGHTS" title={<>Latest SEO <span className="text-gradient">Insights & Articles</span></>} sub="Practical insights covering technical SEO, content, AI search and sustainable organic growth." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map(([c, t, d]) => (
            <article key={t} className={`${card} flex flex-col`}>
              <p className="text-xs font-semibold tracking-widest text-primary">{c}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read Insight <ArrowRight className="h-4 w-4" /></span>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl bg-gradient-gold p-10 text-center text-primary-foreground md:p-16">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to build a stronger search presence?</h2>
          <p className="mx-auto mt-4 max-w-2xl md:text-lg">Let's create an SEO strategy aligned with your business, market and growth goals.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" className="rounded-full bg-background px-6 py-3 font-semibold text-foreground">Get Free SEO Consultation</a>
            <a href="#services" className="rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold">Explore SEO Services</a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SEO Expert India · Indore, Madhya Pradesh
      </footer>
    </div>
  );
}
