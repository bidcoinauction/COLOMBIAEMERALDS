# WebP Image Optimization for Colombia Emeralds

This system automatically converts and serves WebP images for better performance and smaller file sizes.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate WebP Images
```bash
npm run generate-webp
```

### 3. Upload WebP Images
Upload the generated WebP images to your CDN/storage service alongside your original images.

## 📁 File Structure

```
COLOMBIAEMERALDS/
├── js/
│   ├── main.js              # Main JavaScript functionality
│   └── webp-converter.js    # WebP conversion and optimization
├── images/                  # Your original images (JPG/PNG)
│   └── webp/               # Generated WebP images
├── generate-webp.js        # Node.js script to generate WebP
└── package.json            # Dependencies and scripts
```

## 🔧 How It Works

### Client-Side (Automatic)
- **Browser Detection**: Automatically detects WebP support
- **Fallback System**: Uses original images if WebP isn't supported
- **Lazy Loading**: Converts images as they come into view
- **Canvas Conversion**: Converts images on-the-fly if WebP versions don't exist

### Server-Side (Manual)
- **Batch Conversion**: Converts all images in your images folder
- **Quality Optimization**: Uses 85% quality for optimal size/quality balance
- **Responsive Images**: Generates multiple sizes for different screen sizes

## 🎯 Features

### ✅ Automatic WebP Conversion
- Detects browser WebP support
- Converts images on-the-fly using Canvas API
- Maintains original images as fallbacks

### ✅ Picture Element Support
- Uses modern `<picture>` elements for better browser support
- Automatic fallback to original formats
- Responsive image loading

### ✅ Performance Optimizations
- Lazy loading for images
- Preloading for critical images
- Optimized quality settings (85% WebP quality)

### ✅ Responsive Images
- Generates multiple sizes (400px, 800px, 1200px, 1600px)
- Serves appropriate size based on screen resolution
- Reduces bandwidth usage on mobile devices

## 📊 Expected Performance Gains

- **File Size**: 25-35% smaller than JPEG
- **Loading Speed**: Faster page load times
- **Bandwidth**: Reduced data usage
- **SEO**: Better Core Web Vitals scores

## 🛠️ Configuration

### Image Quality Settings
Edit `generate-webp.js` to adjust quality:
```javascript
.webp({ 
    quality: 85,        // 0-100 (higher = better quality, larger file)
    effort: 6,          // 0-6 (higher = better compression, slower)
    lossless: false     // true for lossless compression
})
```

### Supported Formats
- Input: JPG, JPEG, PNG
- Output: WebP
- Fallback: Original format

## 🔄 Workflow

1. **Add Images**: Place your JPG/PNG images in the `images/` folder
2. **Generate WebP**: Run `npm run generate-webp`
3. **Upload**: Upload both original and WebP images to your CDN
4. **Update URLs**: The system automatically uses WebP when available

## 📱 Browser Support

- **WebP Support**: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- **Fallback**: All browsers (uses original images)
- **Progressive Enhancement**: Better experience for supported browsers

## 🚨 Troubleshooting

### WebP Images Not Loading
1. Check if WebP images exist on your server
2. Verify file permissions
3. Check browser console for errors

### Large File Sizes
1. Adjust quality settings in `generate-webp.js`
2. Use responsive images for different screen sizes
3. Consider using a CDN with image optimization

### Conversion Errors
1. Ensure Sharp is installed: `npm install sharp`
2. Check image file formats are supported
3. Verify file paths are correct

## 📈 Monitoring

The system logs conversion status:
- ✅ Successful conversions
- ❌ Failed conversions
- 📊 Conversion statistics

Check browser console for detailed logs.

## 🔧 Advanced Usage

### Custom Image Processing
```javascript
// In webp-converter.js
async processImage(img, resolve, reject) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Add custom processing here
    ctx.filter = 'brightness(1.1) contrast(1.1)';
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    
    // Convert to WebP
    canvas.toBlob(/* ... */, 'image/webp', 0.85);
}
```

### CDN Integration
Update `getWebPUrl()` method to work with your CDN:
```javascript
getWebPUrl(originalUrl) {
    // Example for Cloudinary
    if (originalUrl.includes('cloudinary.com')) {
        return originalUrl.replace('/upload/', '/upload/f_webp,q_85/');
    }
    // Your CDN logic here
    return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}
```

## 📞 Support

For issues or questions about the WebP optimization system, check the browser console for error messages and ensure all dependencies are properly installed.
