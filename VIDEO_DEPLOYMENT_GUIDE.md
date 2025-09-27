# Zen Agency - Video Deployment Guide for Netlify

## Current Status
Your website is ready for videos! The HTML already references these video files:
- `assets/videos/hero-1.mp4`, `hero-2.mp4`, `hero-3.mp4`
- `assets/videos/reel-1.mp4` through `reel-9.mp4`
- `assets/videos/INTRO PODCAST.mp4`

And these poster images:
- `assets/posters/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- `assets/posters/reel-1.jpg` through `reel-9.jpg`
- `assets/posters/intro-podcast.jpg`

## Recommended Approach: Hybrid Solution

### Option 1: Optimized Direct Hosting (Recommended)
1. **Compress your videos** to under 50MB each
2. **Use MP4 format** with H.264 codec
3. **Create poster images** (JPG, 9:16 aspect ratio for reels, 16:9 for podcasts)
4. **Deploy directly to Netlify**

### Option 2: External Video Hosting (Best Performance)
1. **Upload videos to YouTube** (unlisted/private)
2. **Use YouTube embed URLs** instead of direct video files
3. **Or use Vimeo** for better control
4. **Or use Cloudinary** for optimized video delivery

## Video Optimization Commands

### Using FFmpeg (if you have it installed):
```bash
# Compress MP4 for web
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k -movflags +faststart output.mp4

# Create poster image
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 -q:v 2 poster.jpg
```

### Using HandBrake (GUI tool):
- Download HandBrake (free)
- Use "Web" preset
- Set quality to 22-28
- Enable "Web Optimized"

## File Structure
```
assets/
├── videos/
│   ├── hero-1.mp4
│   ├── hero-2.mp4
│   ├── hero-3.mp4
│   ├── reel-1.mp4
│   ├── reel-2.mp4
│   ├── ... (reel-9.mp4)
│   └── INTRO PODCAST.mp4
└── posters/
    ├── hero-1.jpg
    ├── hero-2.jpg
    ├── hero-3.jpg
    ├── reel-1.jpg
    ├── reel-2.jpg
    ├── ... (reel-9.jpg)
    └── intro-podcast.jpg
```

## Netlify Configuration
The `netlify.toml` file is already created with optimal settings for video serving.

## Testing Locally
1. Add your video files to `assets/videos/`
2. Add your poster images to `assets/posters/`
3. Open `index.html` in your browser
4. Test the lazy loading and autoplay functionality

## Deployment Steps
1. Optimize your videos (target: 20-50MB each)
2. Add files to the correct directories
3. Test locally
4. Commit and push to your Git repository
5. Netlify will automatically deploy

## Troubleshooting
- **Videos not loading**: Check file paths and formats
- **Slow loading**: Compress videos more aggressively
- **Build timeouts**: Use smaller video files or external hosting
- **Bandwidth issues**: Consider CDN or external hosting

## Alternative: YouTube Embed Method
If direct hosting doesn't work, you can modify the HTML to use YouTube embeds:

```html
<!-- Replace video tags with iframe embeds -->
<iframe 
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID"
  frameborder="0" 
  allow="autoplay; encrypted-media" 
  allowfullscreen>
</iframe>
```

## Next Steps
1. Prepare your video files (compress them)
2. Create poster images
3. Add them to the correct directories
4. Test locally
5. Deploy to Netlify