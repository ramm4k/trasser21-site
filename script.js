const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const faqItems = document.querySelectorAll('.faq__item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = lightbox?.querySelector('[data-lightbox-close]');
const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

if (lightbox && lightboxImage && lightboxCaption && lightboxClose && lightboxTriggers.length) {
  let lastFocusedTrigger = null;

  const openLightbox = trigger => {
    const image = trigger.querySelector('img');
    const source =
      trigger.getAttribute('data-lightbox-src') ||
      image?.currentSrc ||
      image?.src ||
      image?.getAttribute('src');
    const alt = image?.getAttribute('alt') || '';
    const caption = trigger.getAttribute('data-lightbox-caption') || alt;

    if (!source) return;

    const resolvedSource = new URL(source, window.location.href).href;

    lastFocusedTrigger = trigger;
    lightboxImage.src = resolvedSource;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.classList.add('is-locked');
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
    document.body.classList.remove('is-locked');

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  };

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (event.target.closest('a, button')) return;
      openLightbox(trigger);
    });

    trigger.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openLightbox(trigger);
    });
  });

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.closest('[data-lightbox-close]')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });

  lightboxImage.addEventListener('error', () => {
    lightboxCaption.textContent = 'Не удалось открыть фото. Попробуйте обновить страницу.';
  });
}
