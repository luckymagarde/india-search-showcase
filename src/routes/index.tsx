import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import homeCss from "@/legacy/home.css?raw";
import homeHtml from "@/legacy/home.html?raw";
import homeJs from "@/legacy/home.js.txt?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEO Expert India | SEO, AI Search & Website Development" },
      { name: "description", content: "SEO Expert India helps businesses grow with technical, local and international SEO, AI search optimization and SEO-ready website development." },
      { property: "og:title", content: "SEO Expert India | SEO, AI Search & Website Development" },
      { property: "og:description", content: "Technical, local and international SEO, AI search optimization and SEO-ready websites." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  component: Index,
});

let ran = false;

function Index() {
  useEffect(() => {
    if (ran) return;
    ran = true;
    // Run the original page script exactly as designed.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    new Function(homeJs)();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homeCss }} />
      <div dangerouslySetInnerHTML={{ __html: homeHtml }} />
    </>
  );
}
