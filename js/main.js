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
        this.setupWebflowFeatures();
        this.setupParallaxEffects();
        this.setupMicroInteractions();
        this.setupLoadingStates();
        this.setupAdvancedComponents();
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
     * Setup Webflow-style features
     */
    setupWebflowFeatures() {
        // Add stagger animations to cards
        this.setupStaggerAnimations();
        
        // Add reveal animations
        this.setupRevealAnimations();
        
        // Add counter animations
        this.setupCounterAnimations();
        
        // Add keyword highlighting
        this.setupKeywordHighlighting();
    }

    /**
     * Setup stagger animations for cards
     */
    setupStaggerAnimations() {
        const cardGroups = document.querySelectorAll('.specimen-card, .hover-lift');
        
        cardGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
            group.classList.add('stagger-animate');
        });
    }

    /**
     * Setup reveal animations
     */
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(element => revealObserver.observe(element));
    }

    /**
     * Setup counter animations
     */
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));

        // Setup performance bar animations
        this.setupPerformanceBars();
    }

    /**
     * Setup performance bar animations
     */
    setupPerformanceBars() {
        const performanceBars = document.querySelectorAll('.performance-bar');
        
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animatePerformanceBar(entry.target);
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        performanceBars.forEach(bar => barObserver.observe(bar));
    }

    /**
     * Animate performance bar
     */
    animatePerformanceBar(bar) {
        // Get the target width based on the data attribute or calculate from counter
        const parentItem = bar.closest('.performance-item');
        const counter = parentItem?.querySelector('.counter');
        let targetWidth = '100%';
        
        if (counter) {
            const target = parseFloat(counter.dataset.target);
            if (target === 187) targetWidth = '100%';
            else if (target === 101) targetWidth = '54%';
            else if (target === 54) targetWidth = '29%';
        }
        
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const widthValue = parseFloat(targetWidth);
            bar.style.width = `${progress * widthValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Animate counter numbers
     */
    animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = parseInt(element.dataset.duration) || 2000;
        const start = performance.now();
        
        // Determine formatting based on target value
        const isPercentage = target === 187;
        const isYear = target === 1952;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            let current = Math.floor(progress * target);
            let formattedText;
            
            if (isPercentage) {
                formattedText = `+${current}%`;
            } else if (isYear) {
                formattedText = current.toLocaleString();
            } else {
                formattedText = `${current}x`;
            }
            
            element.textContent = formattedText;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    /**
     * Setup keyword highlighting
     */
    setupKeywordHighlighting() {
        const highlightElements = document.querySelectorAll('.highlight-keywords');
        
        highlightElements.forEach(element => {
            const keywords = [
                'emerald', 'emeralds', 'colombian', 'muzo', 'chivor', 'coscuez',
                'investment', 'specimen', 'crystal', 'gemstone', 'precious',
                'rare', 'authentic', 'certified', 'museum', 'quality'
            ];
            
            let text = element.innerHTML;
            
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
                text = text.replace(regex, '<span class="gold-highlight">$1</span>');
            });
            
            element.innerHTML = text;
        });
    }

    /**
     * Setup parallax effects
     */
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        if (parallaxElements.length === 0) return;
        
        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleParallax(entry.target);
                }
            });
        });
        
        parallaxElements.forEach(element => {
            parallaxObserver.observe(element);
        });
    }

    /**
     * Handle parallax scrolling
     */
    handleParallax(element) {
        const speed = element.dataset.speed || 0.5;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            element.style.transform = `translateY(${rate}px)`;
        };
        
        window.addEventListener('scroll', this.throttle(updateParallax, 16));
    }

    /**
     * Setup micro-interactions
     */
    setupMicroInteractions() {
        // Add ripple effect to buttons
        this.setupRippleEffect();
        
        // Add magnetic hover effects
        this.setupMagneticHover();
        
        // Add cursor following effects
        this.setupCursorEffects();
    }

    /**
     * Setup ripple effect for buttons
     */
    setupRippleEffect() {
        const buttons = document.querySelectorAll('button, .btn, .private-viewing-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    /**
     * Setup magnetic hover effects
     */
    setupMagneticHover() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Setup cursor effects
     */
    setupCursorEffects() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--gold-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0.8;
        `;
        document.body.appendChild(cursor);
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .hoverable');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'var(--emerald-rich)';
                cursor.style.opacity = '1';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--gold-accent)';
                cursor.style.opacity = '0.8';
            });
        });

        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.8';
        });
    }

    /**
     * Setup loading states
     */
    setupLoadingStates() {
        // Add loading animation to images
        this.setupImageLoading();
        
        // Add skeleton screens
        this.setupSkeletonScreens();
    }

    /**
     * Setup image loading states
     */
    setupImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Convert to WebP if supported
            this.convertToWebP(img);
            
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
    }

    /**
     * Convert images to WebP format
     */
    convertToWebP(img) {
        // Check if WebP is supported
        if (!this.supportsWebP()) {
            return;
        }

        const originalSrc = img.src;
        const webpSrc = this.getWebPUrl(originalSrc);
        
        // Create a new image to test if WebP exists
        const webpTest = new Image();
        webpTest.onload = () => {
            img.src = webpSrc;
        };
        webpTest.onerror = () => {
            // WebP doesn't exist, keep original
            console.log('WebP not available for:', originalSrc);
        };
        webpTest.src = webpSrc;
    }

    /**
     * Check if browser supports WebP
     */
    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    /**
     * Generate WebP URL from original image URL
     */
    getWebPUrl(originalUrl) {
        // For your current setup, we'll use a service to convert images
        // You can replace this with your own image processing service
        if (originalUrl.includes('updatedcardscript.standard.us-east-1.oortstorages.com')) {
            // Use a WebP conversion service or your own CDN
            return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        return originalUrl;
    }

    /**
     * Generate WebP images using Canvas API
     */
    generateWebPFromCanvas(img) {
        if (!this.supportsWebP()) {
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        ctx.drawImage(img, 0, 0);
        
        // Convert to WebP
        canvas.toBlob((blob) => {
            if (blob) {
                const webpUrl = URL.createObjectURL(blob);
                img.src = webpUrl;
            }
        }, 'image/webp', 0.8);
    }

    /**
     * Setup skeleton screens
     */
    setupSkeletonScreens() {
        const skeletonElements = document.querySelectorAll('.skeleton');
        
        // Simulate loading
        setTimeout(() => {
            skeletonElements.forEach(element => {
                element.classList.add('loaded');
            });
        }, 2000);
    }

    /**
     * Setup advanced React-style components
     */
    setupAdvancedComponents() {
        // Initialize component manager if available
        if (window.ComponentManager) {
            this.componentManager = window.ComponentManager;
            this.setupInteractiveElements();
            this.setupComponentInstances();
        }
    }

    /**
     * Setup interactive elements with advanced functionality
     */
    setupInteractiveElements() {
        // Add interactive classes to existing elements
        const specimenCards = document.querySelectorAll('.specimen-card');
        specimenCards.forEach(card => {
            card.classList.add('interactive-card', 'hover-lift', 'ripple-effect');
        });

        const buttons = document.querySelectorAll('button, .btn, a[class*="btn"]');
        buttons.forEach(btn => {
            btn.classList.add('ripple-effect');
        });

        // Add magnetic effect to navigation items
        const navItems = document.querySelectorAll('nav a');
        navItems.forEach(item => {
            item.classList.add('magnetic');
        });
    }

    /**
     * Setup component instances
     */
    setupComponentInstances() {
        // Create interactive counters
        this.setupInteractiveCounters();
        
        // Create progress bars
        this.setupProgressBars();
        
        // Create tooltips
        this.setupTooltips();
        
        // Create accordions
        this.setupAccordions();
    }

    /**
     * Setup interactive counters with animations
     */
    setupInteractiveCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            // Create animated counter
            this.animateCounter(counter, target, duration);
        });
    }

    /**
     * Setup progress bars
     */
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.performance-bar');
        
        progressBars.forEach(bar => {
            const targetWidth = bar.dataset.width || '100%';
            
            // Animate progress bar
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
    }

    /**
     * Setup tooltips
     */
    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltipText = element.dataset.tooltip;
            element.classList.add('tooltip');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-content';
            tooltip.textContent = tooltipText;
            element.appendChild(tooltip);
        });
    }

    /**
     * Setup accordions
     */
    setupAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.accordion-content');
                
                // Toggle active state
                item.classList.toggle('active');
                
                // Animate content
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
        });
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
