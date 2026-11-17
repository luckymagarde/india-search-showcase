import {createFileRoute} from '@tanstack/react-router';
import {PageShell,Intro,FinalCTA} from '@/components/site/page-shell';
import {pageHead} from '@/data/site-pages';
import {TestimonialCards} from '@/components/site/client-testimonials';
export const Route=createFileRoute('/testimonials')({head:()=>pageHead('testimonials','Client Feedback & Testimonials','Explore the feedback already present on the SEO Expert India homepage, presented in the same testimonial card design.'),component:Testimonials});
function Testimonials(){return <PageShell reviews={false}><Intro name="Testimonials" eyebrow="Client conversations" title="Client Testimonials" description="The feedback already featured on our homepage, brought together in one place."/><section id="testimonials"><div className="sp-wrap"><div className="testi-slider"><TestimonialCards/></div></div></section><FinalCTA/></PageShell>}
