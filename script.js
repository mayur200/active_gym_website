/* ============================================================
   ACTIVE GYM – script.js
   ============================================================ */

/* -------- NAVBAR: scroll class + mobile toggle -------- */
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

/* -------- SCROLL FADE-IN (Intersection Observer) -------- */
const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* -------- ACTIVE NAV LINK HIGHLIGHT -------- */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-link'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-link');
    }
  });
}, { rootMargin: '-50% 0px -45% 0px' });

sections.forEach(s => navObserver.observe(s));

/* -------- VIDEO PLAY/PAUSE TOGGLE -------- */
const video   = document.getElementById('gymReel');
const overlay = document.getElementById('igVideoOverlay');
const playBtn = document.getElementById('igPlayBtn');

if (video && overlay && playBtn) {
  // Try to auto-play muted
  video.play().catch(() => {});

  overlay.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      overlay.classList.add('hidden');
    }
  });

  video.addEventListener('click', () => {
    video.pause();
    overlay.classList.remove('hidden');
  });

  // Show overlay again when video ends
  video.addEventListener('ended', () => {
    overlay.classList.remove('hidden');
  });
}

/* -------- CONTACT FORM -------- */
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const phone   = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !phone) {
      formNote.style.color = '#FF5252';
      formNote.textContent = 'Please enter your name and phone number.';
      return;
    }

    // Build WhatsApp message and open
    const text = encodeURIComponent(
      `Hi Active Gym! My name is ${name}.\nPhone: ${phone}\n${message ? 'Message: ' + message : ''}`
    );
    window.open(`https://wa.me/919769055740?text=${text}`, '_blank');

    formNote.style.color = '#4CAF50';
    formNote.textContent = "✓ Opening WhatsApp… We'll respond shortly!";
    form.reset();

    setTimeout(() => { formNote.textContent = ''; }, 5000);
  });
}

/* -------- SMOOTH SCROLL polyfill for older iOS -------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* -------- PLAN CARD: pulse on hover for featured -------- */
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });
});
