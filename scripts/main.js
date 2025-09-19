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
const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{ threshold: .15 });
revealTargets.forEach(el=>revealObserver.observe(el));

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

/* Year + basic count-up (optional, light) */
const yearEl = document.getElementById('year');
if(yearEl){
  yearEl.textContent = new Date().getFullYear();
}

document.querySelectorAll('.stat-value').forEach(el=>{
  const target = parseInt(el.dataset.target || el.textContent, 10);
  if(!Number.isFinite(target)) return;
  const isPlus = el.textContent.includes('+');
  const start = 0;
  const dur = 900;
  const t0 = performance.now();
  function tick(t){
    const p = Math.min(1, (t - t0) / dur);
    const val = Math.floor(start + (target - start) * p);
    el.textContent = isPlus ? `${val}+` : `${val}`;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});
