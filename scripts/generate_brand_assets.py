#!/usr/bin/env python3
"""
Generate high-fidelity Crayola Design Studio brand assets:
- logo.png (for dark backgrounds: gold mark + white wordmark)
- logo-dark.png (for light backgrounds: gold mark + dark charcoal wordmark)
- favicon.svg (crisp vector SVG with pure white background badge & gold/grey architectural mark)
- favicon.png (64x64 PNG favicon on pure white background)
- apple-touch-icon.png (180x180 PNG icon on pure white background)
- favicon.ico (32x32 multi-resolution fallback)
"""

import os
import subprocess
import base64

SRC_LOGO = '/home/charlie/.gemini/antigravity-cli/brain/e9683e10-b883-4354-af75-31a031f99310/cds_logo.png'
PUBLIC_DIR = 'frontend-react/public'

def main():
    print("Generating Crayola Design Studio Brand Assets with White Favicon...")

    # 1. First, make transparent cut from master logo
    cmd_trim = [
        'magick', SRC_LOGO,
        '-fuzz', '8%',
        '-transparent', 'white',
        '-trim',
        '+repage',
        '/tmp/master_trimmed.png'
    ]
    subprocess.run(cmd_trim, check=True)
    
    dims = subprocess.check_output(['magick', 'identify', '-format', '%w %h', '/tmp/master_trimmed.png']).decode().split()
    w, h = int(dims[0]), int(dims[1])
    print(f"Trimmed master dimensions: {w}x{h}")

    # Read RGBA bytes
    raw = bytearray(subprocess.check_output(['magick', '/tmp/master_trimmed.png', '-depth', '8', 'rgba:-']))

    # 2. Generate logo.png (Dark Background: Gold stripes + Crisp White Wordmark)
    raw_dark_bg = bytearray(raw)
    for i in range(0, len(raw), 4):
        r, g, b, a = raw[i], raw[i+1], raw[i+2], raw[i+3]
        if a < 10:
            continue
        if r - b > 35:
            # Keep gold mark rich (#F5A800 / #F3BB20)
            pass
        else:
            lum = (r + g + b) // 3
            if lum < 50:
                raw_dark_bg[i] = 255
                raw_dark_bg[i+1] = 255
                raw_dark_bg[i+2] = 255
            else:
                val = 255 - int(lum * 0.2)
                raw_dark_bg[i] = val
                raw_dark_bg[i+1] = val
                raw_dark_bg[i+2] = val

    p = subprocess.Popen(
        ['magick', '-size', f'{w}x{h}', '-depth', '8', 'rgba:-',
         '-bordercolor', 'none', '-border', '12x12',
         os.path.join(PUBLIC_DIR, 'logo.png')],
        stdin=subprocess.PIPE
    )
    p.communicate(input=raw_dark_bg)
    print(" Saved frontend-react/public/logo.png (dark background variant)")

    # 3. Generate logo-dark.png (Light Background: Gold stripes + Deep Charcoal Wordmark)
    raw_light_bg = bytearray(raw)
    for i in range(0, len(raw), 4):
        r, g, b, a = raw[i], raw[i+1], raw[i+2], raw[i+3]
        if a < 10:
            continue
        if r - b > 35:
            pass
        else:
            lum = (r + g + b) // 3
            if lum < 50:
                raw_light_bg[i] = 20
                raw_light_bg[i+1] = 20
                raw_light_bg[i+2] = 20
            else:
                raw_light_bg[i] = 107
                raw_light_bg[i+1] = 96
                raw_light_bg[i+2] = 87

    p = subprocess.Popen(
        ['magick', '-size', f'{w}x{h}', '-depth', '8', 'rgba:-',
         '-bordercolor', 'none', '-border', '12x12',
         os.path.join(PUBLIC_DIR, 'logo-dark.png')],
        stdin=subprocess.PIPE
    )
    p.communicate(input=raw_light_bg)
    print(" Saved frontend-react/public/logo-dark.png (light background variant)")

    # 4. Extract the full architectural mark (Gold stripes + Grey peak triangle) from master logo
    master_raw = bytearray(subprocess.check_output(['magick', SRC_LOGO, '-depth', '8', 'rgba:-']))
    mw, mh = 803, 468
    mark_isolated = bytearray([255, 255, 255, 0] * (mw * mh))

    for y in range(mh):
        for x in range(mw):
            idx = (y * mw + x) * 4
            r, g, b = master_raw[idx], master_raw[idx+1], master_raw[idx+2]
            # Not white background
            if not (r > 245 and g > 245 and b > 245):
                # Wordmark is in bottom right: x >= 335 and y >= 285
                is_wordmark = (x >= 335 and y >= 285)
                if not is_wordmark:
                    mark_isolated[idx] = r
                    mark_isolated[idx+1] = g
                    mark_isolated[idx+2] = b
                    mark_isolated[idx+3] = 255

    p = subprocess.Popen(
        ['magick', '-size', f'{mw}x{mh}', '-depth', '8', 'rgba:-',
         '-trim', '+repage', '/tmp/full_mark_trimmed.png'],
        stdin=subprocess.PIPE
    )
    p.communicate(input=mark_isolated)
    print(" Isolated complete architectural mark (Gold stripes + Grey peak)")

    # 5. Generate White-Background Favicons:
    # A) 64x64 PNG Favicon on pure white rounded badge with subtle crisp border
    cmd_fav_png = [
        'magick', '-size', '128x128', 'xc:none',
        '-fill', '#FFFFFF',
        '-stroke', '#DDD9D2', '-strokewidth', '1.5',
        '-draw', 'roundrectangle 2,2,125,125,24,24',
        '(', '/tmp/full_mark_trimmed.png', '-resize', '96x96', ')',
        '-gravity', 'center', '-composite',
        '-resize', '64x64',
        os.path.join(PUBLIC_DIR, 'favicon.png')
    ]
    subprocess.run(cmd_fav_png, check=True)
    print(" Saved frontend-react/public/favicon.png (white background badge)")

    # B) 180x180 Apple Touch Icon (White Background)
    cmd_apple = [
        'magick', '-size', '180x180', 'xc:#FFFFFF',
        '(', '/tmp/full_mark_trimmed.png', '-resize', '136x136', ')',
        '-gravity', 'center', '-composite',
        os.path.join(PUBLIC_DIR, 'apple-touch-icon.png')
    ]
    subprocess.run(cmd_apple, check=True)
    print(" Saved frontend-react/public/apple-touch-icon.png (white background)")

    # C) 32x32 Favicon.ico
    cmd_ico = [
        'magick', os.path.join(PUBLIC_DIR, 'favicon.png'),
        '-resize', '32x32',
        os.path.join(PUBLIC_DIR, 'favicon.ico')
    ]
    subprocess.run(cmd_ico, check=True)
    print(" Saved frontend-react/public/favicon.ico")

    # D) Vector favicon.svg with pure white background & subtle architectural border
    with open('/tmp/full_mark_trimmed.png', 'rb') as f:
        mark_b64 = base64.b64encode(f.read()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <!-- Crisp Pure White Architectural Badge for High Visibility on Dark & Light Browser Tabs -->
  <rect x="2" y="2" width="124" height="124" rx="26" fill="#FFFFFF" stroke="#DDD9D2" stroke-width="1.5" />
  <!-- Authentic Crayola Gold Architectural Stripes & Grey Peak -->
  <image href="data:image/png;base64,{mark_b64}" x="16" y="16" width="96" height="96" />
</svg>
'''
    with open(os.path.join(PUBLIC_DIR, 'favicon.svg'), 'w') as f:
        f.write(svg_content)
    print(" Saved frontend-react/public/favicon.svg (white background SVG)")

    print("\nAll brand assets successfully generated!")

if __name__ == '__main__':
    main()
