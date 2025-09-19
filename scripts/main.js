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

/* Hero word reveal */
(function(){
  const container = document.querySelector('.reveal-words');
  if(!container) return;
  const text = container.textContent.trim();
  if(!text) return;
  const words = text.split(' ');
  container.textContent = '';
  words.forEach((wd, i)=>{
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = i < words.length - 1 ? `${wd} ` : wd;
    container.appendChild(span);
  });
  const parts = container.querySelectorAll('.w');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    parts.forEach(p=>p.classList.add('on'));
    return;
  }
  const start = performance.now();
  const durEach = 55;
  function tick(t){
    const elapsed = t - start;
    const idx = Math.floor(elapsed / durEach);
    for(let i=0; i<=idx && i<parts.length; i++){
      parts[i].classList.add('on');
    }
    if(idx < parts.length) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
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
