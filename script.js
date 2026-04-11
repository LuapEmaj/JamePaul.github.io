(function() {
  // ---------- SPLASH TYPING EFFECT (MINIMAL & IMMERSIVE) ----------
  const splashGreetingEl = document.getElementById('splashGreeting');
  const enterBtn = document.getElementById('enterWebsiteBtn');
  const splashScreen = document.getElementById('splashScreen');
  const mainContent = document.getElementById('main-content');
  
  // The greeting message to type (ultra minimal)
  const greetingMessage = "Welcome, learn more.";
  let index = 0;
  
  function typeGreeting() {
    if (index < greetingMessage.length) {
      splashGreetingEl.textContent += greetingMessage.charAt(index);
      index++;
      setTimeout(typeGreeting, 100); // smooth typing speed
    } else {
      // Typing finished: show the button with fade-in
      setTimeout(() => {
        enterBtn.classList.add('visible-btn');
      }, 200);
    }
  }
  
  // Start typing when page loads
  typeGreeting();
  
  // ---------- TRANSITION TO MAIN WEBSITE ----------
  if (enterBtn && splashScreen && mainContent) {
    enterBtn.addEventListener('click', () => {
      splashScreen.classList.add('hide-splash');
      setTimeout(() => {
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => {
          updateActiveNav();
          const faders = document.querySelectorAll('.fade');
          faders.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
              el.classList.add('show');
            }
          });
        }, 100);
      }, 750);
    });
  }
  
  // ---------- SPOTLIGHT MAGNIFYING EFFECT ----------
  const spotlight = document.getElementById('spotlight');
  let mouseX = 0, mouseY = 0;
  let spotlightX = 0, spotlightY = 0;
  let rafId = null;
  
  function updateSpotlightPosition() {
    spotlight.style.transform = `translate3d(${spotlightX}px, ${spotlightY}px, 0)`;
  }
  
  function animateSpotlight() {
    spotlightX = mouseX;
    spotlightY = mouseY;
    updateSpotlightPosition();
    rafId = null;
  }
  
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(animateSpotlight);
    }
  }
  
  window.addEventListener('mousemove', onMouseMove);
  
  const interactiveElements = document.querySelectorAll('a, .btn, .project-card, .edu-card, .skill-tag, nav a, .enter-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => spotlight.classList.add('magnify'));
    el.addEventListener('mouseleave', () => spotlight.classList.remove('magnify'));
  });
  
  // ---------- TYPING EFFECT IN HERO (main content) ----------
  const phrases = [
    "engineering digital distinction",
    "crafting immersive futures",
    "where code meets elegance",
    "performance with soul"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById("typed-text");
  
  function typeEffect() {
    if (!typedTextSpan) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 200);
        return;
      }
      setTimeout(typeEffect, 50);
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 80);
    }
  }
  
  setTimeout(typeEffect, 500);
  
  // ---------- INTERSECTION OBSERVER FOR FADE-IN ----------
  const fadeElements = document.querySelectorAll('.fade');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
  
  fadeElements.forEach(el => fadeObserver.observe(el));
  
  // ---------- SCROLL SPY (ACTIVE NAV) ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 130;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSectionId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.substring(1);
      link.classList.remove('active-nav');
      if (href === currentSectionId) link.classList.add('active-nav');
      if (!currentSectionId && scrollPos < 120 && href === 'hero') link.classList.add('active-nav');
    });
  }
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateActiveNav();
  
  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        const offsetTop = targetElem.offsetTop - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
  
  // ---------- BUTTON INTERACTIONS ----------
  const heroBtn = document.getElementById('heroCta');
  const contactBtn = document.getElementById('contactBtn');
  const mainSiteBtn = document.getElementById('mainSiteBtn');
  const contactSection = document.getElementById('contact');
  
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = "mailto:jamepauljr@gmail.com?subject=Portfolio%20Collaboration%20Inquiry";
    });
  }
  
  if (mainSiteBtn) {
    mainSiteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Replace with your actual website URL
      window.location.href = "https://jamepaulsilmaro.com";
    });
  }
  
  const otherBtns = document.querySelectorAll('.btn:not(#heroCta):not(#contactBtn):not(#mainSiteBtn)');
  otherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = "mailto:jamepauljr@gmail.com?subject=Let's%20connect";
    });
  });
  
  // Ensure hero shows fade if main content appears after splash
  const heroSection = document.getElementById('hero');
  if (heroSection && heroSection.classList) heroSection.classList.add('show');
})();