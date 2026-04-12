// Enhanced JavaScript with smooth scroll, scroll-spy active link, touch support and better performance

(function () {
  // DOM Elements
  const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
  const mobileMenu = document.querySelector('.header .nav-bar .nav-list ul');
  const menuItems = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
  const header = document.querySelector('.header.container');
  const sections = document.querySelectorAll('section');

  // Helper: toggle hamburger + menu
  function toggleMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    // Prevent body scroll when menu is open (improve UX)
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  // Close menu when a link is clicked
  function closeMenuOnLinkClick() {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Event listeners for hamburger
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    // Accessibility: allow Enter key
    hamburger.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // Close menu on each menu item click (with smooth scroll offset)
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Get target section id from href
      const targetId = item.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Smooth scroll with offset for fixed header
          const offsetTop = targetElement.offsetTop - 70; // 70px offset for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          // Update URL without jumping (optional)
          history.pushState(null, null, targetId);
        }
      }
      closeMenuOnLinkClick();
    });
  });

  // Scroll event: change header background + active nav link (scroll spy)
  function handleScroll() {
    // Change header background after scroll
    if (header) {
      const scrollPos = window.scrollY;
      if (scrollPos > 80) {
        header.style.backgroundColor = '#1e1e2a';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        header.style.backgroundColor = 'rgba(31, 30, 30, 0.24)';
        header.style.boxShadow = 'none';
      }
    }

    // Scroll spy: highlight active menu item based on visible section
    let current = '';
    const scrollPosition = window.scrollY + 150; // offset for better accuracy

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    menuItems.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1); // remove #
      if (href === current) {
        link.classList.add('active');
        // optional: change style
        link.style.color = '#e63946';
      } else {
        link.style.color = '';
      }
    });
  }

  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Run once on load
  window.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    // Fix initial active link if hash exists
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // Close mobile menu on window resize (if open)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200 && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMenuOnLinkClick();
    }
  });

  // Touch-friendly: close menu on tapping outside (for mobile)
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      const isClickInsideMenu = mobileMenu.contains(e.target);
      const isHamburger = hamburger && hamburger.contains(e.target);
      if (!isClickInsideMenu && !isHamburger) {
        closeMenuOnLinkClick();
      }
    }
  });

  // Prevent scroll chaining when menu is open on touch devices
  if (mobileMenu) {
    mobileMenu.addEventListener('touchmove', (e) => {
      if (mobileMenu.classList.contains('active')) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Optional: add active class styling in CSS for current menu item
  // we already set color inline, but you can also add class .active-link
})();