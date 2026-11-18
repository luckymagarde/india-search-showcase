import {describe,it,expect} from 'vitest';
import {seoProjects} from '@/data/seo-projects';
import source from './seo-projects-source.json';

describe('Original SEO portfolio data',()=>{
 it.each(source)('preserves all unique source rankings for $website',record=>{
  const project=seoProjects.find(p=>p.website===record.website);
  expect(project?.rankingLabel).toBe(record.rankingLabel);
  expect(project?.rankings).toEqual(record.rankings);
 });
 it('imports all 24 clients with 108 unique keyword-position records',()=>{
  expect(seoProjects).toHaveLength(24);
  expect(seoProjects.reduce((sum,p)=>sum+p.rankings.length,0)).toBe(108);
 });
 it('removes only the exact repeated HUMAX keyword and position',()=>{
  expect(seoProjects.find(p=>p.website==='https://www.humaxdirect.co.uk')?.rankings.filter(r=>r.keyword==='Freeview HD box recorder')).toEqual([{keyword:'Freeview HD box recorder',position:4}]);
 });
});