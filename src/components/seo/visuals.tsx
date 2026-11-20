import {
  BrainCircuit,
  Sparkles,
  MessageCircle,
  Network,
  CodeXml,
  ScanSearch,
  Globe,
  Settings,
  FileText,
  Link2,
  MapPin,
  ShoppingBag,
  Building2,
  Search,
  HeartPulse,
  GraduationCap,
  Plane,
  Scale,
  Factory,
  Laptop,
  BriefcaseBusiness,
  Handshake,
  ChartNoAxesCombined,
} from "lucide-react";
import { seoAssets } from "@/data/seo-assets";
export const aiIcons = [
  Sparkles,
  MessageCircle,
  ScanSearch,
  BrainCircuit,
  Network,
  CodeXml,
  ChartNoAxesCombined,
] as const;
export const serviceIcons = [
  Settings,
  FileText,
  Link2,
  MapPin,
  Globe,
  ShoppingBag,
  Building2,
  Search,
] as const;
export const industryIcons = [
  HeartPulse,
  Building2,
  ShoppingBag,
  GraduationCap,
  ChartNoAxesCombined,
  Plane,
  Scale,
  Factory,
  Laptop,
  MapPin,
  BriefcaseBusiness,
  Handshake,
] as const;
const platformKeys: Record<string, string> = {
  WordPress: "wordpress",
  WooCommerce: "woocommerce",
  Shopify: "shopify",
  Magento: "magento",
  Squarespace: "squarespace",
  Wix: "wix",
  Weebly: "weebly",
  BigCommerce: "bigcommerce",
};
export function BrandLogo({
  asset,
  name,
  className = "",
}: {
  asset: string;
  name: string;
  className?: string;
}) {
  return (
    <img
      className={`ss-brand ${className}`}
      src={seoAssets[asset]}
      alt={`${name} logo`}
      width={64}
      height={40}
      loading="lazy"
    />
  );
}
export function PlatformVisual({ name }: { name: string }) {
  const ecommerce = ["WooCommerce", "Shopify", "Magento", "BigCommerce"].includes(name);
  return (
    <figure
      className={`ss-dashboard ${ecommerce ? "commerce" : "publisher"}`}
      aria-label={`${name} ${ecommerce ? "store catalogue" : "website publishing"} illustration`}
    >
      <div className="ss-dashboard-bar">
        <span />
        <span />
        <span />
        <small>{name}</small>
      </div>
      <div className="ss-dashboard-body">
        <BrandLogo asset={platformKeys[name] ?? "wordpress"} name={name} />
        <div className="ss-dashboard-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="ss-dashboard-tiles">
        {[1, 2, 3].map((x) => (
          <div key={x}>
            {ecommerce ? <ShoppingBag aria-hidden /> : <FileText aria-hidden />}
            <i />
            <i />
          </div>
        ))}
      </div>
      <figcaption>
        {ecommerce
          ? "Product discovery · Category structure"
          : "Content clarity · Technical foundations"}
      </figcaption>
    </figure>
  );
}
export function AiEngineeringVisual() {
  return (
    <div
      className="ss-engineering"
      role="img"
      aria-label="AI SEO connected to ChatGPT Search, Google Gemini, Google AI Overviews, Perplexity and Microsoft Copilot"
    >
      <svg className="ss-network-lines" viewBox="0 0 800 280" aria-hidden>
        <defs>
          <linearGradient id="networkGlow">
            <stop stopColor="var(--ss-blue)" />
            <stop offset="1" stopColor="var(--ss-violet)" />
          </linearGradient>
        </defs>
        <path
          d="M400 140 L110 65 M400 140 L280 50 M400 140 L525 50 M400 140 L695 65 M400 140 L400 245"
          stroke="url(#networkGlow)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <div className="ss-engine-core">
        <BrainCircuit aria-hidden />
        <strong>AI SEO</strong>
        <small>Search engineering</small>
      </div>
      {(
        [
          ["chatgpt", "ChatGPT Search"],
          ["gemini", "Google Gemini"],
          ["google", "AI Overviews"],
          ["perplexity", "Perplexity"],
          ["copilot", "Microsoft Copilot"],
        ] as const
      ).map(([key, name], i) => (
        <div className={`ss-engine-node node-${i}`} key={key}>
          <BrandLogo asset={key} name={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}
