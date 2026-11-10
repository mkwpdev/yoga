const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.focus();
  }
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
});

if (typeof Swiper !== 'undefined') {
  new Swiper('.stories-carousel', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    breakpoints: { 1025: { slidesPerView: 2, spaceBetween: 28 } },
    navigation: { prevEl: '.stories-prev', nextEl: '.stories-next' },
    a11y: { prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' },
  });
}

// Content stays visible when reduced motion is enabled or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-heading, .benefits').forEach(element => revealObserver.observe(element));
}
