import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import homeCss from "@/legacy/home.css?raw";
import css from "@/styles/site-pages.css?raw";
import { LegacyFooter } from "./legacy-sections";
import { ClientTestimonials } from "./client-testimonials";
export function PageShell({
  children,
  reviews = true,
}: {
  children: ReactNode;
  reviews?: boolean;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homeCss }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="sp-page">
        <main>
          {children}
          {reviews && <ClientTestimonials />}
        </main>
        <LegacyFooter />
      </div>
    </>
  );
}
export function Intro({
  name,
  eyebrow,
  title,
  description,
  children,
}: {
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="sp-intro">
      <div className="sp-wrap">
        <nav className="sp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden> / </span>
          <span aria-current="page">{name}</span>
        </nav>
        <div className="sp-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
export function ContactLink({ label = "Let’s talk about your project" }: { label?: string }) {
  return (
    <Button asChild className="sp-button">
      <Link to="/contact/">
        {label}
        <ArrowUpRight aria-hidden />
      </Link>
    </Button>
  );
}
export function FinalCTA() {
  return (
    <section className="sp-cta">
      <div className="sp-wrap">
        <div>
          <div className="sp-eyebrow">Your next chapter</div>
          <h2>Build a stronger digital presence.</h2>
          <p>Tell us where your business is today — and where you want to take it.</p>
        </div>
        <ContactLink label="Request a consultation" />
      </div>
    </section>
  );
}
export function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="sp-section-head">
      <div className="sp-eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
