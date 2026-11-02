import { describe, it, expect } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { company, serviceDirectory } from '@/data/site-pages';
describe('Company page requirements',()=>{
 it.each(['about','recent-work','testimonials','contact','faq','services'])('preserves /%s/',slug=>{
  const router=createRouter({routeTree,context:{queryClient:new QueryClient()}});
  expect(router.matchRoutes(`/${slug}/`).at(-1)?.routeId).toBe(`/${slug}`);
 });
 it('uses the supplied establishment year',()=>expect(company.established).toBe(2016));
 it('uses the supplied experience positioning',()=>expect(company.experience).toBe('10+'));
 it('preserves the existing SEO service destination',()=>expect(serviceDirectory[0]?.url).toBe('/service/best-seo-services-in-india/'));
 it('preserves the supplied business profile',()=>expect(company.profile).toBe('https://share.google/FJjTIHHwbvsQkfBdl'));
 it('uses the added Maps listing',()=>expect(company.maps).toBe('https://maps.app.goo.gl/CvgKAvQEsbnmy2rb6'));
});