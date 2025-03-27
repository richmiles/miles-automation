/**
 * Miles Automation Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation library
    AOS.init({
      duration: 800,
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
    
    // Typed.js effect for hero text (if available)
    const heroTextElement = document.querySelector('.hero-typing');
    if (heroTextElement && typeof Typed !== 'undefined') {
      new Typed(heroTextElement, {
        strings: ['AI Solutions', 'Developer Tools', 'LLM Integration', 'Agentic Systems'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 500,
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
    }, 800); // 800ms delay for smooth transition
  });

// Make sure the loading screen hides even if the full page load takes longer
window.addEventListener('load', function() {
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    pageTransition.classList.add('loaded');
    document.body.classList.add('page-loaded');
  }
});