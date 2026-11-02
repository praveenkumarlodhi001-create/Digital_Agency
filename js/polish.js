/* Noderra motion polish layer — no dependencies */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.createElement('div');
  progress.className = 'noderra-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.width = `${ratio * 100}%`;
    document.body.classList.toggle('noderra-scrolled', window.scrollY > 16);
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();

  if (reduced) return;
  document.body.classList.add('noderra-motion-ready');

  // Stagger related cards without changing their markup or content.
  document.querySelectorAll('.service-grid,.program-grid,.doctor-grid,.product-grid,.property-grid,.dish-grid,.neighborhood-grid,.mentor-grid').forEach(group => {
    [...group.children].forEach((item, index) => item.dataset.motionDelay = String((index % 4) + 1));
  });

  // Fallback and enhancement for reveal items added dynamically or missed by the original observer.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
})();
