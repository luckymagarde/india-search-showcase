import { describe, expect, it } from "vitest";
import { industryPath } from "@/data/industry-links";
describe("Existing industry destinations", () => {
  it.each([
    ["Education", "/service/seo-services-for-education-industry/"],
    ["Healthcare", "/service/healthcare-website-seo-services/"],
    ["eCommerce", "/service/ecommerce-website-seo-services/"],
    ["Legal services", "/service/seo-for-law-firm/"],
    ["Real estate", "/service/real-estate-website-seo-services/"],
    ["IT & Software", "/service/seo-for-it-industry/"],
    ["Home improvement", "/service/home-improvements/"],
  ])("links %s to its existing page", (name, path) => expect(industryPath(name)).toBe(path));
  it("does not invent a spiritual-service destination", () =>
    expect(industryPath("Astrology")).toBeUndefined());
});
