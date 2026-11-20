import { describe, expect, it } from "vitest";
import {
  PAGE_URL,
  strategyVideos,
  platforms,
  industries,
  services,
  packages,
} from "@/data/seo-services";
const words = (text: string) => text.trim().split(/\s+/).length;
describe("SEO page requirements", () => {
  it("preserves the exact canonical URL", () =>
    expect(PAGE_URL).toBe("https://www.seoexpertindia.biz/service/best-seo-services-in-india/"));
  it("uses only the two requested strategy videos", () =>
    expect(strategyVideos.map((v) => v.id)).toEqual(["xNpsxDlSdYQ", "UZPw9tkgDnI"]));
  it("uses USD without converting the existing numerical prices", () =>
    expect(packages.map((p) => p.price)).toEqual(["$599", "$1000", "$1500"]));
  it("keeps eight distinct platform descriptions between 50 and 70 words", () => {
    expect(platforms).toHaveLength(8);
    expect(new Set(platforms.map((p) => p.intro)).size).toBe(8);
    platforms.forEach((p) => {
      expect(words(p.intro), p.name).toBeGreaterThanOrEqual(50);
      expect(words(p.intro), p.name).toBeLessThanOrEqual(70);
      expect(p.points.length).toBeGreaterThan(0);
    });
  });
  it("provides unique 50-word content for all twelve industries", () => {
    expect(industries).toHaveLength(12);
    expect(new Set(industries.map((p) => p[2])).size).toBe(12);
    industries.forEach((p) => expect(words(p[2]), p[1]).toBeGreaterThanOrEqual(50));
  });
  it("provides unique 100-word content and activities for all eight services", () => {
    expect(services).toHaveLength(8);
    expect(new Set(services.map((p) => p.desc)).size).toBe(8);
    services.forEach((p) => {
      expect(words(p.desc), p.name).toBeGreaterThanOrEqual(100);
      expect(p.points.length).toBeGreaterThan(0);
    });
  });
});
