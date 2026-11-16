#!/usr/bin/env python3
"""
Robust FTPS Deployment Script for D5 360 Virtual Tour
Uploads Villa 1 master resources to /tour/villa1/ on mars.clouds-servers.com
Prioritizes core interactive viewer files first so the tour is live immediately.
Skips redundant desktop-only OpenEXR (.exr) and point cloud (.pcd) files.
"""

import ftplib
import io
import os
import ssl
import sys
import time
from pathlib import Path

FTP_HOST = os.getenv("FTP_HOST", "mars.clouds-servers.com")
FTP_USER = os.getenv("FTP_USER", "cds")
FTP_PASS = os.getenv("FTP_PASS", "n9b2^3vD6")

# Check .ftp-secret file if present
secret_file = Path(__file__).parent.parent / ".ftp-secret"
if secret_file.exists():
    try:
        content = secret_file.read_text().strip()
        if ":" in content:
            FTP_USER, FTP_PASS = content.split(":", 1)
        else:
            FTP_PASS = content
    except Exception:
        pass

SOURCE_DIR = Path("/home/charlie/Games/Projects/crayoladesignstudio/resources/360/villa 1/_Resource")
REMOTE_BASE_DIR = "tour/villa1"
EXCLUDE_EXTENSIONS = {".exr", ".pcd"}

def get_ftps():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    ftps = ftplib.FTP_TLS(context=ctx, timeout=60)
    ftps.connect(FTP_HOST, 21)
    ftps.login(FTP_USER, FTP_PASS)
    ftps.prot_p()
    ftps.set_pasv(True)
    return ftps

def ensure_remote_dir(ftps, remote_dir):
    parts = remote_dir.strip("/").split("/")
    current = ""
    for part in parts:
        current = f"{current}/{part}" if current else part
        try:
            ftps.mkd(current)
        except ftplib.error_perm:
            pass

def collect_files(source_dir):
    core = []       # index.html, tour.xml, etc.
    ui = []         # skin, res, plugins
    thumbs = []     # PanoThumbnail
    tiles = []      # tiles/ (cubemaps)
    images = []     # images/ (backgrounds, depth, normals)

    for p in source_dir.rglob("*"):
        if not p.is_file():
            continue
        if p.suffix.lower() in EXCLUDE_EXTENSIONS:
            continue
        
        rel = str(p.relative_to(source_dir))
        if rel in ["index.html", "tour.xml", "gen.xml", "d5.xml", "user.xml", "d5.js", "tour.js", "meta.json", "favicon.ico"]:
            core.append(p)
        elif rel.startswith(("skin", "res", "plugins")):
            ui.append(p)
        elif rel.startswith("PanoThumbnail"):
            thumbs.append(p)
        elif rel.startswith("tiles"):
            tiles.append(p)
        else:
            images.append(p)

    return core + ui + thumbs + tiles + images

