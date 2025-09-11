// Advanced React-style Components for COLOMBIAEMERALDS
class ComponentManager {
    constructor() {
        this.components = new Map();
        this.state = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupStateManagement();
        this.setupComponentRegistry();
        this.setupAdvancedAnimations();
        this.setupInteractiveElements();
    }

    // State Management System
    setupStateManagement() {
        this.state.set('currentPage', window.location.pathname);
        this.state.set('userPreferences', {
            theme: 'luxury',
            animations: true,
            sound: false
        });
        this.state.set('cart', []);
        this.state.set('favorites', []);
    }

    // Component Registry
    setupComponentRegistry() {
        this.registerComponent('InteractiveCard', this.createInteractiveCard);
        this.registerComponent('Modal', this.createModal);
        this.registerComponent('Carousel', this.createCarousel);
        this.registerComponent('Accordion', this.createAccordion);
        this.registerComponent('Tabs', this.createTabs);
        this.registerComponent('Counter', this.createCounter);
        this.registerComponent('ProgressBar', this.createProgressBar);
        this.registerComponent('Tooltip', this.createTooltip);
    }

    registerComponent(name, factory) {
        this.components.set(name, factory);
    }

    // Advanced Animation System
    setupAdvancedAnimations() {
        // Stagger animations for lists
        this.setupStaggerAnimations();
        
        // Parallax effects
        this.setupParallaxEffects();
        
        // Morphing transitions
        this.setupMorphingTransitions();
        
        // Loading states
        this.setupLoadingStates();
    }

    setupStaggerAnimations() {
        const staggerElements = document.querySelectorAll('.stagger-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        });

        staggerElements.forEach(el => observer.observe(el));
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${rate * speed}px)`;
            });
        }, 16));
    }

    setupMorphingTransitions() {
        // Page transition system
        this.setupPageTransitions();
        
        // Element morphing
        this.setupElementMorphing();
    }

    setupPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Create transition overlay
                const overlay = this.createTransitionOverlay();
                document.body.appendChild(overlay);
                
                // Animate out
                overlay.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        });
    }

    createTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-logo">COLOMBIAEMERALDS.CA</div>
                <div class="transition-spinner"></div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--emerald-deep), var(--emerald-rich));
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .page-transition-overlay.active {
                opacity: 1;
            }
            
            .transition-content {
                text-align: center;
                color: white;
            }
            
            .transition-logo {
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                letter-spacing: 0.2em;
                margin-bottom: 2rem;
                opacity: 0.9;
            }
            
            .transition-spinner {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top: 2px solid var(--gold-accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        return overlay;
    }

    setupElementMorphing() {
        // Morphing between different states
        const morphElements = document.querySelectorAll('.morph-element');
        
        morphElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('morph-active');
            });
            
            el.addEventListener('mouseleave', () => {
                el.classList.remove('morph-active');
            });
        });
    }

    setupLoadingStates() {
        // Skeleton loading for images
        this.setupSkeletonLoading();
        
        // Progressive loading
        this.setupProgressiveLoading();
    }

    setupSkeletonLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            const skeleton = this.createSkeleton(img);
            img.parentNode.insertBefore(skeleton, img);
            
            img.addEventListener('load', () => {
                skeleton.remove();
                img.classList.add('loaded');
            });
        });
    }

    createSkeleton(element) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-loader';
        skeleton.style.cssText = `
            width: ${element.offsetWidth || '100%'};
            height: ${element.offsetHeight || '200px'};
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 8px;
        `;
        return skeleton;
    }

    // Interactive Elements
    setupInteractiveElements() {
        this.setupInteractiveCards();
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupGestureSupport();
    }

    setupInteractiveCards() {
        const cards = document.querySelectorAll('.interactive-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCard(card, 'leave');
            });
        });
    }

    animateCard(card, direction) {
        const isEnter = direction === 'enter';
        
        if (isEnter) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }
    }

    setupHoverEffects() {
        // Magnetic hover effect
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupClickEffects() {
        // Ripple effect
        const rippleElements = document.querySelectorAll('.ripple-effect');
        
        rippleElements.forEach(el => {
            el.addEventListener('click', (e) => {
                this.createRipple(e, el);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupGestureSupport() {
        // Swipe gestures for mobile
        let startX, startY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 50) {
                    this.handleSwipe('left');
                } else if (diffX < -50) {
                    this.handleSwipe('right');
                }
            }
            
            startX = null;
            startY = null;
        });
    }

    handleSwipe(direction) {
        // Handle swipe gestures
        console.log(`Swipe ${direction} detected`);
    }

    // Component Factories
    createInteractiveCard(config) {
        const card = document.createElement('div');
        card.className = 'interactive-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${config.title}</h3>
                <div class="card-icon">${config.icon}</div>
            </div>
            <div class="card-content">
                <p>${config.content}</p>
            </div>
            <div class="card-actions">
                <button class="btn-primary">Learn More</button>
            </div>
        `;
        return card;
    }

