document.addEventListener('DOMContentLoaded', function () {
    // Dynamic copyright year
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var toggle = document.querySelector('.mobile-toggle');
    var nav = document.querySelector('.nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            var isOpen = nav.classList.contains('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            if (isOpen) {
                var firstLink = nav.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            } else {
                toggle.focus();
            }
        });

        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(function (el, i) {
        el.style.transitionDelay = (window.innerWidth <= 768 ? i * 0.03 : i * 0.05) + 's';
        observer.observe(el);
    });

    document.querySelectorAll('.social-icon svg, .feature-icon svg, .contact-icon svg, .floating-call svg, .btn-call svg').forEach(function (icon) {
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('role', 'presentation');
    });

    var heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.innerWidth > 768) {
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    var scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        heroBg.style.transform = 'translateY(' + scrolled * 0.18 + 'px)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    ['contact-form-home', 'contact-form-page'].forEach(function (id) {
        var form = document.getElementById(id);
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Honeypot check: reject if the hidden field is filled
            var honeypot = form.querySelector('[name="website"]');
            if (honeypot && honeypot.value) return;
            var name = (form.querySelector('[name="name"]') || {}).value || '';
            var email = (form.querySelector('[name="email"]') || {}).value || '';
            var body = (form.querySelector('[name="body"]') || form.querySelector('[name="message"]') || {}).value || '';
            var subject = 'Ironside Epoxy — Website Contact from ' + (name || 'Visitor');
            var mailtoBody = 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + body;
            var mailtoUrl = 'mailto:ironsideepoxy@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);
            var existingNotice = form.querySelector('.form-feedback');
            if (!existingNotice) {
                existingNotice = document.createElement('p');
                existingNotice.className = 'form-feedback';
                form.appendChild(existingNotice);
            }
            existingNotice.setAttribute('role', 'status');
            existingNotice.setAttribute('aria-live', 'polite');
            existingNotice.textContent = 'Opening your email app with your message details. If nothing opens, use the direct email link below.';
            window.location.href = mailtoUrl;

            window.setTimeout(function () {
                existingNotice.innerHTML = 'If your email app did not open, <a href="' + mailtoUrl + '">click here to email ironsideepoxy@gmail.com</a>.';
            }, 1200);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
