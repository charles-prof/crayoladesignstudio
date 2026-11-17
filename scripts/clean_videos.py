#!/usr/bin/env python3
"""
Trim and clean videos to eliminate all N Studio branding:
1. full-walkthrough.mp4:
   - Trim start: skip 0:00 - 0:08.5 (where N Studio corner watermark appears)
   - Trim end: cut at 454.0s (07:34) before the full-screen N Studio outro card
   - Smooth cinematic fade-in from black at start and fade-out to black at end
   - Faststart metadata for instantaneous web streaming
2. hero-reel.mp4:
   - Cut starting after 8.5s so the homepage background hero reel has zero N Studio branding
"""

import subprocess
import os

INPUT_WALKTHROUGH = 'frontend-react/public/full-walkthrough.mp4'
OUTPUT_WALKTHROUGH = 'frontend-react/public/full-walkthrough.mp4.tmp.mp4'
OUTPUT_HERO_REEL = 'frontend-react/public/hero-reel.mp4.tmp.mp4'

def clean_walkthrough():
    print("🎬 Trimming full-walkthrough.mp4...")
    # Start at 8.5s, cut at 454.0s (duration = 445.5s)
    # Total duration = 445.5 seconds (~7 min 25 sec)
    duration = 445.5
    fade_out_start = duration - 1.2
    
    vf = f"fade=t=in:st=0:d=0.6,fade=t=out:st={fade_out_start:.1f}:d=1.2"
    af = f"afade=t=in:ss=0:d=0.6,afade=t=out:st={fade_out_start - 0.5:.1f}:d=1.7"
    
    cmd = [
        'ffmpeg', '-y',
        '-ss', '8.5',
        '-to', '454.0',
        '-i', INPUT_WALKTHROUGH,
        '-vf', vf,
        '-af', af,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        OUTPUT_WALKTHROUGH
    ]
    subprocess.run(cmd, check=True)
    os.replace(OUTPUT_WALKTHROUGH, INPUT_WALKTHROUGH)
    print("✅ full-walkthrough.mp4 successfully trimmed and cleaned!")

def clean_hero_reel():
    print("🎬 Regenerating hero-reel.mp4 without N Studio watermark...")
    # Take a 26-second sequence starting at 12.0s (pure architectural movement)
    cmd = [
        'ffmpeg', '-y',
        '-ss', '12.0',
        '-t', '26.0',
        '-i', INPUT_WALKTHROUGH,
        '-vf', 'fade=t=in:st=0:d=0.5,fade=t=out:st=25.0:d=1.0',
        '-an', # Muted for background video
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '24',
        '-movflags', '+faststart',
        OUTPUT_HERO_REEL
    ]
    subprocess.run(cmd, check=True)
    os.replace(OUTPUT_HERO_REEL, 'frontend-react/public/hero-reel.mp4')
    print("✅ hero-reel.mp4 successfully regenerated!")

if __name__ == '__main__':
    clean_walkthrough()
    clean_hero_reel()
