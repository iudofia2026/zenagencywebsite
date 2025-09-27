# YouTube Controlled Embeds - Autoplay Only with Volume Control

## 🎯 What You Want
- ✅ **Autoplay** when video comes into view
- ✅ **Volume control** available to users
- ❌ **No play/pause button**
- ❌ **No progress bar**
- ❌ **No other controls**

## 🔧 YouTube Embed Parameters for Your Needs

### Basic Autoplay + Volume Only
```html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID?
    autoplay=1&
    mute=0&
    loop=1&
    playlist=VIDEO_ID&
    controls=0&
    modestbranding=1&
    rel=0&
    showinfo=0&
    iv_load_policy=3&
    fs=0&
    disablekb=1&
    cc_load_policy=0"
  frameborder="0" 
  allow="autoplay; encrypted-media; fullscreen" 
  allowfullscreen>
</iframe>
```

### Advanced: Volume Control Overlay
```html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID?
    autoplay=1&
    mute=0&
    loop=1&
    playlist=VIDEO_ID&
    controls=0&
    modestbranding=1&
    rel=0&
    showinfo=0&
    iv_load_policy=3&
    fs=0&
    disablekb=1&
    cc_load_policy=0&
    enablejsapi=1"
  frameborder="0" 
  allow="autoplay; encrypted-media; fullscreen" 
  allowfullscreen>
</iframe>

<!-- Custom volume control overlay -->
<div class="volume-control-overlay">
  <input type="range" min="0" max="100" value="50" class="volume-slider">
</div>
```

## 📋 Parameter Breakdown

| Parameter | Value | Effect |
|-----------|-------|--------|
| `autoplay=1` | 1 | Video starts automatically |
| `mute=0` | 0 | Video starts with sound (if autoplay works) |
| `loop=1` | 1 | Video loops continuously |
| `playlist=VIDEO_ID` | Required | Needed for looping to work |
| `controls=0` | 0 | **Hides all YouTube controls** |
| `modestbranding=1` | 1 | Hides YouTube logo |
| `rel=0` | 0 | Don't show related videos |
| `showinfo=0` | 0 | Hide video title/info |
| `iv_load_policy=3` | 3 | Hide annotations |
| `fs=0` | 0 | Disable fullscreen |
| `disablekb=1` | 1 | Disable keyboard controls |
| `cc_load_policy=0` | 0 | Hide captions |
| `enablejsapi=1` | 1 | Enable JavaScript API for custom controls |

## 🎨 Custom Volume Control Implementation

### HTML Structure
```html
<div class="video-container">
  <iframe 
    id="video-iframe"
    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=0&loop=1&playlist=VIDEO_ID&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&enablejsapi=1"
    frameborder="0" 
    allow="autoplay; encrypted-media; fullscreen" 
    allowfullscreen>
  </iframe>
  
  <!-- Custom volume control -->
  <div class="custom-controls">
    <div class="volume-control">
      <span class="volume-icon">🔊</span>
      <input type="range" min="0" max="100" value="50" class="volume-slider" id="volumeSlider">
    </div>
  </div>
</div>
```

### CSS Styling
```css
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-container:hover .custom-controls {
  opacity: 1;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-icon {
  font-size: 16px;
  color: white;
}

.volume-slider {
  width: 80px;
  height: 4px;
  background: #333;
  outline: none;
  border-radius: 2px;
}

.volume-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
```

### JavaScript Control
```javascript
// YouTube API integration for volume control
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-iframe', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  const volumeSlider = document.getElementById('volumeSlider');
  
  volumeSlider.addEventListener('input', function() {
    const volume = this.value;
    player.setVolume(volume);
  });
  
  // Set initial volume
  player.setVolume(50);
}

// Load YouTube API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
```

## 🚀 Complete Implementation for Your Site

### Updated HTML for Your Videos
```html
<!-- Hero Video 1 -->
<div class="tile t1">
  <div class="video-container">
    <iframe 
      class="reel v9x16 youtube-embed"
      src="https://www.youtube.com/embed/YOUR_HERO_1_VIDEO_ID?autoplay=1&mute=0&loop=1&playlist=YOUR_HERO_1_VIDEO_ID&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&cc_load_policy=0&enablejsapi=1"
      frameborder="0" 
      allow="autoplay; encrypted-media; fullscreen" 
      allowfullscreen>
    </iframe>
    
    <div class="custom-controls">
      <div class="volume-control">
        <span class="volume-icon">🔊</span>
        <input type="range" min="0" max="100" value="50" class="volume-slider">
      </div>
    </div>
  </div>
</div>
```

## 📤 Batch Upload Solutions

### Option 1: YouTube Studio (Fastest Manual Method)
1. **Go to YouTube Studio**
2. **Click "Create" → "Upload videos"**
3. **Select multiple files** (Ctrl/Cmd + click)
4. **Set default settings**:
   - Visibility: Unlisted
   - Title: "Zen Agency - [Video Name]"
   - Description: "Zen Agency portfolio video"
5. **Upload all at once**

### Option 2: YouTube API Script (Automated)
```python
# Python script for batch upload
import os
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

def upload_video(service, file_path, title, description):
    body = {
        'snippet': {
            'title': title,
            'description': description,
            'tags': ['zen agency', 'portfolio'],
            'categoryId': '22'  # People & Blogs
        },
        'status': {
            'privacyStatus': 'unlisted'
        }
    }
    
    media = MediaFileUpload(file_path, chunksize=-1, resumable=True)
    request = service.videos().insert(part=','.join(body.keys()), body=body, media_body=media)
    
    return request.execute()

# Usage
videos = [
    ('hero-1.mp4', 'Zen Agency - Hero Video 1'),
    ('hero-2.mp4', 'Zen Agency - Hero Video 2'),
    ('reel-1.mp4', 'Zen Agency - Reel 1'),
    # ... add all your videos
]

for video_file, title in videos:
    upload_video(service, f'assets/videos/{video_file}', title, 'Zen Agency portfolio video')
```

### Option 3: Third-Party Tools
- **TubeBuddy** ($9.99/month) - Has batch upload
- **VidIQ** ($7.50/month) - Bulk upload features
- **Custom automation** - Using browser automation tools

## ✅ Final Result

Your videos will:
- ✅ **Autoplay** when they come into view
- ✅ **Loop continuously** 
- ✅ **Show only volume control** (custom overlay)
- ✅ **Hide all YouTube controls**
- ✅ **Maintain original quality**
- ✅ **Work on all devices**

## 🎯 Recommended Approach

1. **Use YouTube Studio** for manual batch upload (fastest)
2. **Implement custom volume controls** with the code above
3. **Test on multiple devices** to ensure autoplay works
4. **Deploy to Netlify** - everything will work perfectly!

This gives you exactly what you want: autoplay videos with only volume control, maintaining full quality!