/* Lunge- og Allergiklinikken Aabenraa — site interactions */
(function () {
    'use strict';

    // Opening hours (0 = søndag). Keep in sync with the tables in index.html.
    const CLINIC = { days: [2, 3, 4], open: 7 * 60 + 30, close: 17 * 60 };
    const PHONE  = { days: [2, 3, 4, 5], open: 9 * 60, close: 11 * 60 };

    // Current time in Denmark, regardless of the visitor's own timezone
    function nowInDenmark() {
        const parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Copenhagen', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
        }).formatToParts(new Date());
        const get = (t) => parts.find((p) => p.type === t).value;
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
        return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
    }

    const isOpen = (s, t) => s.days.includes(t.day) && t.minutes >= s.open && t.minutes < s.close;

    function updateStatus() {
        const t = nowInDenmark();

        const pill = document.getElementById('clinicStatus');
        if (pill) {
            const open = isOpen(CLINIC, t);
            pill.dataset.state = open ? 'open' : 'closed';
            pill.textContent = open ? 'Åben nu · lukker 17.00' : 'Lukket nu';
        }

        const phone = document.getElementById('phoneStatus');
        if (phone) {
            phone.textContent = isOpen(PHONE, t)
                ? 'Telefonen er åben nu – ring på 74 63 05 00.'
                : '';
        }

        document.querySelectorAll('#openingHours tr[data-days]').forEach((row) => {
            row.classList.toggle('today', row.dataset.days.split(',').map(Number).includes(t.day));
        });
    }
    updateStatus();
    setInterval(updateStatus, 60 * 1000);

    // Footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Header border on scroll
    const header = document.getElementById('header');
    const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Load Google Maps only when the visitor asks for it (no third-party cookies by default)
    const loadMap = document.getElementById('loadMap');
    if (loadMap) {
        loadMap.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.title = 'Kort over klinikken';
            iframe.src = 'https://maps.google.com/maps?q=Opn%C3%B8rplads%203%2C%206200%20Aabenraa&z=15&output=embed';
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            document.getElementById('map').replaceChildren(iframe);
        });
    }

    // Highlight the nav link for the section in view
    const navLinks = document.querySelectorAll('.nav-links a');
    if ('IntersectionObserver' in window && navLinks.length) {
        const byId = new Map([...navLinks].map((a) => [a.hash.slice(1), a]));
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                const link = byId.get(e.target.id);
                if (link && e.isIntersecting) {
                    navLinks.forEach((a) => a.removeAttribute('aria-current'));
                    link.setAttribute('aria-current', 'true');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach((el, i) => {
            el.style.transitionDelay = (i % 4) * 70 + 'ms';
            io.observe(el);
        });
    } else {
        reveals.forEach((el) => el.classList.add('in'));
    }
})();
