// === Moda ECCI 2025 - script.js ===

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar shadow on scroll ---- */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  /* ---- Reading progress indicator ---- */
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  /* ---- Image modal (click to enlarge) ---- */
  const imgModal = document.getElementById('imgModal');
  const modalImage = document.getElementById('modalImage');
  const modalLabel = document.getElementById('imgModalLabel');

  document.querySelectorAll('[data-bs-target="#imgModal"]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-img');
      const caption = el.getAttribute('data-caption') || 'Imagen';
      modalImage.setAttribute('src', src);
      modalImage.setAttribute('alt', caption);
      modalLabel.textContent = caption;
    });
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('main section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  /* ---- Collapse mobile menu after click ---- */
  const navMenu = document.getElementById('navMenu');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

});