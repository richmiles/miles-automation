/**
 * Miles Automation Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with performance optimization settings
  AOS.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    disable: 'mobile' // Disable animations on mobile devices
  });

  // Variables
  const header = document.getElementById('main-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const pageTransition = document.querySelector('.page-transition');

  // Debounce function to limit scroll event firing
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Throttle function for scroll event
  function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Header scroll effect - throttled
  const handleScroll = throttle(function() {
    // Use requestAnimationFrame for smoother UI updates
    window.requestAnimationFrame(function() {
      // Add/remove scrolled class to header
      if (window.scrollY > 50) {
        if (!header.classList.contains('scrolled')) {
          header.classList.add('scrolled');
        }
      } else {
        if (header.classList.contains('scrolled')) {
          header.classList.remove('scrolled');
        }
      }
  
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        if (!scrollToTopBtn.classList.contains('active')) {
          scrollToTopBtn.classList.add('active');
        }
      } else {
        if (scrollToTopBtn.classList.contains('active')) {
          scrollToTopBtn.classList.remove('active');
        }
      }
    });
  }, 100);

  // Passive scroll listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Scroll to top functionality
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Toggle mobile navigation
  function toggleMobileNav() {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  }

  // Close mobile nav when clicking on a link
  function closeNavOnClick() {
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  // Smooth scroll for anchor links
  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Close mobile menu after clicking a link
    closeNavOnClick();
  }

  // Add event listeners
  scrollToTopBtn.addEventListener('click', scrollToTop);
  navToggle.addEventListener('click', toggleMobileNav);

  // Add smooth scrolling to all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Typed.js effect for hero text with reduced complexity for mobile
  const heroTextElement = document.querySelector('.hero-typing');
  if (heroTextElement && typeof Typed !== 'undefined') {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    new Typed(heroTextElement, {
      strings: ['AI Solutions', 'Developer Tools', 'LLM Integration', 'Agentic Systems'],
      typeSpeed: isMobile ? 120 : 100,
      backSpeed: isMobile ? 30 : 20,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      loopCount: isMobile ? 2 : Infinity // Limit loops on mobile
    });
  }

  // Run initial scroll handler to set initial states
  handleScroll();

  // Hide loading spinner after a short delay
  setTimeout(function() {
    if (pageTransition) {
      pageTransition.classList.add('loaded');
      document.body.classList.add('page-loaded');
    }
  }, 800);

  // Lazy-load the animations for the Code Loom logo
  const codeLoomLogo = document.querySelector('.code-loom-logo');
  
  if (codeLoomLogo) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
            codeLoomLogo.classList.add('animate');
          });
  
          // If you only want the animation once, unobserve afterwards
          observer.unobserve(codeLoomLogo);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px 100px 0px' // Pre-load a bit before it comes into view
    });
  
    observer.observe(codeLoomLogo);
  }
});

// Ensure loader hides after full page load
window.addEventListener('load', function() {
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    pageTransition.classList.add('loaded');
    document.body.classList.add('page-loaded');
  }
});