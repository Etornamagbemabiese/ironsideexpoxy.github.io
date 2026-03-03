document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.mobile-toggle');
    var nav = document.querySelector('.nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
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
        });
    }

    ['contact-form-home', 'contact-form-page'].forEach(function (id) {
        var form = document.getElementById(id);
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = (form.querySelector('[name="name"]') || {}).value || '';
            var email = (form.querySelector('[name="email"]') || {}).value || '';
            var body = (form.querySelector('[name="body"]') || form.querySelector('[name="message"]') || {}).value || '';
            var subject = 'Ironside Epoxy — Website Contact from ' + (name || 'Visitor');
            var mailtoBody = 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + body;
            window.location.href = 'mailto:ironsideepoxy@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
