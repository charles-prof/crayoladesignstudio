#!/usr/bin/env python3
"""
High-Speed Parallel Image Optimization & Onboarding Script for Crayola Design Studio.
Processes heavy CAD/CGI 4K/8K renders in parallel using ThreadPoolExecutor and ImageMagick.
"""

import argparse
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

VALID_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.tiff', '.tif', '.bmp'}

def probe_image(path: Path):
    """Returns width, height, format using identify."""
    try:
        res = subprocess.run(
            ['identify', '-format', '%w %h %m', str(path)],
            capture_output=True,
            text=True,
            check=True
        )
        parts = res.stdout.strip().split()
        if len(parts) >= 2:
            return int(parts[0]), int(parts[1]), parts[2] if len(parts) > 2 else 'IMG'
    except Exception:
        pass
    return None, None, 'UNKNOWN'

def convert_image(src_path: Path, dest_path: Path, max_dim: int, quality: int):
    """Converts a single image to progressive WebP with dimension limits."""
    t0 = time.time()
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        'magick', str(src_path),
        '-resize', f'{max_dim}x{max_dim}>',
        '-strip',
        '-quality', str(quality),
        str(dest_path)
    ]
    subprocess.run(cmd, check=True)
    elapsed = time.time() - t0
    in_size = src_path.stat().st_size / 1024
    out_size = dest_path.stat().st_size / 1024
    w, h, _ = probe_image(dest_path)
    return {
        'name': dest_path.name,
        'in_kb': in_size,
        'out_kb': out_size,
        'elapsed': elapsed,
        'width': w,
        'height': h,
        'ratio': (w / h) if (w and h) else 1.0
    }

def main():
    parser = argparse.ArgumentParser(description="Parallel CAD/CGI Render Batch Optimizer")
    parser.add_argument('--src', type=str, required=True, help="Source directory containing raw renders")
    parser.add_argument('--dest', type=str, required=True, help="Destination directory for WebP assets")
    parser.add_argument('--max-dim', type=int, default=2048, help="Max width or height in px (default 2048)")
    parser.add_argument('--quality', type=int, default=82, help="WebP compression quality (default 82)")
    parser.add_argument('--workers', type=int, default=8, help="Number of concurrent worker threads (default 8)")
    parser.add_argument('--clean-raw', action='store_true', help="Remove raw masters from dest if pre-existing")

    args = parser.parse_args()
    src_dir = Path(args.src).resolve()
    dest_dir = Path(args.dest).resolve()

    if not src_dir.exists():
        print(f"❌ Error: Source directory does not exist: {src_dir}", file=sys.stderr)
        sys.exit(1)

    dest_dir.mkdir(parents=True, exist_ok=True)

    # Collect source files
    source_files = [
        p for p in src_dir.iterdir()
        if p.is_file() and p.suffix.lower() in VALID_EXTENSIONS and not p.name.endswith('.webp')
    ]

    if not source_files:
        print(f"⚠️ No raw image files found in {src_dir}")
        sys.exit(0)

    print("=" * 72)
    print("⚡ Fast Project Onboarding: Parallel Render Optimizer")
    print(f"  Source:      {src_dir}")
    print(f"  Destination: {dest_dir}")
    print(f"  Files:       {len(source_files)} raw assets")
    print(f"  Max Bounds:  {args.max_dim}px | Quality: {args.quality}% | Workers: {args.workers}")
    print("=" * 72)

    tasks = []
    for sf in sorted(source_files):
        # Slugify or clean destination filename
        stem = sf.stem.replace(' ', '-').replace('_', '-').lower()
        if stem.endswith('.jpg') or stem.endswith('.png'):
            stem = Path(stem).stem
        dest_file = dest_dir / f"{stem}.webp"
        tasks.append((sf, dest_file))

    t_start = time.time()
    results = []

    def worker(item):
        s, d = item
        return convert_image(s, d, args.max_dim, args.quality)

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        results = list(executor.map(worker, tasks))

    total_time = time.time() - t_start

    total_in_mb = sum(r['in_kb'] for r in results) / 1024
    total_out_mb = sum(r['out_kb'] for r in results) / 1024
    savings = (1 - (total_out_mb / total_in_mb)) * 100 if total_in_mb > 0 else 0

    print("\n--- Asset Manifest & Aspect Ratios ---")
    full_width_indexes = []
    for idx, r in enumerate(results):
        ratio_desc = "16:9 Widescreen" if r['ratio'] >= 1.6 else ("1:1 Square" if 0.95 <= r['ratio'] <= 1.05 else "Portrait/Vertical")
        if r['ratio'] >= 1.5:
            full_width_indexes.append(idx)
        print(f" [{idx:02d}] {r['name']:<28} | {r['width']}x{r['height']} ({r['ratio']:.2f}) | {ratio_desc:<15} | {r['out_kb']:6.1f} KB")

    print("-" * 72)
    print(f"✨ Converted {len(results)} images in {total_time:.2f}s ({total_in_mb:.1f}MB → {total_out_mb:.2f}MB, {savings:.1f}% reduction)")
    print(f"💡 Recommended fullWidthIndexes for projects.js: {full_width_indexes}")

    if args.clean_raw and dest_dir == src_dir:
        cleaned = 0
        for sf in source_files:
            sf.unlink()
            cleaned += 1
        print(f"🧹 Cleaned {cleaned} raw source files from public bundle.")

if __name__ == '__main__':
    main()
