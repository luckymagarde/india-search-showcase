/* SEO Expert India – homepage behaviour (original script). */
(function(){


const testimonials = [
  { text: "SEO Expert India helped us rebuild our website with a cleaner structure and a stronger SEO foundation. The process was organised, communication was clear, and the website is much easier for our customers to navigate.", name: "Amit Sharma", role: "Director, EduLearn Academy", flag: "🇮🇳", service: "Website Development + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { text: "Lokesh understood our requirements before starting the website work. The new site feels professional, loads better and has a much clearer SEO structure. We appreciated the regular communication throughout the project.", name: "Mikkel Andersen", role: "Marketing Director, MedCare Hospital", flag: "🇩🇰", service: "Website Development + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/41.jpg" },
  { text: "We wanted one team to coordinate search, paid campaigns and social media. SEO Expert India gave us a structured digital marketing plan and kept the communication straightforward and consistent.", name: "Daniel Wilson", role: "Marketing Manager, TechVista Solutions", flag: "🇬🇧", service: "Social Media Marketing + PPC + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/46.jpg" },
  { text: "Our previous website needed a complete structural improvement. Lokesh and his team worked on the website development as well as technical and on-page SEO, giving us a much stronger foundation for organic growth.", name: "Michael Carter", role: "Founder, HomeStyle Interiors", flag: "🇺🇸", service: "Website Development + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/52.jpg" },
  { text: "The team took time to understand our audience and business goals. The SEO and social media work were coordinated rather than treated as separate activities, which made our overall digital presence much more consistent.", name: "James Mitchell", role: "Managing Director, LuxeCart Store", flag: "🇦🇺", service: "SEO + Social Media Marketing", stars: 5, img: "https://randomuser.me/api/portraits/men/61.jpg" },
  { text: "We needed a modern website and a more structured approach to online marketing. The team explained the technical changes clearly and handled the website, SEO and PPC requirements in a professional manner.", name: "Stefan Müller", role: "Managing Director, Carter & Blake Law", flag: "🇨🇭", service: "Website Development + PPC + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/68.jpg" },
  { text: "The new website gave our business a much more professional online presence. Lokesh also helped us create a consistent social media direction, making it easier to communicate our services across channels.", name: "Ryan Thompson", role: "Owner, AutoDrive Motors", flag: "🇨🇦", service: "Website Development + Social Media Marketing", stars: 5, img: "https://randomuser.me/api/portraits/men/75.jpg" },
  { text: "The team worked through technical website issues carefully and explained why each recommendation mattered. The development and SEO work were handled together, which made the project much easier to manage.", name: "Thomas Schneider", role: "Director, SnapShutter Studio", flag: "🇩🇪", service: "Technical SEO + Website Development", stars: 5, img: "https://randomuser.me/api/portraits/men/79.jpg" },
  { text: "We needed support across organic search, paid advertising and social media. SEO Expert India provided a coordinated strategy and regular updates, so we always knew what work was being handled.", name: "Marco Rossi", role: "Founder, PrimeRealty Group", flag: "🇮🇹", service: "Social Media Marketing + PPC + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/83.jpg" },
  { text: "The website development and SEO strategy were planned together from the beginning. The team listened to our requirements, kept the process organised and delivered a much clearer online structure for the business.", name: "Lars van Dijk", role: "Business Owner, CloudNet Telecom", flag: "🇳🇱", service: "Website Development + SEO", stars: 5, img: "https://randomuser.me/api/portraits/men/86.jpg" },
  { text: "The SEO work was practical and focused on the areas that needed attention first. We also received clear guidance around content and page structure, which made it easier for our internal team to continue improving the website.", name: "Emily Brown", role: "Founder, FreshMart Online", flag: "🇺🇸", service: "SEO + Content Marketing + GMB", stars: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { text: "We wanted a website that could support both organic and paid acquisition. Lokesh helped align the website structure with our marketing goals and kept the technical side of the project understandable.", name: "Oliver Martin", role: "Director, GreenHome Builders", flag: "🇬🇧", service: "Website Development + SEO + PPC", stars: 5, img: "https://randomuser.me/api/portraits/men/34.jpg" },
  { text: "The team helped us bring our search and social activities under one consistent strategy. Reporting was easy to understand and the communication throughout the engagement was professional and responsive.", name: "Sophie Laurent", role: "Marketing Director, BrightMinds School", flag: "🇫🇷", service: "Social Media Marketing + SEO + GMB", stars: 5, img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { text: "We were interested in improving visibility beyond traditional search. The team explained technical SEO together with newer AEO and GEO concepts and helped us understand how the website content and structure support modern search experiences.", name: "Andreas Keller", role: "CEO, DesignCraft Interiors", flag: "🇦🇹", service: "Technical SEO + AEO + GEO", stars: 5, img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { text: "From website planning to SEO and social media, the work was handled as one connected digital project. The team was responsive to feedback and made the website much more aligned with our business positioning.", name: "Lucas Pereira", role: "Founder, MediPlus Clinic", flag: "🇵🇹", service: "Website Development + SEO + Social Media Marketing", stars: 5, img: "https://randomuser.me/api/portraits/men/23.jpg" },
  { text: "SEO Expert India gave us a clear structure for managing organic search, paid campaigns and social media together. The regular communication made the project easier to follow and the strategy was presented in a straightforward way.", name: "Emma Wilson", role: "Operations Director, SEO Growth Partners", flag: "🇮🇪", service: "SEO + PPC + Social Media Marketing + GMB", stars: 5, img: "https://randomuser.me/api/portraits/women/47.jpg" }
];
function initials(name){ return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
const PAGE_SIZE = 4;
let testiPage = 0;
const testiTrack = document.getElementById('testiTrack');
const testiDots = document.getElementById('testiDots');
function cardHtml(t){
  const starsLine = t.stars ? `<div class="rev-stars" aria-label="${t.stars} out of 5 stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>` : '';
  const serviceLine = t.service ? `<div class="svc">${t.service}</div>` : '';
  const flag = t.flag ? `<span class="country">${t.flag}</span>` : '';
  const image = t.img ? `<img src="${t.img}" alt="${t.name}" loading="lazy" onerror="this.style.display='none'">` : `<span>${initials(t.name)}</span>`;
  return `<article class="testi-card2 testi-slide-in"><div class="tq">”</div><div class="client-head"><div class="avatar2">${image}</div><div class="client-meta"><div class="name2">${t.name}</div><div class="role2">${t.role} ${flag}</div></div></div>${starsLine}<div class="text2">${t.text}</div>${serviceLine}</article>`;
}
const pageCount = Math.ceil(testimonials.length / PAGE_SIZE);
let testiRenderTimer;
function paintTestimonials(){
  const start = testiPage * PAGE_SIZE;
  const slice = testimonials.slice(start, start + PAGE_SIZE);
  testiTrack.innerHTML = `<div class="testi-grid">${slice.map(cardHtml).join('')}</div>`;
  testiDots.innerHTML = Array.from({length:pageCount},(_,i)=>`<button class="testi-dot${i===testiPage?' active':''}" aria-label="Go to testimonial group ${i+1}" data-i="${i}"></button>`).join('');
  testiDots.querySelectorAll('.testi-dot').forEach(d=>d.addEventListener('click',()=>{ testiPage=+d.dataset.i; renderTesti(); }));
}
function renderTesti(animate=true){
  clearTimeout(testiRenderTimer);
  if(!animate || !testiTrack.innerHTML){
    paintTestimonials();
    testiTrack.classList.remove('is-changing');
    testiTrack.classList.add('is-ready');
    return;
  }
  testiTrack.classList.remove('is-ready');
  testiTrack.classList.add('is-changing');
  testiRenderTimer=setTimeout(()=>{
    paintTestimonials();
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        testiTrack.classList.remove('is-changing');
        testiTrack.classList.add('is-ready');
      });
    });
  },280);
}
renderTesti(false);
if(pageCount>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  setInterval(()=>{ testiPage=(testiPage+1)%pageCount; renderTesti(); }, 5500);
}

// Achievement counters: animate once when the section enters the viewport.
(function(){
  const stats=document.querySelectorAll('.why-stat strong[data-count]');
  if(!stats.length) return;
  const animateCounter=(el)=>{
    const target=Number(el.dataset.count||0);
    const suffix=el.dataset.suffix||'';
    const duration=1450;
    const start=performance.now();
    const tick=(now)=>{
      const p=Math.min(1,(now-start)/duration);
      const eased=1-Math.pow(1-p,3);
      const value=Math.floor(target*eased);
      el.textContent=value.toLocaleString('en-IN')+suffix;
      if(p<1) requestAnimationFrame(tick);
      else el.textContent=target.toLocaleString('en-IN')+suffix;
    };
    requestAnimationFrame(tick);
  };
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          stats.forEach(animateCounter);
          obs.disconnect();
        }
      });
    },{threshold:.35});
    const section=document.querySelector('.why-stats');
    if(section) io.observe(section);
  }else{stats.forEach(animateCounter);}
})();

document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click',()=>{
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!open) item.classList.add('open');
  });
});

const form=document.getElementById('leadForm');
if(form) form.addEventListener('submit',e=>{
  e.preventDefault();
  let valid=true;
  [['f-name','name',v=>v.trim().length>0],['f-email','email',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)],['f-phone','phone',v=>v.trim().length>=7]]
  .forEach(([w,f,test])=>{
    const wrap=document.getElementById(w), field=document.getElementById(f);
    const ok=test(field.value);
    wrap.classList.toggle('error',!ok);
    if(!ok) valid=false;
  });
  if(!valid) return;
  const btn=form.querySelector('.submit');
  btn.textContent='Sending…'; btn.disabled=true;
  setTimeout(()=>{ form.style.display='none'; document.getElementById('fSuccess').classList.add('show'); },800);
});


})();
