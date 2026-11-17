#!/usr/bin/env python3
"""
Curated Image Optimization Pipeline for Crayola Design Studio
Converts and compresses raw print/render masters (60-100MB PNGs) into 
ultra-optimized, progressive WebP images (~150-350KB) for the 4 Top Selected Works:
  1. Anthem Villa (N Studios)
  2. Rudra (3D Master Layout & Zones)
  3. Santhosh Project
  4. Jonathan

Ensures optimal web performance with crisp visual fidelity.
"""

import os
import subprocess
import time
from pathlib import Path

SOURCE_ROOT = Path("/run/media/charlie/76DA2338DA22F3D1/cds")
DEST_ROOT = Path(__file__).parent.parent / "frontend-react" / "public" / "projects" / "selected"

# Curation registry mapping destination filenames to source paths
CURATION_MAP = {
    # 1. Rudra 3D Master Layout & Township Zones
    "rudra/master-layout-3d.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "LAYOUT" / "layout 01.png",
    "rudra/master-layout-plan.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "LAYOUT" / "layout 02.png",
    "rudra/entrance-arch.webp": SOURCE_ROOT / "RUDRA PROJECT" / "FOR BROUCHER 20.06" / "Image.png",
    "rudra/clubhouse-pool.webp": SOURCE_ROOT / "RUDRA PROJECT" / "FOR BROUCHER 20.06" / "club house.png",
    "rudra/tennis-court.webp": SOURCE_ROOT / "RUDRA PROJECT" / "tennis court.png",
    "rudra/temple.webp": SOURCE_ROOT / "RUDRA PROJECT" / "FOR BROUCHER 20.06" / "Image_1.png",
    "rudra/park-promenade.webp": SOURCE_ROOT / "RUDRA PROJECT" / "FOR BROUCHER 20.06" / "Scene 106.png",
    "rudra/park-gazebo.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "FINAL" / "HUT.png",
    # Client-selected apartment renders:
    "rudra/apartment-01.webp": Path("/home/charlie/Games/Projects/crayoladesignstudio/resources/plot no . 47 appartment 2.png"),
    "rudra/apartment-02.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "FINAL" / "Scene 23.png",
    "rudra/street-view-01.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "UPLOADS 06.06" / "STREET VIEW 2.png",
    "rudra/street-view-02.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "UPLOADS 06.06" / "STREET VIEW 3.png",
    "rudra/street-view-03.webp": SOURCE_ROOT / "RUDRA PROJECT" / "RENDERED PHOTOS" / "UPLOADS 06.06" / "STREET VIEW 4.png",
    "rudra/street-view-04.webp": SOURCE_ROOT / "RUDRA PROJECT" / "FOR BROUCHER 20.06" / "Scene 107.png",

    # 2. Anthem Villa (N Studios)
    "anthem-villa/hero-facade.webp": SOURCE_ROOT / "Anthem Villa Renders" / "JPEG" / "OUTDOOR" / "outdoor 1.jpg",
    "anthem-villa/outdoor-lounge.webp": SOURCE_ROOT / "Anthem Villa Renders" / "JPEG" / "OUTDOOR" / "outdoor 3.jpg",
    "anthem-villa/close-up-entrance.webp": SOURCE_ROOT / "ANTHEM VILLA CLOSE UP SHOTS" / "C 1.png",
    "anthem-villa/close-up-balcony.webp": SOURCE_ROOT / "ANTHEM VILLA CLOSE UP SHOTS" / "C 3.png",
    "anthem-villa/grand-living.webp": SOURCE_ROOT / "Anthem Villa Renders" / "JPEG" / "F.F LIVING" / "LIVING COMMON 1.jpg",
    "anthem-villa/home-theatre.webp": SOURCE_ROOT / "Anthem Villa Renders" / "JPEG" / "HOME THEATRE" / "HOME THEATRE.jpg",
    "anthem-villa/master-bedroom.webp": SOURCE_ROOT / "Anthem Villa Renders" / "JPEG" / "BED ROOMS" / "MASTER BED 3" / "master bed 3.jpg",

    # 3. Santhosh Project
    "santhosh/hero-living.webp": SOURCE_ROOT / "SANTHOSH PROJECT - 1" / "Scene 11.png",
    "santhosh/dining-suite.webp": SOURCE_ROOT / "SANTHOSH PROJECT - 1" / "Scene 12.png",
    "santhosh/entertainment-wall.webp": SOURCE_ROOT / "SANTHOSH PROJECT - 1" / "Scene 10_1.png",
    "santhosh/lounge-seating.webp": SOURCE_ROOT / "SANTHOSH PROJECT - 1" / "Scene 14.png",
    "santhosh/exterior-elevation.webp": SOURCE_ROOT / "For Master engineer" / "exterior" / "exterior" / "SANTHOSH" / "E 04.jpg",
    "santhosh/exterior-side-angle.webp": SOURCE_ROOT / "For Master engineer" / "exterior" / "exterior" / "SANTHOSH" / "E 06.jpg",

    # 4. Jonathan (Luxury Interior Suite)
    "jonathan/hero-living.webp": SOURCE_ROOT / "Jonathan jpeg" / "LIVING AND DINING" / "LIVING.jpg",
    "jonathan/dining-suite.webp": SOURCE_ROOT / "Jonathan jpeg" / "LIVING AND DINING" / "LIVING 3.jpg",
    "jonathan/lounge-area.webp": SOURCE_ROOT / "Jonathan jpeg" / "LOUNGE" / "L 2.jpg",
    "jonathan/bar-counter.webp": SOURCE_ROOT / "Jonathan jpeg" / "BAR" / "BAR.jpg",
    "jonathan/master-bed.webp": SOURCE_ROOT / "Jonathan jpeg" / "BEDS" / "L 2.jpg",
    "jonathan/kids-bedroom.webp": SOURCE_ROOT / "Jonathan jpeg" / "CHILDREN_S BED" / "children_s bed.jpg",
}

