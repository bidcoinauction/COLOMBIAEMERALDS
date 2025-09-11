/**
 * COLOMBIAEMERALDS.CA - Main JavaScript Functions
 * Standardized functions for all pages
 */

class ColombiaEmeraldsApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHeaderEffects();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupVideoHandling();
        this.setupPrivateViewingButtons();
        this.setupLazyLoading();
    }

    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animated-section, .fade-in-up');
        
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class for fade-in-up elements
                    if (entry.target.classList.contains('fade-in-up')) {
                        entry.target.classList.add('visible');
                    }
                    
                    // Handle animated-section elements
                    if (entry.target.classList.contains('animated-section')) {
                        entry.target.classList.add('fade-in-up');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => observer.observe(element));
    }

    /**
     * Setup header background effects on scroll
     */
    setupHeaderEffects() {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const navLinks = header.querySelectorAll('nav a');
            const logo = header.querySelector('a[href*="index"], a[href*="specimens"]');
            
            if (scrollY > 100) {
                // Add scrolled class for styling
                header.classList.add('scrolled');
                
                // Update background
                header.style.backgroundColor = 'rgba(10, 46, 27, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
                
                // Update text colors for better contrast
                if (logo) {
                    logo.style.color = 'white';
                }
                
                navLinks.forEach(link => {
                    // Keep active page in gold, others in white
                    if (link.classList.contains('font-medium') || link.style.color.includes('gold')) {
                        link.style.color = 'var(--gold-accent)';
                    } else {
                        link.style.color = 'white';
                    }
                });
            } else {
                // Remove scrolled class
                header.classList.remove('scrolled');
                
                // Reset to original styling
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.borderBottom = 'none';
                
                // Reset text colors to original
                if (logo) {
                    logo.style.color = '';
                }
                
                navLinks.forEach(link => {
                    link.style.color = '';
                });
            }
        });
    }

    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const menuToggleBtn = document.getElementById('menu-toggle-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuToggleBtn && mobileMenu) {
            menuToggleBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Update button icon
                const icon = menuToggleBtn.querySelector('svg');
                if (mobileMenu.classList.contains('hidden')) {
                    // Show hamburger icon
                    icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
                } else {
                    // Show close icon
                    icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
                }
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = menuToggleBtn.querySelector('svg');
                    icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
                });
            });
        }
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
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
    }

    /**
     * Setup form handling
     */
    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }

    /**
     * Handle form submission
     */
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            this.showNotification('Thank you for your interest. We will contact you within 24 hours to schedule your private consultation.', 'success');
            
            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    /**
     * Setup video handling for autoplay
     */
    setupVideoHandling() {
        const videos = document.querySelectorAll('video');
        
        if (videos.length === 0) return;

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(e => {
                        console.log('Autoplay was prevented:', e);
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            videoObserver.observe(video);
        });
    }

    /**
     * Setup private viewing buttons
     */
    setupPrivateViewingButtons() {
        const viewingButtons = document.querySelectorAll('.private-viewing-btn');
        viewingButtons.forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = 'contact.html';
            });
        });
    }

    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
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
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 transform translate-x-full`;
        
        // Set background color based on type
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.innerHTML = `
            <div class="flex items-center text-white">
                <span class="flex-1">${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Utility function to debounce function calls
     */
    debounce(func, wait) {
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

    /**
     * Utility function to throttle function calls
     */
    throttle(func, limit) {
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
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColombiaEmeraldsApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColombiaEmeraldsApp;
}
