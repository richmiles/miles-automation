/**
 * Miles Automation Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with calmer duration
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Variables
    const header = document.getElementById('main-header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const pageTransition = document.querySelector('.page-transition');
  
    // Header scroll effect
    function handleScroll() {
      // Add/remove scrolled class to header
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
  
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('active');
      } else {
        scrollToTopBtn.classList.remove('active');
      }
    }
  
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
    }
  
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    navToggle.addEventListener('click', toggleMobileNav);
  
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });
  
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeNavOnClick);
    });
  
    // Typed.js effect for hero text (MODIFIED: significantly slower typing)
    const heroTextElement = document.querySelector('.hero-typing');
    if (heroTextElement && typeof Typed !== 'undefined') {
      new Typed(heroTextElement, {
        strings: ['AI Solutions', 'Developer Tools', 'LLM Integration', 'Agentic Systems'],
        typeSpeed: 100,        // Increased from 60 to 100
        backSpeed: 20,         // Decreased from 30 to 20
        backDelay: 2000,       // Increased from 1000 to 2000
        startDelay: 500,       // Increased from 300 to 500
        loop: true
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
  
  });
  
  // Ensure loader hides after full page load
  window.addEventListener('load', function() {
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
      pageTransition.classList.add('loaded');
      document.body.classList.add('page-loaded');
    }
  });

  // Grab the container of the Code Loom logo
const codeLoomLogo = document.querySelector('.code-loom-logo');

if (codeLoomLogo) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the .animate class to trigger the lines' fade-in
        codeLoomLogo.classList.add('animate');

        // If you only want the animation once, unobserve afterwards:
        observer.unobserve(codeLoomLogo);
      }
    });
  }, {
    threshold: 0.3 // Adjust this threshold as desired (0.0 - 1.0)
  });

  observer.observe(codeLoomLogo);
}
