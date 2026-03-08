/**
 * DOT PORTAL — Warm Editorial
 * Theme toggle, scroll reveal, accordion, mobile nav
 */

document.addEventListener('DOMContentLoaded', init);

function init() {
    initTheme();
    initHeader();
    initMobileNav();
    initPhilosophy();
    initSmoothScroll();
    initScrollReveal();
    initFooterYear();
}

function initFooterYear() {
    const footerCopyright = document.querySelector('.footer-copyright');
    if (!footerCopyright) return;

    const year = new Date().getFullYear();
    footerCopyright.textContent = `© ${year} Dot Portal. Still here. Still building.`;
}

// === THEME TOGGLE ===
function initTheme() {
    const html   = document.documentElement;
    const toggle = document.getElementById('themeToggle');

    const saved       = localStorage.getItem('dp-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial     = saved || (prefersDark ? 'dark' : 'light');

    applyTheme(html, initial);
    updateToggleIcon(toggle, initial);

    toggle?.addEventListener('click', () => {
        const isDark   = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(html, newTheme);
        updateToggleIcon(toggle, newTheme);
        localStorage.setItem('dp-theme', newTheme);
        const mobileToggle = document.getElementById('mobileThemeToggle');
        if (mobileToggle) {
            updateToggleIcon(mobileToggle, newTheme);
            const span = mobileToggle.querySelector('span');
            if (span) span.textContent = newTheme === 'dark' ? 'Light mode' : 'Dark mode';
        }
    });
}

function applyTheme(html, theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
}

function updateToggleIcon(btn, theme) {
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        btn.setAttribute('aria-label', 'Switch to light theme');
    } else {
        icon.className = 'fas fa-moon';
        btn.setAttribute('aria-label', 'Switch to dark theme');
    }
}

// === HEADER SCROLL EFFECT ===
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    const handle = () => header.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', handle, { passive: true });
    handle();
}

// === MOBILE NAVIGATION ===
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    if (!toggle) return;
    let isOpen = false;

    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const moonOrSun    = currentTheme === 'dark' ? 'fa-sun' : 'fa-moon';
    const themeLabel   = currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    const themeTxt     = currentTheme === 'dark' ? 'Light mode' : 'Dark mode';

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-modal', 'true');
    mobileMenu.innerHTML = `
        <a href="#products"   class="nav-link">Products</a>
        <a href="#philosophy" class="nav-link">Philosophy</a>
        <a href="#contact"    class="nav-link">Get in touch</a>
        <div class="mobile-menu-footer">
            <button class="mobile-theme-toggle" id="mobileThemeToggle" aria-label="${themeLabel}">
                <i class="fas ${moonOrSun}"></i>
                <span>${themeTxt}</span>
            </button>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    mobileMenu.querySelector('#mobileThemeToggle')?.addEventListener('click', () => {
        document.getElementById('themeToggle')?.click();
    });

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        toggle.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isOpen) closeMenu();
    });

    function closeMenu() {
        isOpen = false;
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
    }
}

// === PHILOSOPHY ACCORDION ===
function initPhilosophy() {
    const items = document.querySelectorAll('.philosophy-item');
    if (!items.length) return;

    function setItemExpanded(item, expanded) {
        const content = item.querySelector('.philosophy-content');
        if (!content) return;

        if (expanded) {
            item.classList.add('active');
            content.style.maxHeight = `${content.scrollHeight}px`;
        } else {
            item.classList.remove('active');
            content.style.maxHeight = '0px';
        }
    }

    // Sync inline max-heights with any pre-existing active state.
    items.forEach(item => {
        setItemExpanded(item, item.classList.contains('active'));
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(i => setItemExpanded(i, false));
            if (!isActive) setItemExpanded(item, true);
        });

        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    window.addEventListener('resize', () => {
        items.forEach(item => {
            if (item.classList.contains('active')) {
                setItemExpanded(item, true);
            }
        });
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const header = document.getElementById('header');
            const headerH = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

// === SCROLL REVEAL (IntersectionObserver) ===
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}
