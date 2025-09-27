# Video Preparation Guide for Netlify Deployment

## 🎯 Target Specifications

### Video Files
- **Format**: MP4 with H.264 codec
- **Size**: Under 50MB each (ideally 20-30MB)
- **Resolution**: 
  - Reels: 1080x1920 (9:16 aspect ratio)
  - Podcast: 1920x1080 (16:9 aspect ratio)
- **Duration**: Keep reels under 30 seconds, podcast intro under 60 seconds

### Poster Images
- **Format**: JPG
- **Size**: Under 500KB each
- **Resolution**: Match video aspect ratios
- **Quality**: 80-85% compression

## 🛠️ Video Optimization Methods

### Method 1: FFmpeg (Command Line) - RECOMMENDED

Install FFmpeg first:
```bash
# macOS
brew install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html

# Linux
sudo apt install ffmpeg
```

#### Compress Videos:
```bash
# For reels (9:16 vertical videos)
ffmpeg -i input_reel.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
  output_reel.mp4

# For podcast (16:9 horizontal videos)
ffmpeg -i input_podcast.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  output_podcast.mp4
```

#### Create Poster Images:
```bash
# Extract poster at 1 second mark
ffmpeg -i input_video.mp4 -ss 00:00:01 -vframes 1 -q:v 2 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" poster.jpg
```

### Method 2: HandBrake (GUI) - EASIEST

1. Download HandBrake (free): https://handbrake.fr/
2. Open your video file
3. Use "Web" preset
4. Adjust settings:
   - Quality: 22-28 (lower = smaller file)
   - Enable "Web Optimized"
   - Set resolution to match target
5. Start encoding

### Method 3: Online Tools

- **CloudConvert**: https://cloudconvert.com/mp4-converter
- **FreeConvert**: https://www.freeconvert.com/mp4-converter
- **Online Video Compressor**: https://www.videosmaller.com/

## 📁 File Organization

Create this exact structure in your project:

```
assets/
├── videos/
│   ├── hero-1.mp4
│   ├── hero-2.mp4
│   ├── hero-3.mp4
│   ├── reel-1.mp4
│   ├── reel-2.mp4
│   ├── reel-3.mp4
│   ├── reel-4.mp4
│   ├── reel-5.mp4
│   ├── reel-6.mp4
│   ├── reel-7.mp4
│   ├── reel-8.mp4
│   ├── reel-9.mp4
│   └── INTRO PODCAST.mp4
└── posters/
    ├── hero-1.jpg
    ├── hero-2.jpg
    ├── hero-3.jpg
    ├── reel-1.jpg
    ├── reel-2.jpg
    ├── reel-3.jpg
    ├── reel-4.jpg
    ├── reel-5.jpg
    ├── reel-6.jpg
    ├── reel-7.jpg
    ├── reel-8.jpg
    ├── reel-9.jpg
    └── intro-podcast.jpg
```

## 🚀 Deployment Steps

### 1. Prepare Your Videos
- Compress all videos to under 50MB each
- Create poster images for each video
- Test videos locally by opening `index.html` in browser

### 2. Add Files to Project
```bash
# Copy your optimized videos
cp your_videos/*.mp4 assets/videos/

# Copy your poster images
cp your_posters/*.jpg assets/posters/
```

### 3. Test Locally
```bash
# Open in browser
open index.html

# Or use a local server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### 4. Deploy to Netlify
```bash
# Add files to git
git add assets/videos/ assets/posters/
git commit -m "Add optimized video files"
git push origin main
```

## 🔧 Troubleshooting

### Videos Not Loading
- Check file paths match exactly
- Ensure files are under 50MB
- Verify MP4 format with H.264 codec

### Slow Loading
- Compress videos more aggressively (CRF 30-32)
- Reduce resolution if needed
- Consider external hosting (YouTube/Vimeo)

### Build Failures
- Check individual file sizes
- Ensure stable internet connection
- Try uploading files one by one

### Quality Issues
- Use CRF 22-28 for good quality/size balance
- Ensure proper aspect ratios
- Test on different devices

## 📊 File Size Targets

| Video Type | Target Size | Max Size |
|------------|-------------|----------|
| Hero Videos | 20-30MB | 50MB |
| Reels | 15-25MB | 50MB |
| Podcast Intro | 25-40MB | 50MB |
| Poster Images | 200-500KB | 1MB |

## 🎬 Alternative: External Hosting

If direct hosting continues to fail, consider:

### YouTube Embed Method
1. Upload videos to YouTube (unlisted)
2. Replace video tags with iframe embeds
3. Better performance and reliability

### Vimeo Pro
1. Upload to Vimeo
2. Use embed codes
3. More control over playback

### Cloudinary
1. Upload videos to Cloudinary
2. Use their optimized delivery URLs
3. Automatic compression and CDN

## ✅ Pre-Deployment Checklist

- [ ] All videos under 50MB
- [ ] All videos in MP4 format
- [ ] All poster images created
- [ ] Files in correct directories
- [ ] Tested locally
- [ ] Git repository updated
- [ ] Netlify configuration ready

## 🆘 Need Help?

If you're still having issues:
1. Check Netlify build logs
2. Test with smaller files first
3. Consider external hosting
4. Contact Netlify support for file size limits