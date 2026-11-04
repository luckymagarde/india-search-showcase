import {describe,it,expect} from 'vitest';
import {DEVELOPMENT_URL,developmentFaqs,quoteRows} from '@/data/web-development';
import {serviceDirectory} from '@/data/site-pages';
describe('Website development requirements',()=>{
 it('preserves the exact canonical',()=>expect(DEVELOPMENT_URL).toBe('https://www.seoexpertindia.biz/service/web-development-company-india/'));
 it('keeps the established directory URL and connects it locally',()=>{const s=serviceDirectory.find(s=>s.title==='Website Development');expect(s?.url).toBe(DEVELOPMENT_URL);expect(s?.local).toBe(true)});
 it('includes at least twelve useful questions',()=>expect(developmentFaqs.length).toBeGreaterThanOrEqual(12));
 it.each(developmentFaqs)('gives a detailed answer to %s',(_,answer)=>expect(answer.trim().split(/\s+/).length).toBeGreaterThanOrEqual(150));
 it.each(developmentFaqs)('keeps the answer to %s concise enough',(_,answer)=>expect(answer.trim().split(/\s+/).length).toBeLessThanOrEqual(200));
 it('compares the five specified project categories without invented prices',()=>{expect(quoteRows.map(r=>r[0])).toEqual(['Basic Business Website','Professional Corporate Website','WordPress Website','eCommerce Website','Custom Website Development']);expect(quoteRows.flat().join(' ')).not.toMatch(/[$€₹]\s*\d/)});
});