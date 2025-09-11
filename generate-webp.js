#!/usr/bin/env node

/**
 * WebP Image Generator
 * Converts JPG/PNG images to WebP format
 * 
 * Usage: node generate-webp.js
 * 
 * Requirements:
 * npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class WebPGenerator {
    constructor() {
        this.inputDir = './images'; // Change this to your image directory
        this.outputDir = './images/webp';
        this.supportedFormats = ['.jpg', '.jpeg', '.png'];
    }

    /**
     * Create output directory if it doesn't exist
     */
    ensureOutputDir() {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    /**
     * Get all image files from input directory
     */
    getImageFiles() {
        if (!fs.existsSync(this.inputDir)) {
            console.log(`Input directory ${this.inputDir} does not exist`);
            return [];
        }

        const files = fs.readdirSync(this.inputDir);
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return this.supportedFormats.includes(ext);
        });
    }

    /**
     * Convert single image to WebP
     */
    async convertImage(inputPath, outputPath) {
        try {
            await sharp(inputPath)
                .webp({ 
                    quality: 85,
                    effort: 6,
                    lossless: false
                })
                .toFile(outputPath);
            
            console.log(`✅ Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
            return true;
        } catch (error) {
            console.error(`❌ Failed to convert ${inputPath}:`, error.message);
            return false;
        }
    }

    /**
     * Convert all images
     */
    async convertAllImages() {
        console.log('🚀 Starting WebP conversion...');
        
        this.ensureOutputDir();
        const imageFiles = this.getImageFiles();
        
        if (imageFiles.length === 0) {
            console.log('No images found to convert');
            return;
        }

        console.log(`Found ${imageFiles.length} images to convert`);

        let successCount = 0;
        let failCount = 0;

        for (const file of imageFiles) {
            const inputPath = path.join(this.inputDir, file);
            const outputPath = path.join(this.outputDir, path.basename(file, path.extname(file)) + '.webp');
            
            const success = await this.convertImage(inputPath, outputPath);
            
            if (success) {
                successCount++;
            } else {
                failCount++;
            }
        }

        console.log(`\n📊 Conversion complete:`);
        console.log(`✅ Success: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);
    }

    /**
     * Generate responsive WebP images
     */
    async generateResponsiveImages(inputPath, outputDir) {
        const sizes = [
            { width: 400, suffix: '-sm' },
            { width: 800, suffix: '-md' },
            { width: 1200, suffix: '-lg' },
            { width: 1600, suffix: '-xl' }
        ];

        const baseName = path.basename(inputPath, path.extname(inputPath));
        
        for (const size of sizes) {
            const outputPath = path.join(outputDir, `${baseName}${size.suffix}.webp`);
            
            try {
                await sharp(inputPath)
                    .resize(size.width, null, { 
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .webp({ quality: 85 })
                    .toFile(outputPath);
                
                console.log(`✅ Generated: ${path.basename(outputPath)} (${size.width}px)`);
            } catch (error) {
                console.error(`❌ Failed to generate ${outputPath}:`, error.message);
            }
        }
    }

    /**
     * Generate HTML picture elements
     */
    generatePictureElements(imageFiles) {
        const pictureElements = imageFiles.map(file => {
            const baseName = path.basename(file, path.extname(file));
            const alt = baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            return `
<picture>
    <source srcset="images/webp/${baseName}-sm.webp 400w,
                    images/webp/${baseName}-md.webp 800w,
                    images/webp/${baseName}-lg.webp 1200w,
                    images/webp/${baseName}-xl.webp 1600w" 
            type="image/webp">
    <img src="images/${file}" 
         alt="${alt}" 
         class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
         loading="lazy">
</picture>`;
        }).join('\n\n');

        return pictureElements;
    }
}

// Run the converter if this file is executed directly
if (require.main === module) {
    const generator = new WebPGenerator();
    generator.convertAllImages().catch(console.error);
}

module.exports = WebPGenerator;
