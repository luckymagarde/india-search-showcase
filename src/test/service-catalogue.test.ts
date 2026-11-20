import { describe, expect, it } from "vitest";
import { serviceCatalogue, serviceCategories } from "@/data/service-catalogue";
describe("Verified service sitemap", () => {
  it("contains all 29 distinct original URLs", () => {
    expect(serviceCatalogue.length).toBe(29);
    expect(new Set(serviceCatalogue.map((s) => s.url)).size).toBe(29);
  });
  it("groups 11 SEO, 9 development and 9 industry services", () =>
    expect(
      serviceCategories.map((c) => serviceCatalogue.filter((s) => s.category === c.id).length),
    ).toEqual([11, 9, 9]));
  it.each(serviceCatalogue)("preserves the canonical origin and slash for $title", (service) =>
    expect(service.url).toBe(`https://www.seoexpertindia.biz${service.path}`),
  );
  it("keeps the law firm industry URL", () =>
    expect(serviceCatalogue.find((s) => s.title === "SEO for Law Firm")?.path).toBe(
      "/service/seo-for-law-firm/",
    ));
  it("keeps the Copenhagen development URL", () =>
    expect(serviceCatalogue.find((s) => s.title === "Web Agency Copenhagen, Denmark")?.path).toBe(
      "/service/web-agency-copenhagen-denmark/",
    ));
});
