#!/usr/bin/env python3
"""
Generate high-fidelity Crayola Design Studio brand assets:
- logo.png (for dark backgrounds: gold mark + white wordmark)
- logo-dark.png (for light backgrounds: gold mark + dark charcoal wordmark)
- favicon.svg (crisp vector SVG of the CDS architectural roofline mark)
- favicon.png (64x64 PNG favicon)
- apple-touch-icon.png (180x180 PNG icon)
"""

import os
import subprocess

SRC_LOGO = '/home/charlie/.gemini/antigravity-cli/brain/e9683e10-b883-4354-af75-31a031f99310/cds_logo.png'
PUBLIC_DIR = 'frontend-react/public'

def main():
    print("Generating Crayola Design Studio Brand Assets...")

    # 1. First, make transparent cut from master logo
    # The master is 803x468 on pure white #FFFFFF
    # Fuzz 8% removes the white background cleanly without eating into antialiasing
    cmd_trim = [
        'magick', SRC_LOGO,
        '-fuzz', '8%',
        '-transparent', 'white',
        '-trim',
        '+repage',
        '/tmp/master_trimmed.png'
    ]
    subprocess.run(cmd_trim, check=True)
    
    # Check dimensions
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
        # If it's part of the gold mark
        if r - b > 35:
            # Keep gold mark rich (#F5A800 / #F3BB20)
            pass
        else:
            # It's wordmark text ("CRAYOLA Design Studio")
            # In the original, black is #000000 (a=255) and grey is #979797 (a=255)
            # Map dark text to luminous crisp white (#FFFFFF) and secondary text to elegant light grey (#E2DFD9)
            lum = (r + g + b) // 3
            if lum < 50:
                # Primary "CRAYOLA" -> pure white
                raw_dark_bg[i] = 255
                raw_dark_bg[i+1] = 255
                raw_dark_bg[i+2] = 255
            else:
                # "Design Studio" or anti-aliased edge -> light architectural off-white
                # Scale smoothly
                val = 255 - int(lum * 0.2)
                raw_dark_bg[i] = val
                raw_dark_bg[i+1] = val
                raw_dark_bg[i+2] = val

    # Save logo.png with 12px breathing padding
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
            # Keep gold mark
            pass
        else:
            # Wordmark text: Charcoal #141414 and Warm Grey #6B6057
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

    # 4. Extract ONLY the gold architectural mark for Favicons
    # We remove the wordmark so the mark stands out bold and iconic in browser tabs
    raw_mark = bytearray(raw)
    for i in range(0, len(raw), 4):
        r, g, b, a = raw[i], raw[i+1], raw[i+2], raw[i+3]
        if a < 10 or r - b <= 35:
            # Make wordmark and background transparent
            raw_mark[i+3] = 0

    p = subprocess.Popen(
        ['magick', '-size', f'{w}x{h}', '-depth', '8', 'rgba:-',
         '-trim', '+repage', '/tmp/cds_mark_isolated.png'],
        stdin=subprocess.PIPE
    )
    p.communicate(input=raw_mark)
    print(" Isolated gold architectural roofline mark")

    # 5. Generate Favicons:
    # A) 64x64 PNG Favicon (with subtle rounded dark backdrop for contrast against both dark & light browser tabs)
    # Modern luxury architectural brands use a subtle dark badge so gold pops on white, grey, and dark tabs alike!
    cmd_fav_png = [
        'magick', '-size', '128x128', 'xc:none',
        '-fill', '#141414', '-draw', 'roundrectangle 4,4,124,124,24,24',
        '(', '/tmp/cds_mark_isolated.png', '-resize', '88x88', ')',
        '-gravity', 'center', '-composite',
        '-resize', '64x64',
        os.path.join(PUBLIC_DIR, 'favicon.png')
    ]
    subprocess.run(cmd_fav_png, check=True)
    print(" Saved frontend-react/public/favicon.png")

    # B) 180x180 Apple Touch Icon
    cmd_apple = [
        'magick', '-size', '180x180', 'xc:#141414',
        '(', '/tmp/cds_mark_isolated.png', '-resize', '126x126', ')',
        '-gravity', 'center', '-composite',
        os.path.join(PUBLIC_DIR, 'apple-touch-icon.png')
    ]
    subprocess.run(cmd_apple, check=True)
    print(" Saved frontend-react/public/apple-touch-icon.png")

    # C) 32x32 Favicon.ico
    cmd_ico = [
        'magick', os.path.join(PUBLIC_DIR, 'favicon.png'),
        '-resize', '32x32',
        os.path.join(PUBLIC_DIR, 'favicon.ico')
    ]
    subprocess.run(cmd_ico, check=True)
    print(" Saved frontend-react/public/favicon.ico")

    # D) Vector favicon.svg
    # We embed the base64-encoded high-res mark inside SVG on a dark badge
    import base64
    with open('/tmp/cds_mark_isolated.png', 'rb') as f:
        mark_b64 = base64.b64encode(f.read()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#242424" />
      <stop offset="100%" stop-color="#121212" />
    </radialGradient>
  </defs>
  <!-- Architectural Dark Badge with subtle border for contrast on light and dark browser tabs -->
  <rect x="4" y="4" width="120" height="120" rx="28" fill="url(#badgeGlow)" stroke="#F5A800" stroke-opacity="0.35" stroke-width="1.5" />
  <!-- Authentic Crayola Gold Architectural Roofline Mark -->
  <image href="data:image/png;base64,{mark_b64}" x="18" y="20" width="92" height="88" />
</svg>
'''
    with open(os.path.join(PUBLIC_DIR, 'favicon.svg'), 'w') as f:
        f.write(svg_content)
    print(" Saved frontend-react/public/favicon.svg")

    print("\nAll brand assets successfully generated!")

if __name__ == '__main__':
    main()
