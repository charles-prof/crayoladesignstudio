---
name: fast-project-onboarding
description: >-
  Use this skill whenever onboarding new architectural or product visualization projects,
  converting raw CAD/CGI renders (PNG/JPEG), extracting aspect ratios in parallel,
  and rapidly registering new showcase pages in the portfolio with high-speed FTPS deployment.
---

# Fast Project Onboarding & Parallel Render Pipeline

A high-performance pipeline for onboarding architectural visual assets into Crayola Design Studio without sequential lag.

## Core Rules & Invariants
1. **Never Process 4K/8K Masters Serially**: Always use parallel multi-threading (`ThreadPoolExecutor` with 8 workers) for image probing and WebP compression.
2. **Never Leave Heavy Raw Masters in Public Bundle**: Once optimized WebP files (~80KB–350KB) are generated, remove raw 20MB+ PNGs from `frontend-react/public/` to keep Vite builds (<600ms) and FTPS uploads swift.
3. **Preserve Authentic Aspect Ratios**: Never distort architectural elevation ratios. Retain widescreen (16:9) and vertical elevations (1:2, 5:6) authentically using dedicated containers or `object-fit: contain`.

## Pipeline Execution

### 1. Fast Batch Optimization
Run the multi-threaded optimization script to probe and encode assets in parallel:

```bash
python3 .agents/skills/fast-project-onboarding/scripts/batch_optimize.py \
  --src "<source_directory>" \
  --dest "frontend-react/public/projects/selected/<project-slug>" \
  --max-dim 2048 \
  --quality 82
```

The script:
- Converts all raw renders (PNG, JPEG, TIFF) to progressive WebP in parallel.
- Strips camera EXIF metadata while preserving sRGB color profiles.
- Removes raw masters from the destination folder automatically.
- Outputs dimensions, aspect ratios, and suggested `fullWidthIndexes`.

### 2. Rapid Data Registration in `projects.js`
Append the project record to `frontend-react/src/data/projects.js` using the standard schema:

```javascript
{
  id: '<project-slug>',
  aliases: ['<alternate-slug>'],
  title: '<Project Title>',
  category: '<interior | exterior | 3d-viz>',
  featured: true,
  badge: '<Badge Label>',
  typology: '<Typology Description>',
  location: '<City, State>',
  area: '<Square Footage>',
  year: '2026',
  thumbnail: '/projects/selected/<project-slug>/hero.webp',
  heroPosition: 'center 50%',
  cardPosition: 'center 50%',
  fullWidthIndexes: [0, 3, 6, 9],
  images: [
    '/projects/selected/<project-slug>/hero.webp',
    ...
  ],
  description: [
    "Paragraph 1...",
    "Paragraph 2..."
  ]
}
```

### 3. Fast Build & Production Verification
```bash
npm --prefix frontend-react run build
python3 sprint/deploy.py
curl -I https://crayoladesignstudio.com/project/<project-slug>
```
