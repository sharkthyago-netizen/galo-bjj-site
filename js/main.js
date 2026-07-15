const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
const title = document.querySelector('#hero-title');
const text = document.querySelector('#hero-text');
const eyebrow = document.querySelector('#hero-eyebrow');
let current = 0;
let timer;

function showSlide(index) {
  current = index;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => {
    const active = i === index;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });

  const slide = slides[index];
  title.textContent = slide.dataset.title;
  text.textContent = slide.dataset.text;
  eyebrow.textContent = slide.dataset.eyebrow;
  clearInterval(timer);
  timer = setInterval(() => showSlide((current + 1) % slides.length), 10000);
}

dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
showSlide(0);

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-menu');

function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const lightbox = document.querySelector('.lightbox');
const lightImg = lightbox.querySelector('img');
const closeButton = lightbox.querySelector('button');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightImg.src = img.src;
    lightImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
    closeLightbox();
  }
});

document.querySelector('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
  alert('Interesse registrado localmente. Para concluir, conecte este formulário ao WhatsApp, e-mail ou serviço de captação de leads.');
});
