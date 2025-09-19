/* Smooth anchors */
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  const el = document.querySelector(id);
  if(el){
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
    document.querySelector('.site-header')?.classList.remove('nav-open');
    const btn = document.querySelector('.nav-toggle'); if(btn) btn.setAttribute('aria-expanded','false');
  }
});

/* Mobile nav toggle */
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
if(toggle){
  toggle.addEventListener('click', ()=>{
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* Reveal animations */
(function(){
  const els = document.querySelectorAll('.reveal, .reveal-stagger');
  if(!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{ threshold:.15 });
  els.forEach(el=>io.observe(el));
})();

/* Random vertical offsets for showcase grid */
const reelWraps = document.querySelectorAll('#reels .reels-stagger > .vwrap-plain, #reels .reels-stagger > .hwrap-plain');
if(reelWraps.length){
  const tabletMq = window.matchMedia('(min-width:700px)');
  const desktopMq = window.matchMedia('(min-width:1024px)');
  const tabletOffsets = [0, 40];
  const desktopOffsets = [0, 40, 80];
  const mobileOffsets = [0];
  const choose = (arr)=>arr[Math.floor(Math.random()*arr.length)];
  const applyOffsets = ()=>{
    const offsets = desktopMq.matches ? desktopOffsets : (tabletMq.matches ? tabletOffsets : mobileOffsets);
    reelWraps.forEach(el=>{
      const value = choose(offsets);
      el.style.setProperty('--v-offset', `${value}px`);
    });
  };
  applyOffsets();
  tabletMq.addEventListener('change', applyOffsets);
  desktopMq.addEventListener('change', applyOffsets);
}

/* Hero montage parallax */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiles = document.querySelectorAll('.hero-montage .tile');
  const hero = document.querySelector('.hero');
  if(!tiles.length || !hero) return;
  const strength = 0.06;
  const update = ()=>{
    const rect = hero.getBoundingClientRect();
    const range = rect.height + window.innerHeight;
    const pct = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / range));
    tiles.forEach((tile, index)=>{
      const offset = (index + 1) * strength * (pct * 40);
      tile.style.setProperty('--parallax', `${-offset}px`);
    });
  };
  window.addEventListener('scroll', update, {passive:true});
  update();
})();

/* Lazy-load hero videos */
(function(){
  const vids = document.querySelectorAll('.hero-montage video.reel[data-src]');
  if(!vids.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const v = entry.target;
        const src = v.getAttribute('data-src');
        if(src && !v.src){
          v.src = src;
          v.load();
        }
        io.unobserve(v);
      }
    });
  },{ rootMargin:'200px 0px', threshold:.01 });
  vids.forEach(v=>io.observe(v));
})();

/* Sticky CTA */
(function(){
  const btn = document.querySelector('.sticky-cta');
  if(!btn) return;
  btn.classList.add('hide');
  const hero = document.querySelector('.hero');
  if(!hero) return;
  const contact = document.getElementById('contact');
  let shouldShow = false;
  const showObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      shouldShow = !entry.isIntersecting;
      btn.classList.toggle('hide', !shouldShow);
    });
  },{ rootMargin:'-40% 0px -40% 0px', threshold:.01 });
  showObserver.observe(hero);

  if(contact){
    const hideObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          btn.classList.add('hide');
        } else if(shouldShow){
          btn.classList.remove('hide');
        }
      });
    },{ rootMargin:'0px 0px -60% 0px', threshold:.01 });
    hideObserver.observe(contact);
  }
})();

/* Lazy-load showcase videos */
const lazyVideos = document.querySelectorAll('#reels video.reel[data-src]');
if(lazyVideos.length){
  const lazyObserver = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const vid = entry.target;
        const src = vid.dataset.src;
        if(src && !vid.src){
          vid.src = src;
          vid.load();
        }
        observer.unobserve(vid);
      }
    });
  },{ rootMargin:'150px 0px', threshold:0 });
  lazyVideos.forEach(vid=>lazyObserver.observe(vid));
}

/* Contact copy-to-clipboard */
(function(){
  const btn = document.querySelector('.copy-email');
  const link = document.querySelector('.email-link');
  const toast = document.querySelector('.toast');
  if(!btn || !link || !toast) return;
  const email = link.textContent.trim();
  btn.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(email);
      toast.textContent = 'Email copied to clipboard';
    }catch(_){
      toast.textContent = 'Copy failed — long-press to copy';
    }
    toast.classList.add('show');
    clearTimeout(btn._toastTimeout);
    btn._toastTimeout = setTimeout(()=>toast.classList.remove('show'), 1600);
  });
})();

/* Autoplay/pause reels when in view */
const videos = document.querySelectorAll('video.reel');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const v = entry.target;
    if(entry.isIntersecting && entry.intersectionRatio >= 0.5){
      v.play().catch(()=>{});
    } else {
      v.pause();
    }
  });
},{ threshold:[0,0.5,1]});
videos.forEach(v=>io.observe(v));

/* Year + animated stats */
const yearEl = document.getElementById('year');
if(yearEl){
  yearEl.textContent = new Date().getFullYear();
}

const statEls = document.querySelectorAll('#stats .stat-value');
const animateStats = ()=>{
  statEls.forEach(el=>{
    const target = parseInt(el.dataset.target || el.textContent, 10);
    if(!Number.isFinite(target)) return;
    const isPlus = el.textContent.trim().endsWith('+');
    const start = 0;
    const dur = 900;
    const begin = performance.now();
    function step(t){
      const p = Math.min(1, (t - begin) / dur);
      const val = Math.floor(start + (target - start) * p);
      el.textContent = isPlus ? `${val}+` : `${val}`;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
};
if(statEls.length){
  const statsSection = document.getElementById('stats');
  if(statsSection){
    const statsObserver = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.3});
    statsObserver.observe(statsSection);
  } else {
    animateStats();
  }
}
