// Navigation logic (Single Page Application)
function navigate(pageId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });
    // Remove active class from nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Show selected section
    const activeSection = document.getElementById(pageId);
    if (activeSection) activeSection.classList.add('active');
    
    // Highlight nav link
    const activeNav = document.getElementById(`nav-${pageId}`);
    if (activeNav) activeNav.classList.add('active');
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('nav-links');
    if (mobileMenu) mobileMenu.classList.remove('active');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.navigate = navigate;
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
    // Close on outside click
    document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    });
  }
  
  // Back to top button
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.style.display = 'flex';
    } else {
      backBtn.style.display = 'none';
    }
  });
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  backBtn.style.display = 'none';
  
  // Initialize Swiper Testimonials
  new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
    autoplay: { delay: 4000, disableOnInteraction: false },
    loop: true
  });
  
// Counter Animation with custom step for the 500 counter
const counters = document.querySelectorAll('.stat-number');

const startCounting = (el) => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  let start = 0;
  let step = 1;
  
  // Special handling for the 500 counter (Students Enrolled)
  if (target === 500) {
    start = 10;
    step = 10;
  }
  
  let current = start;
  // Increment until we reach or exceed target
  const updateCounter = () => {
    if (current < target) {
      current += step;
      if (current > target) current = target; // clamp
      el.innerText = current;
      requestAnimationFrame(updateCounter);
    } else {
      el.innerText = target;
    }
  };
  updateCounter();
};

// Intersection Observer to trigger counters when they become visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
      observer.unobserve(entry.target); // run only once
    }
  });
}, { threshold: 0.4 }); // slightly lower threshold for better mobile trigger

counters.forEach(counter => observer.observe(counter));
  
  // Ensure home is active on page load (if no hash)
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.page-section.active')) {
      navigate('home');
    }
  });