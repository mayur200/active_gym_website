// Init Lucide icons
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });
}

// Force video play on mobile
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.play().catch(() => {
    // If autoplay fails, show poster image silently
    heroVideo.style.display = 'none';
  });
  document.addEventListener('touchstart', () => {
    heroVideo.play().catch(() => {});
  }, { once: true, passive: true });
}

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// Nav scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ? 'rgba(17,17,17,0.99)' : 'rgba(17,17,17,0.95)';
  });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.animate-up');
    let delay = 0;
    siblings.forEach((el, i) => { if (el === entry.target) delay = i * 90; });
    setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));

// Trial form → WhatsApp
const trialForm = document.getElementById('trialForm');
if (trialForm) {
  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const goal  = document.getElementById('goal').value;
    const msg = `Hi, I want to book a free trial at Active Gym!%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AGoal: ${encodeURIComponent(goal || 'Not specified')}`;
    window.open(`https://wa.me/919769055740?text=${msg}`, '_blank');
  });
}


