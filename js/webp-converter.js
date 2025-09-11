/**
 * WebP Image Converter and Optimizer
 * Automatically converts images to WebP format with fallbacks
 */

class WebPConverter {
    constructor() {
        this.supportsWebP = this.checkWebPSupport();
        this.convertedImages = new Set();
    }

    /**
     * Check if browser supports WebP
     */
    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    /**
     * Convert all images on the page to WebP
     */
    convertAllImages() {
        if (!this.supportsWebP) {
            console.log('WebP not supported in this browser');
            return;
        }

        const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"]');
        
        images.forEach(img => {
            if (!this.convertedImages.has(img.src)) {
                this.convertImageToWebP(img);
            }
        });
    }

    /**
     * Convert a single image to WebP
     */
    async convertImageToWebP(img) {
        try {
            // First try to load existing WebP version
            const webpUrl = this.getWebPUrl(img.src);
            const webpExists = await this.checkImageExists(webpUrl);
            
            if (webpExists) {
                img.src = webpUrl;
                this.convertedImages.add(img.src);
                return;
            }

            // If WebP doesn't exist, convert on the fly
            await this.generateWebPFromImage(img);
            this.convertedImages.add(img.src);
            
        } catch (error) {
            console.log('WebP conversion failed for:', img.src, error);
        }
    }

    /**
     * Generate WebP URL from original image URL
     */
    getWebPUrl(originalUrl) {
        // For your current setup
        if (originalUrl.includes('updatedcardscript.standard.us-east-1.oortstorages.com')) {
            return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        return originalUrl;
    }

    /**
     * Check if an image exists
     */
    checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * Generate WebP from existing image using Canvas
     */
    async generateWebPFromImage(img) {
        return new Promise((resolve, reject) => {
            // Wait for image to load
            if (!img.complete) {
                img.onload = () => this.processImage(img, resolve, reject);
            } else {
                this.processImage(img, resolve, reject);
            }
        });
    }

    /**
     * Process image through canvas
     */
    processImage(img, resolve, reject) {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            ctx.drawImage(img, 0, 0);
            
            // Convert to WebP with quality optimization
            canvas.toBlob((blob) => {
                if (blob) {
                    const webpUrl = URL.createObjectURL(blob);
                    img.src = webpUrl;
                    resolve(webpUrl);
                } else {
                    reject(new Error('WebP conversion failed'));
                }
            }, 'image/webp', 0.85); // 85% quality for good balance
            
        } catch (error) {
            reject(error);
        }
    }

    /**
     * Optimize image loading with lazy loading
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                    
                    // Convert to WebP after loading
                    this.convertImageToWebP(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Preload critical images
     */
    preloadCriticalImages() {
        const criticalImages = [
            'https://updatedcardscript.standard.us-east-1.oortstorages.com/canada_emeralds/raw-emerald-crystals.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = this.getWebPUrl(src);
            document.head.appendChild(link);
        });
    }

    /**
     * Initialize WebP conversion
     */
    init() {
        if (!this.supportsWebP) {
            return;
        }

        // Preload critical images
        this.preloadCriticalImages();

        // Convert existing images
        this.convertAllImages();

        // Setup lazy loading for future images
        this.setupLazyLoading();

        // Watch for dynamically added images
        this.observeNewImages();
    }

    /**
     * Watch for dynamically added images
     */
    observeNewImages() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG') {
                            this.convertImageToWebP(node);
                        } else {
                            const images = node.querySelectorAll('img');
                            images.forEach(img => this.convertImageToWebP(img));
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Initialize WebP converter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const webpConverter = new WebPConverter();
    webpConverter.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebPConverter;
}
