const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const faqItems = document.querySelectorAll('.faq__item');

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
