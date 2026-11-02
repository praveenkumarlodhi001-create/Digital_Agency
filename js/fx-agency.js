(() => {
  const R = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.fxa-l img').forEach(i => i.addEventListener('error', () => i.closest('.fxa-l').classList.add('fx-broken')));
  const hero = document.querySelector('.hero');
  if (hero && !R) {
    const s = document.createElement('div'); s.className = 'fxa-streaks'; s.setAttribute('aria-hidden', 'true');
    s.innerHTML = Array.from({ length: 7 }, (_, k) => `<i style="--x:${8 + k * 13}%;--t:${6 + (k % 4) * 1.6}s;--d:${-k * 1.3}s"></i>`).join('');
    hero.prepend(s);
  }
  if (R || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('fxa-js');
  const secs = [...document.querySelectorAll('main>section')].slice(1); secs.forEach(s => s.classList.add('fxa-sec'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .06 });
  secs.forEach(s => io.observe(s));
  const box = document.querySelector('.fxa-depth'), layers = [...document.querySelectorAll('.fxa-l')]; let mx = 0, tick = false;
  const paint = () => { tick = false; const r = box.getBoundingClientRect(), p = (innerHeight / 2 - (r.top + r.height / 2)) / innerHeight;
    layers.forEach(l => { const d = +l.dataset.d; l.style.transform = `translate3d(${mx * d * 22}px,${-p * d * 90}px,0)`; }); };
  const ask = () => { if (!tick) { tick = true; requestAnimationFrame(paint); } };
  if (box) { addEventListener('scroll', ask, { passive: true }); addEventListener('resize', ask); addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; ask(); }, { passive: true }); ask(); }
})();
