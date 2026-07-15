/* ============================================================
   ACTIVE GYM – script.js
   ============================================================ */

/* -------- NAVBAR: scroll class + mobile toggle -------- */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

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
      // Only update hash-based nav links (e.g. #home, #services), not page links
      const hashLinks = document.querySelectorAll('.nav-links a[href^="#"]');
      hashLinks.forEach(a => a.classList.remove('active-link'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-link');
    }
  });
}, { rootMargin: '-50% 0px -45% 0px' });

sections.forEach(s => navObserver.observe(s));

/* -------- VIDEO PLAY/PAUSE TOGGLE -------- */
const video = document.getElementById('gymReel');
const overlay = document.getElementById('igVideoOverlay');
const playBtn = document.getElementById('igPlayBtn');

if (video && overlay && playBtn) {
  // Try to auto-play muted
  video.play().catch(() => { });

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
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();
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

/* ============================================================
   TRAINERS DATA & DETAILED PROFILE DISPLAY SYSTEM
   ============================================================ */
const trainersData = [
  {
    id: "santosh-singh",
    name: "Santosh Singh",
    designation: "Founder, Active Gym",
    experience: "12+ Years",
    specialization: ["Strength Training", "Functional Fitness", "Body Transformation"],
    about: "Co-founder of Active Gym, Goregaon East. Built the gym from the ground up with a vision to make quality fitness accessible to everyone. Passionate about helping members achieve sustainable results through discipline, consistency, and proper guidance.",
    certification: "Certified Fitness Professional",
    languages: "Hindi, English",
    styles: ["Strength", "Functional Fitness", "Weight Loss", "Muscle Gain"],
    achievement: "Successfully trained hundreds of members and built one of Goregaon's trusted fitness communities.",
    image: "images/santosh singh.jpeg"
  },
  {
    id: "kalim-sayyed",
    name: "Kalim Sayyed",
    designation: "Founder, Active Gym",
    experience: "10+ Years",
    specialization: ["Gym Management", "Strength Training", "General Fitness"],
    about: "Co-founder of Active Gym. Passionate about creating a motivating and welcoming fitness environment where beginners and experienced athletes can achieve their goals together.",
    certification: "Certified Fitness Professional",
    languages: "Hindi, English",
    styles: ["Strength", "Fitness", "Management"],
    achievement: "Expert in gym operations and member transformation.",
    image: "images/Kalim sayyed.jpeg"
  },
  {
    id: "sushant-ranjankar",
    name: "Sushant Ranjankar",
    designation: "Fitness Coach & Personal Trainer",
    experience: "8+ Years",
    specialization: ["Personal Training", "Strength Building", "Muscle Gain"],
    about: "Dedicated fitness coach specialising in personal training and strength development. Focused on helping clients build muscle, improve fitness, and achieve long-term results through personalised coaching.",
    certification: "Certified Personal Trainer",
    languages: "Hindi, English",
    styles: ["Strength", "Muscle Gain", "Personal Training"],
    achievement: "",
    image: "images/sushant ranjankar trainer.jpeg"
  },
  {
    id: "shekhar-aghade",
    name: "Shekhar Aghade",
    designation: "Fitness Trainer",
    experience: "7+ Years",
    specialization: ["Strength Conditioning", "Fat Loss", "Body Transformation"],
    about: "Experienced fitness trainer committed to guiding members toward healthier lifestyles through customised workout plans, strength conditioning, and consistent motivation.",
    certification: "Certified Fitness Trainer",
    languages: "Hindi, English",
    styles: ["Strength", "Conditioning", "Fat Loss"],
    achievement: "",
    image: "images/Shekhar Aghade trainer.jpeg"
  },
  {
    id: "nikhat-khojir",
    name: "Nikhat Khojir",
    designation: "Women's Fitness Specialist",
    experience: "6+ Years",
    specialization: ["Women's Fitness", "Fat Loss", "Body Toning", "Core Strength"],
    about: "Specialises in women's fitness by creating safe, effective, and personalised workout programs. Focused on improving confidence, strength, and overall wellness for women of all fitness levels.",
    certification: "Women's Fitness Certified",
    languages: "Hindi, English",
    styles: ["Women's Fitness", "Toning", "Fat Loss"],
    achievement: "",
    image: "images/Nikhat Khojgir.jpeg"
  },
  {
    id: "irfan-shaikh",
    name: "Irfan Shaikh",
    designation: "Fitness Trainer",
    experience: "7+ Years",
    specialization: ["Muscle Gain", "Strength Training", "Endurance"],
    about: "Passionate fitness trainer helping members build muscle, improve endurance, and increase overall strength through structured training and continuous support.",
    certification: "Certified Fitness Trainer",
    languages: "Hindi, English",
    styles: ["Muscle Gain", "Strength", "Endurance"],
    achievement: "",
    image: "images/Irfan shaikh .jpeg"
  },
  {
    id: "saurabh-jha",
    name: "Saurabh Jha",
    designation: "Certified Personal Trainer",
    experience: "5+ Years",
    specialization: ["Personal Training", "Strength", "General Fitness"],
    about: "Certified personal trainer dedicated to helping clients achieve their fitness goals through customised workout plans, proper technique, motivation, and consistent progress tracking.",
    certification: "Certified Personal Trainer",
    languages: "Hindi, English",
    styles: ["Personal Training", "Strength", "Fitness"],
    achievement: "",
    image: "images/saurabh jha.jpeg",
  }
];

const profileCard = document.getElementById('trainerProfileCard');

if (profileCard) {
  let activeTrainerIndex = 0;

  // Render Horizontal Selector Bar items
  const pickerContainer = document.getElementById('trainerPicker');
  if (pickerContainer) {
    trainersData.forEach((trainer, idx) => {
      const btn = document.createElement('div');
      btn.className = `trainer-picker-item ${idx === 0 ? 'active' : ''}`;
      btn.textContent = trainer.name;
      btn.addEventListener('click', () => {
        switchTrainer(idx);
      });
      pickerContainer.appendChild(btn);
    });
  }

  // Load profile details with CSS transition support
  function loadTrainer(idx) {
    const trainer = trainersData[idx];
    if (!trainer) return;

    // ---- TRAINER PHOTO / PLACEHOLDER TOGGLE ----
    const photoEl = document.getElementById('trainerPhoto');
    const placeholderEl = document.getElementById('trainerPhotoPlaceholder');
    if (photoEl && placeholderEl) {
      if (trainer.image) {
        // Automatically check if image path already has 'images/' prefix
        let imgSrc = trainer.image;
        if (!imgSrc.startsWith('images/')) {
          imgSrc = 'images/' + imgSrc;
        }
        photoEl.src = imgSrc;
        photoEl.alt = trainer.name;
        photoEl.style.display = 'block';
        placeholderEl.style.display = 'none';
      } else {
        photoEl.style.display = 'none';
        placeholderEl.style.display = 'block';
      }
    }

    // Direct Text Elements
    document.getElementById('trainerName').textContent = trainer.name;
    document.getElementById('trainerDesignation').textContent = trainer.designation;
    document.getElementById('trainerExperience').textContent = trainer.experience;
    document.getElementById('trainerCertification').textContent = trainer.certification;
    document.getElementById('trainerLanguages').textContent = trainer.languages;
    document.getElementById('trainerBio').textContent = trainer.about;

    // Achievement Block (Conditional)
    const achievementBlock = document.getElementById('trainerAchievementBlock');
    if (trainer.achievement) {
      document.getElementById('trainerAchievement').textContent = trainer.achievement;
      achievementBlock.style.display = 'block';
    } else {
      achievementBlock.style.display = 'none';
    }

    // Specializations tag elements
    const specContainer = document.getElementById('trainerSpecializations');
    specContainer.innerHTML = '';
    trainer.specialization.forEach(spec => {
      const span = document.createElement('span');
      span.textContent = spec;
      specContainer.appendChild(span);
    });

    // Training Styles tag elements
    const stylesContainer = document.getElementById('trainerStyles');
    stylesContainer.innerHTML = '';
    trainer.styles.forEach(style => {
      const span = document.createElement('span');
      span.textContent = style;
      stylesContainer.appendChild(span);
    });

    // Actions Button Links:
    // 1. Book Session: Pre-filled WhatsApp message
    const bookSessionBtn = document.getElementById('bookSessionBtn');
    const bookMsg = encodeURIComponent(`Hi Active Gym! I would like to book a session with coach ${trainer.name}.`);
    bookSessionBtn.href = `https://wa.me/919769055740?text=${bookMsg}`;

    // 2. Connect on WhatsApp: General connection message
    const whatsappBtn = document.getElementById('whatsappBtn');
    const connectMsg = encodeURIComponent(`Hi Active Gym! I want to connect with trainer ${trainer.name}.`);
    whatsappBtn.href = `https://wa.me/919769055740?text=${connectMsg}`;

    // Previous / Next labels sync
    const prevIdx = (idx - 1 + trainersData.length) % trainersData.length;
    const nextIdx = (idx + 1) % trainersData.length;

    document.getElementById('prevTrainerName').textContent = trainersData[prevIdx].name;
    document.getElementById('nextTrainerName').textContent = trainersData[nextIdx].name;

    // Sync active state class in horizontal selector
    const pickerItems = document.querySelectorAll('.trainer-picker-item');
    pickerItems.forEach((item, pIdx) => {
      if (pIdx === idx) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        item.classList.remove('active');
      }
    });

    // Sync browser history state
    const newUrl = `${window.location.pathname}?trainer=${trainer.id}`;
    window.history.pushState({ trainerId: trainer.id }, '', newUrl);
  }

  function switchTrainer(idx) {
    if (idx === activeTrainerIndex) return;

    // Apply fade-out
    profileCard.classList.add('fade-out');

    setTimeout(() => {
      activeTrainerIndex = idx;
      loadTrainer(idx);

      // Clear fade-out to trigger fade-in
      profileCard.classList.remove('fade-out');
    }, 250);
  }

  // Prev / Next Click Handlers
  document.getElementById('prevTrainerBtn').addEventListener('click', () => {
    const prevIdx = (activeTrainerIndex - 1 + trainersData.length) % trainersData.length;
    switchTrainer(prevIdx);
  });

  document.getElementById('nextTrainerBtn').addEventListener('click', () => {
    const nextIdx = (activeTrainerIndex + 1) % trainersData.length;
    switchTrainer(nextIdx);
  });

  // Handle URL params mapping
  function initTrainerFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const trainerParam = params.get('trainer');

    if (trainerParam) {
      const matchIdx = trainersData.findIndex(t => t.id === trainerParam);
      if (matchIdx !== -1) {
        activeTrainerIndex = matchIdx;
      }
    }
    loadTrainer(activeTrainerIndex);
  }

  initTrainerFromUrl();

  // Browser Navigation back/forward sync
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.trainerId) {
      const idx = trainersData.findIndex(t => t.id === event.state.trainerId);
      if (idx !== -1 && idx !== activeTrainerIndex) {
        activeTrainerIndex = idx;
        loadTrainer(idx);
      }
    }
  });
}

