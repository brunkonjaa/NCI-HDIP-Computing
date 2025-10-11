
// Cosy Corner — Main Script
// Theme toggle, active nav, dynamic content, localStorage forms, and scroll animations.

document.addEventListener('DOMContentLoaded', () => {

  // ===== Helpers =====
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

  const safeJSON = (key, fallback = []) => {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch { return fallback; }
  };

  // ===== Theme Toggle =====
  const html = document.documentElement;
  const toggle = $('#themeToggle');
  const THEME_KEY = 'cosy-theme';

  if (toggle) {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') html.classList.add('dark');
    toggle.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
    toggle.setAttribute('aria-pressed', html.classList.contains('dark'));

    toggle.addEventListener('click', () => {
      const dark = html.classList.toggle('dark');
      toggle.setAttribute('aria-pressed', dark);
      toggle.textContent = dark ? '☀️' : '🌙';
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    });
  }

  // ===== Active Navbar Link =====
  const active = location.pathname.split('/').pop() || 'index.html';
  $$('nav a[data-active]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(active)) link.classList.add('active');
  });

  // ===== Specials Section =====
  const specialsGrid = $('#specialsGrid');
  if (specialsGrid) {
    const specials = [
      { title: 'Honey Oat Latte', desc: 'Oat milk, local honey, cinnamon.' },
      { title: 'Cold Brew Tonic', desc: 'Bright and bubbly with citrus.' },
      { title: 'Cardamom Cappuccino', desc: 'Classic with subtle spice.' }
    ];
    specialsGrid.innerHTML = specials.map(s => `
      <div class="col-md-4 pre-fade">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h3 class="h5">${s.title}</h3>
            <p class="mb-0">${s.desc}</p>
          </div>
        </div>
      </div>`).join('');
  }

  // ===== Services Section =====
  const servicesList = $('#servicesList');
  if (servicesList) {
    const services = [
      {img:'https://picsum.photos/seed/service1/600/400', alt:'Barista coffee', title:'In-Shop Barista', txt:'Espresso, pour-over, and seasonal brews.'},
      {img:'https://picsum.photos/seed/service2/600/400', alt:'Catering trays', title:'Event Catering', txt:'Corporate/private events with fresh bakes.'},
      {img:'https://picsum.photos/seed/service3/600/400', alt:'Subscription box', title:'Bean Subscription', txt:'Monthly roasts delivered with notes.'}
    ];
    servicesList.innerHTML = services.map(item => `
      <div class="col-md-4 pre-fade">
        <div class="card h-100">
          <img src="${item.img}" class="card-img-top" alt="${item.alt}" loading="lazy">
          <div class="card-body">
            <h3 class="card-title h5">${item.title}</h3>
            <p class="card-text">${item.txt}</p>
          </div>
        </div>
      </div>`).join('');
  }

  // ===== Newsletter Form =====
  const newsForm = $('#newsletterForm');
  const newsEmail = $('#newsletterEmail');
  const newsList = $('#newsletterList');
  const NEWS_KEY = 'cosy-newsletters';

  if (newsForm && newsEmail && newsList) {
    const saved = safeJSON(NEWS_KEY);
    const renderList = () => newsList.innerHTML = saved.map(e => `<li>${e}</li>`).join('');
    renderList();

    newsForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsEmail.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        newsEmail.classList.add('is-invalid');
        return;
      }
      newsEmail.classList.remove('is-invalid');

      if (!saved.includes(email)) {
        saved.push(email);
        localStorage.setItem(NEWS_KEY, JSON.stringify(saved));
      }
      newsEmail.value = '';
      renderList();
    });
  }

  // ===== Contact Form =====
  const form = $('#contactForm');
  const resultBox = $('#formResult');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      form.reset();
      form.classList.remove('was-validated');

      if (resultBox) {
        resultBox.classList.remove('d-none');
        resultBox.textContent = 'Thanks! Your message has been sent.';
        setTimeout(() => resultBox.classList.add('d-none'), 4000);
      }
    });
  }

  // ===== Scroll-in Animation =====
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.pre-fade, .card, main > *').forEach(el => observer.observe(el));

});
