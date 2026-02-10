// Scroll Reveal Animations - Refined
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-refined');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        const navLinks = nav.querySelectorAll('.nav-link-refined');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Intersection Observer for scroll reveals (faster trigger)
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el, index) => {
        // Stagger animations (faster)
        const isMobile = window.innerWidth <= 768;
        el.style.transitionDelay = isMobile ? `${index * 0.02}s` : `${index * 0.03}s`;
        observer.observe(el);
    });

    // Parallax effect for hero background (subtle, disabled on mobile for performance)
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg && window.innerWidth > 768) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.2;
                    if (scrolled < window.innerHeight) {
                        heroBg.style.transform = `translateY(${rate}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Contact form (home + contact page): send via mailto with name, email, message
    const contactForm = document.getElementById('contact-form-home') || document.getElementById('contact-form-page');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = (this.querySelector('[name="name"]') || {}).value || '';
            const email = (this.querySelector('[name="email"]') || {}).value || '';
            const body = (this.querySelector('[name="body"]') || this.querySelector('[name="message"]') || {}).value || '';
            const subject = 'Ironside Epoxy - Website Contact from ' + (name || 'Visitor');
            const mailtoBody = 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + body;
            const mailto = 'mailto:ironsideepoxy@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);
            window.location.href = mailto;
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to hero elements (faster)
    const heroElements = document.querySelectorAll('.fade-in-up');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