def optimize_image(src_path: Path, dest_path: Path, max_dim: int = 2048, quality: int = 82):
    """Resizes and encodes an image to modern WebP with ImageMagick."""
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    cmd = [
        "magick",
        str(src_path),
        "-resize", f"{max_dim}x{max_dim}>",
        "-strip",
        "-quality", str(quality),
        str(dest_path)
    ]
    
    subprocess.run(cmd, check=True)

def main():
    print("=" * 65)
    print("🎨 Crayola Design Studio — Image Optimization Pipeline")
    print(f"Source: {SOURCE_ROOT}")
    print(f"Target: {DEST_ROOT}")
    print("=" * 65)

    if not SOURCE_ROOT.exists():
        print(f"❌ Error: External drive not accessible at {SOURCE_ROOT}")
        return

    total = len(CURATION_MAP)
    success = 0
    total_in_bytes = 0
    total_out_bytes = 0
    start_time = time.time()

    for idx, (rel_dest, src_path) in enumerate(CURATION_MAP.items(), 1):
        dest_path = DEST_ROOT / rel_dest
        
        if not src_path.exists():
            print(f"[{idx}/{total}] ⚠️ Missing source file: {src_path.name}")
            continue

        in_size = src_path.stat().st_size
        total_in_bytes += in_size

        try:
            optimize_image(src_path, dest_path)
            out_size = dest_path.stat().st_size
            total_out_bytes += out_size
            success += 1
            savings = ((in_size - out_size) / in_size) * 100
            print(f"[{idx}/{total}] ✅ {rel_dest} | {in_size/(1024*1024):.1f} MB ➔ {out_size/1024:.1f} KB ({savings:.1f}% saved)")
        except Exception as e:
            print(f"[{idx}/{total}] ❌ Failed to optimize {src_path.name}: {e}")

    elapsed = time.time() - start_time
    print("\n" + "=" * 65)
    print(f"🎉 Optimization Complete in {elapsed:.1f}s!")
    print(f"   Processed: {success}/{total} images")
    print(f"   Raw size:  {total_in_bytes / (1024*1024):.1f} MB")
    print(f"   Web size:  {total_out_bytes / (1024*1024):.2f} MB ({(1 - total_out_bytes/total_in_bytes)*100:.1f}% bandwidth reduction)")
    print("=" * 65)

if __name__ == "__main__":
    main()
