import reviews from '@/data/home-testimonials.json';

// Placeholder portraits until real client photos are supplied.
const avatar = (i: number) => `https://i.pravatar.cc/120?img=${(i * 7) % 70 + 1}`;

export function TestimonialCards({ limit }: { limit?: number }) {
 const list = limit ? reviews.slice(0, limit) : reviews;
 return <div className="testi-grid">{list.map((r, i) => <article className="testi-card2" key={r.name}><div className="tq" aria-hidden>”</div><div className="client-head"><div className="avatar2"><img src={avatar(i)} alt={`${r.name} profile`} width={54} height={54} loading="lazy" decoding="async"/></div><div className="client-meta"><div className="name2">{r.name}</div><div className="role2">{r.role} <span className="country">{r.flag}</span></div></div></div><div className="rev-stars" aria-label={`${r.stars} out of 5 stars`}>{'★'.repeat(r.stars)}</div><div className="text2">{r.text}</div><div className="svc">{r.service}</div></article>)}</div>;
}

export function ClientTestimonials() {
 return <section id="testimonials" className="client-testimonials" style={{ padding: '72px 0' }}><div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}><div style={{ textAlign: 'center', marginBottom: 32 }}><div className="ss-eyebrow">Client Testimonials</div><h2>What Our Clients Say About SEO Expert India</h2></div><TestimonialCards limit={8}/></div></section>;
}
