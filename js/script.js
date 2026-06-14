/* ============================================
   TM FALCO - Modern Website Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Loader ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  });
  // Fallback: hide loader after 3s even if load event already fired
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);

  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  const headerMain = document.querySelector('.header-main');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      headerMain.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
    } else {
      headerMain.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }

    lastScroll = scrollY;
  });

  // ---- Mobile menu ----
  const menuToggle = document.getElementById('menuToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

  function openMobileNav() {
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileNav);
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileNav);
  }
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) closeMobileNav();
    });
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ---- Hero Slideshow ----
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  function nextSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }

  if (heroSlides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  // ---- Typewriter Effect ----
  const typewriteEl = document.querySelector('.typewrite');
  if (typewriteEl) {
    const words = JSON.parse(typewriteEl.getAttribute('data-typewrite'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriteEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriteEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();
  }

  // ---- Scroll to top ----
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header-main').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ---- Intersection Observer for fade-up animations ----
  const fadeElements = document.querySelectorAll(
    '.service-card, .detail-card, .reassurance-item, .cert-content, .contact-grid, .zone-list'
  );

  fadeElements.forEach(el => el.classList.add('fade-up'));

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !service) {
        alert('Veuillez remplir les champs obligatoires.');
        return;
      }

      // Simulate form submission
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      setTimeout(() => {
        alert(`Merci ${name} ! Votre demande a bien été envoyée. Nous vous contacterons rapidement.`);
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  // ---- Parallax effect for hero (subtle) ----
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    });
  }

  // ---- Service card stagger animation ----
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // ---- Detail card stagger animation ----
  const detailCards = document.querySelectorAll('.detail-card');
  detailCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // ---- Reassurance item stagger animation ----
  const reassuranceItems = document.querySelectorAll('.reassurance-item');
  reassuranceItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;
  });

  // ---- Zone tag stagger animation ----
  const zoneTags = document.querySelectorAll('.zone-tag');
  zoneTags.forEach((tag, index) => {
    tag.style.transitionDelay = `${index * 0.05}s`;
  });

});