    createModal(config) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${config.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${config.content}
                </div>
            </div>
        `;
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }

    createCarousel(config) {
        const carousel = document.createElement('div');
        carousel.className = 'carousel-container';
        carousel.innerHTML = `
            <div class="carousel-track">
                ${config.items.map(item => `
                    <div class="carousel-item">
                        <img src="${item.image}" alt="${item.alt}">
                        <div class="carousel-caption">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-prev">&lt;</button>
            <button class="carousel-next">&gt;</button>
        `;
        
        return carousel;
    }

    createAccordion(config) {
        const accordion = document.createElement('div');
        accordion.className = 'accordion';
        accordion.innerHTML = config.items.map(item => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <h3>${item.title}</h3>
                    <span class="accordion-icon">+</span>
                </div>
                <div class="accordion-content">
                    <p>${item.content}</p>
                </div>
            </div>
        `).join('');
        
        return accordion;
    }

    createTabs(config) {
        const tabs = document.createElement('div');
        tabs.className = 'tabs-container';
        tabs.innerHTML = `
            <div class="tabs-header">
                ${config.tabs.map((tab, index) => `
                    <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${index}">
                        ${tab.title}
                    </button>
                `).join('')}
            </div>
            <div class="tabs-content">
                ${config.tabs.map((tab, index) => `
                    <div class="tab-panel ${index === 0 ? 'active' : ''}" data-tab="${index}">
                        ${tab.content}
                    </div>
                `).join('')}
            </div>
        `;
        
        return tabs;
    }

    createCounter(config) {
        const counter = document.createElement('div');
        counter.className = 'counter-component';
        counter.innerHTML = `
            <div class="counter-value">${config.initialValue || 0}</div>
            <div class="counter-label">${config.label}</div>
        `;
        
        return counter;
    }

    createProgressBar(config) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-track">
                <div class="progress-fill" style="width: ${config.percentage || 0}%"></div>
            </div>
            <div class="progress-label">${config.label}</div>
        `;
        
        return progressBar;
    }

    createTooltip(config) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-trigger">${config.trigger}</div>
            <div class="tooltip-content">${config.content}</div>
        `;
        
        return tooltip;
    }

    // Utility Functions
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
        }
    }

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

    // Public API
    getComponent(name) {
        return this.components.get(name);
    }

    createComponent(name, config) {
        const factory = this.components.get(name);
        if (factory) {
            return factory(config);
        }
        throw new Error(`Component ${name} not found`);
    }

    setState(key, value) {
        this.state.set(key, value);
        this.notifyObservers(key, value);
    }

    getState(key) {
        return this.state.get(key);
    }

    subscribe(key, callback) {
        if (!this.observers.has(key)) {
            this.observers.set(key, []);
        }
        this.observers.get(key).push(callback);
    }

    notifyObservers(key, value) {
        const callbacks = this.observers.get(key) || [];
        callbacks.forEach(callback => callback(value));
    }
}

// Initialize Component Manager
const componentManager = new ComponentManager();

// Export for use in other files
window.ComponentManager = componentManager;
