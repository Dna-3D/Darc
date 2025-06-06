// Enhanced JavaScript for DARC OMNIVERSE website
class DarcOmniverse {
    constructor() {
        this.init();
        this.bindEvents();
        this.initAnimations();
        this.initPerformanceOptimizations();
    }

    init() {
        // Initialize core functionality
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.backToTopButton = document.getElementById('back-to-top');
        this.contactForm = document.getElementById('contact-form');
        this.loader = document.getElementById('loader');
        
        // Performance tracking
        this.scrollTicking = false;
        this.resizeTicking = false;
        
        // Initialize intersection observer for animations
        this.initIntersectionObserver();
        
        // Hide loader when DOM is ready
        this.hideLoader();
    }

    bindEvents() {
        // Navigation events
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavLinkClick(e);
                this.closeMobileMenu();
            });
        });

        // Scroll events (throttled)
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Resize events (throttled)
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
        
        // Back to top button
        this.backToTopButton?.addEventListener('click', () => this.scrollToTop());
        
        // Contact form
        this.contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Click tracking for analytics
        this.initClickTracking();
        
        // Preload critical images
        this.preloadImages();
    }

    initAnimations() {
        // Initialize GSAP-like animations using vanilla JS
        this.animateOnScroll();
        
        // Hero section animations
        this.animateHeroElements();
        
        // Floating cards animation
        this.animateFloatingCards();
        
        // Particle effect for hero background
        this.initParticleEffect();
    }

    initIntersectionObserver() {
        // Intersection Observer for scroll animations
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all animated elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            this.observer.observe(el);
        });

        // Observe cards for animation
        document.querySelectorAll('.product-card, .pricing-card, .course-card, .vision-card').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-aos') || 'fade-up';
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('aos-animate');
        }, delay);
    }

    initPerformanceOptimizations() {
        // Set initial styles for animated elements
        document.querySelectorAll('[data-aos], .product-card, .pricing-card, .course-card, .vision-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Ensure images are always visible
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '1';
            img.style.display = 'block';
        });

        // Lazy load images
        this.initLazyLoading();
        
        // Prefetch critical resources
        this.prefetchResources();
    }

    // Navigation Methods
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = this.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                this.smoothScrollTo(targetPosition);
            }
        } else {
            // External link
            window.location.href = targetId;
        }
        
        this.updateActiveNavLink(targetId);
    }

    updateActiveNavLink(targetId = null) {
        if (!targetId) {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + this.navbar.offsetHeight + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    targetId = `#${sectionId}`;
                }
            });
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Scroll Methods
    handleScroll() {
        if (!this.scrollTicking) {
            requestAnimationFrame(() => {
                this.updateNavbarBackground();
                this.updateBackToTopButton();
                this.updateActiveNavLink();
                this.handleParallaxEffect();
                this.scrollTicking = false;
            });
            this.scrollTicking = true;
        }
    }

    updateNavbarBackground() {
        const scrolled = window.scrollY > 100;
        this.navbar.style.background = scrolled 
            ? 'hsl(var(--background-light) / 0.98)' 
            : 'hsl(var(--background-light) / 0.95)';
        
        this.navbar.style.backdropFilter = scrolled ? 'blur(20px)' : 'blur(10px)';
    }

    updateBackToTopButton() {
        if (window.scrollY > 500) {
            this.backToTopButton?.classList.add('visible');
        } else {
            this.backToTopButton?.classList.remove('visible');
        }
    }

    scrollToTop() {
        this.smoothScrollTo(0);
    }

    smoothScrollTo(target) {
        const startPosition = window.pageYOffset;
        const distance = target - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Animation Methods
    animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .pricing-card, .course-card, .vision-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animate-in');
            }
        });
    }

    animateHeroElements() {
        const heroElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    animateFloatingCards() {
        const cards = document.querySelectorAll('.floating-cards .card');
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * -2}s`;
            card.classList.add('animate-float');
        });
    }

    initParticleEffect() {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) return;

        // Create animated particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: hsl(var(--primary-color) / 0.3);
                border-radius: 50%;
                animation: float-particle ${5 + Math.random() * 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particleContainer.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                50% { transform: translateY(-40px) translateX(-5px); opacity: 0.3; }
                75% { transform: translateY(-20px) translateX(-10px); opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }

    handleParallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // Form Handling
    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Validate form
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Create mailto link
        const subject = `Inquiry about ${service} - ${name}`;
        const body = `Name: ${name}%0AEmail: ${email}%0AService: ${service}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
        const mailtoLink = `mailto:darcomniverse@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // WhatsApp link
        const whatsappMessage = `Hi, I'm ${name}. I'm interested in ${service}. ${message}`;
        const whatsappLink = `https://wa.me/2348082610560?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open email client
        window.open(mailtoLink, '_blank');
        
        // Ask for WhatsApp
        setTimeout(() => {
            if (confirm('Would you also like to send this message via WhatsApp?')) {
                window.open(whatsappLink, '_blank');
            }
        }, 1000);
        
        // Reset form and show success
        this.contactForm.reset();
        this.showNotification('Message sent successfully! Please check your email client.', 'success');
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'hsl(var(--success-color))' : type === 'error' ? 'hsl(var(--error-color))' : 'hsl(var(--primary-color))'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: var(--transition);
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
                if (style.parentNode) {
                    document.head.removeChild(style);
                }
            }, 300);
        }, 5000);
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadImages() {
        const criticalImages = [
            'attached_assets/logo.png',
            'attached_assets/favicon.png',
            'attached_assets/darc-desc.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    prefetchResources() {
        // Prefetch blog page
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'blog.html';
        document.head.appendChild(link);
    }

    initClickTracking() {
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', () => {
                const section = button.closest('section')?.id || 'unknown';
                const buttonText = button.textContent.trim();
                this.trackEvent('button_click', {
                    section: section,
                    button: buttonText
                });
            });
        });
    }

    trackEvent(eventName, properties) {
        // Analytics tracking (placeholder for future implementation)
        console.log(`Event: ${eventName}`, properties);
        
        // Example: Send to analytics service
        // analytics.track(eventName, properties);
    }

    handleKeyboard(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
        
        // Space or Enter on focused buttons
        if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('btn')) {
            e.preventDefault();
            e.target.click();
        }
    }

    handleResize() {
        if (!this.resizeTicking) {
            requestAnimationFrame(() => {
                // Handle responsive changes
                if (window.innerWidth > 768 && this.navMenu.classList.contains('active')) {
                    this.closeMobileMenu();
                }
                this.resizeTicking = false;
            });
            this.resizeTicking = true;
        }
    }

    hideLoader() {
        if (this.loader) {
            // Hide loader when page is ready
            const hideLoaderFn = () => {
                this.loader.style.opacity = '0';
                setTimeout(() => {
                    this.loader.style.display = 'none';
                }, 300);
            };

            // Hide loader on page load or after 3 seconds (whichever comes first)
            if (document.readyState === 'complete') {
                setTimeout(hideLoaderFn, 500);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(hideLoaderFn, 500);
                });
                
                // Fallback
                setTimeout(hideLoaderFn, 3000);
            }
        }
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(amount);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    };
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Future: Send error reports to logging service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Future: Send error reports to logging service
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Future: Register service worker for offline functionality
        console.log('Service Worker support detected - ready for PWA features');
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarcOmniverse();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarcOmniverse;
}
