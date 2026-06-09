const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const form = document.getElementById('request-form');
const faqItems = document.querySelectorAll('.faq__item');

if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Демо-заявка принята. Следующий шаг: подключить отправку в Telegram, WhatsApp, CRM или на почту.');
    form.reset();
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