def deploy():
    if not SOURCE_DIR.exists():
        print(f"❌ Error: Source directory does not exist: {SOURCE_DIR}")
        sys.exit(1)

    print("=" * 65)
    print("🚀 Crayola Design Studio — D5 360 Virtual Tour Deployment")
    print(f"Target: ftps://{FTP_HOST}/{REMOTE_BASE_DIR}/")
    print("=" * 65)

    all_files = collect_files(SOURCE_DIR)
    total_bytes = sum(f.stat().st_size for f in all_files)
    total_count = len(all_files)
    print(f"\n📦 Files to upload: {total_count} files ({total_bytes / (1024*1024):.1f} MB)")
    print("⚡ Prioritizing: Core Engine -> UI & Skin -> Thumbnails -> Tiles -> Images\n")

    ftps = get_ftps()
    print("✅ Connected to FTPS server.")

    ensure_remote_dir(ftps, "tour")
    ensure_remote_dir(ftps, REMOTE_BASE_DIR)

    # 1. Upload root /tour/index.html redirect
    redirect_html = (
        '<!DOCTYPE html><html><head>'
        '<meta http-equiv="refresh" content="0; url=/tour/villa1/">'
        '<script>window.location.href="/tour/villa1/";</script>'
        '</head><body>Redirecting to Villa 1 Virtual Tour...</body></html>'
    ).encode("utf-8")
    try:
        ftps.storbinary("STOR tour/index.html", io.BytesIO(redirect_html))
        print("✅ Created /tour/index.html redirect to /tour/villa1/")
    except Exception as e:
        print(f"Notice: /tour/index.html write: {e}")

    # 2. Upload res/ to /tour/res/ as well for publicPath safety
    res_dir = SOURCE_DIR / "res"
    if res_dir.exists():
        ensure_remote_dir(ftps, "tour/res")
        for rp in res_dir.glob("*"):
            if rp.is_file():
                try:
                    with open(rp, "rb") as rf:
                        ftps.storbinary(f"STOR tour/res/{rp.name}", rf)
                except Exception:
                    pass
        print("✅ Synced shared /tour/res/ resources.")

    uploaded_bytes = 0
    skipped_count = 0
    uploaded_count = 0
    start_time = time.time()

    for idx, local_path in enumerate(all_files, 1):
        rel_path = local_path.relative_to(SOURCE_DIR)
        remote_path = f"{REMOTE_BASE_DIR}/{rel_path.as_posix()}"
        remote_dir = os.path.dirname(remote_path)
        file_size = local_path.stat().st_size

        if remote_dir:
            ensure_remote_dir(ftps, remote_dir)

        # Check existing size for fast skip/resume
        skip = False
        try:
            remote_size = ftps.size(remote_path)
            if remote_size == file_size:
                skip = True
        except Exception:
            pass

        if skip:
            skipped_count += 1
            uploaded_bytes += file_size
            pct = (uploaded_bytes / total_bytes) * 100
            print(f"[{idx}/{total_count}] ⏩ SKIP: {rel_path} ({file_size/1024:.1f} KB) [{pct:.1f}%]")
            continue

        # Upload with auto-reconnect retry
        uploaded = False
        for attempt in range(4):
            try:
                with open(local_path, "rb") as f:
                    ftps.storbinary(f"STOR {remote_path}", f)
                try:
                    ftps.sendcmd(f"SITE CHMOD 644 {remote_path}")
                except Exception:
                    pass
                uploaded = True
                break
            except Exception as e:
                print(f"  ⚠️ Warning: Retry {attempt+1}/4 on {rel_path}: {e}")
                time.sleep(2)
                try:
                    ftps.close()
                except Exception:
                    pass
                try:
                    ftps = get_ftps()
                    ensure_remote_dir(ftps, remote_dir)
                except Exception as ce:
                    print(f"  ⚠️ Reconnect failed: {ce}")
                    time.sleep(3)

        if uploaded:
            uploaded_count += 1
            uploaded_bytes += file_size
            pct = (uploaded_bytes / total_bytes) * 100
            elapsed = time.time() - start_time
            rate = (uploaded_bytes / 1024 / 1024) / elapsed if elapsed > 0 else 0
            print(f"[{idx}/{total_count}] ⬆️  {rel_path} ({file_size/1024:.1f} KB) [{pct:.1f}% @ {rate:.2f} MB/s]")
        else:
            print(f"[{idx}/{total_count}] ❌ FAILED: {rel_path}")

    try:
        ftps.quit()
    except Exception:
        pass

    print("\n" + "=" * 65)
    print("🎉 D5 360 Tour Deployment Finished!")
    print(f"   Uploaded: {uploaded_count} files")
    print(f"   Skipped:  {skipped_count} files")
    print(f"   Tour URL: https://crayoladesignstudio.com/{REMOTE_BASE_DIR}/index.html")
    print("=" * 65)

if __name__ == "__main__":
    deploy()
