// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAccordion();
    initCopyToClipboard();
    initAnimations();
    initTypingEffect();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const sideNavLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Handle side navigation clicks
    sideNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                scrollToSection(targetSection);
                updateActiveNavLink(this, sideNavLinks);
            }
        });
    });
    
    // Handle mobile navigation clicks
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                scrollToSection(targetSection);
                updateActiveNavLink(this, mobileNavLinks);
                closeMobileMenu();
            }
        });
    });
    
    // Handle mobile menu toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    // Handle logo clicks
    const logos = document.querySelectorAll('.logo, .mobile-logo');
    logos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            const heroSection = document.querySelector('#hero');
            if (heroSection) {
                scrollToSection(heroSection);
                const firstNavLink = document.querySelector('.nav-link[href="#hero"], .mobile-nav-link[href="#hero"]');
                if (firstNavLink) {
                    updateActiveNavLink(firstNavLink, 
                        firstNavLink.classList.contains('nav-link') ? sideNavLinks : mobileNavLinks
                    );
                }
            }
        });
    });
}

function scrollToSection(targetSection) {
    const offsetTop = targetSection.offsetTop;
    const isMobile = window.innerWidth <= 1024;
    const offset = isMobile ? 70 : 0; // Account for mobile nav height
    
    window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
    });
}

function updateActiveNavLink(activeLink, allLinks) {
    allLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    
    if (mobileMenu && mobileNavToggle) {
        mobileMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    
    if (mobileMenu && mobileNavToggle) {
        mobileMenu.classList.remove('active');
        mobileNavToggle.classList.remove('active');
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', throttle(handleScroll, 16));
    
    // Initial check
    handleScroll();
}

function handleScroll() {
    updateActiveSection();
    handleScrollAnimations();
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset;
    const isMobile = window.innerWidth <= 1024;
    const offset = isMobile ? 100 : 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sideNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            const mobileNavLink = document.querySelector(`.mobile-nav-link[href="#${sectionId}"]`);
            
            // Update side nav
            if (sideNavLink) {
                const allSideNavLinks = document.querySelectorAll('.nav-link');
                updateActiveNavLink(sideNavLink, allSideNavLinks);
            }
            
            // Update mobile nav
            if (mobileNavLink) {
                const allMobileNavLinks = document.querySelectorAll('.mobile-nav-link');
                updateActiveNavLink(mobileNavLink, allMobileNavLinks);
            }
        }
    });
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.product-card, .accordion-item');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== ACCORDION FUNCTIONALITY =====
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const isActive = this.classList.contains('active');
            
            // Close all accordion items
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                const contentId = h.getAttribute('data-target');
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.remove('active');
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive && targetContent) {
                this.classList.add('active');
                targetContent.classList.add('active');
            }
        });
    });
    
    // Open first accordion item by default
    const firstAccordionHeader = document.querySelector('.accordion-header');
    if (firstAccordionHeader) {
        firstAccordionHeader.click();
    }
}

// ===== COPY TO CLIPBOARD =====
function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const textToCopy = this.getAttribute('data-copy');
            
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern clipboard API
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyFeedback(this);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    fallbackCopyTextToClipboard(textToCopy, this);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(textToCopy, this);
            }
        });
    });
}

function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(button);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(button) {
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = originalIcon;
        button.style.backgroundColor = '';
    }, 2000);
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.product-card, .accordion-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animations on scroll
    handleScrollAnimations();
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;
    
    const text = heroTitle.getAttribute('data-text');
    if (!text) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Show text immediately without typing effect
        heroTitle.textContent = text;
        heroTitle.classList.add('typing-complete');
        return;
    }
    
    // Clear the initial text and add typing class
    heroTitle.textContent = '';
    heroTitle.classList.add('typing');
    
    let charIndex = 0;
    const baseTypingSpeed = 85; // Base milliseconds per character (slower than before)
    
    function typeChar() {
        if (charIndex < text.length) {
            const currentChar = text.charAt(charIndex);
            heroTitle.textContent += currentChar;
            charIndex++;
            
            // Add slight variation in typing speed for more natural feel
            let speed = baseTypingSpeed;
            
            // Slower for punctuation and end of sentences
            if (currentChar === '.' || currentChar === ',' || currentChar === '!') {
                speed = baseTypingSpeed * 2.5;
            }
            // Pause slightly after spaces (between words)
            else if (currentChar === ' ') {
                speed = baseTypingSpeed * 1.3;
            }
            // Add small random variation
            else {
                speed = baseTypingSpeed + (Math.random() * 25 - 12);
            }
            
            setTimeout(typeChar, Math.max(speed, 20));
        } else {
            // Typing complete, remove cursor after a short delay
            setTimeout(() => {
                heroTitle.classList.remove('typing');
                heroTitle.classList.add('typing-complete');
            }, 1500);
        }
    }
    
    // Start typing after a short delay to ensure everything is loaded
    setTimeout(typeChar, 1000);
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
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

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
    
    // Recalculate scroll positions
    updateActiveSection();
}, 250));

// ===== SMOOTH SCROLL FOR ARROW =====
document.addEventListener('click', function(e) {
    if (e.target.closest('.scroll-indicator')) {
        e.preventDefault();
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            scrollToSection(productsSection);
        }
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Handle Enter key for accordion headers
    if (e.key === 'Enter' && e.target.classList.contains('accordion-header')) {
        e.target.click();
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Add ARIA labels and roles
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header, index) => {
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');
        
        const targetId = header.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.setAttribute('role', 'region');
            targetContent.setAttribute('aria-labelledby', `accordion-header-${index}`);
            header.setAttribute('id', `accordion-header-${index}`);
        }
    });
    
    // Update aria-expanded when accordion is toggled
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('accordion-header')) {
            const isActive = e.target.classList.contains('active');
            e.target.setAttribute('aria-expanded', isActive.toString());
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images when they come into viewport
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);
