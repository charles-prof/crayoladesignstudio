#!/usr/bin/env python3
"""
FTP Deploy script for Crayola Design Studio sprint → ftp.charnithi.com
Uploads all files from dist/ to the FTP root (public_html).
"""

import ftplib
import os
import sys
from pathlib import Path

FTP_HOST = "ftp.charnithi.com"
FTP_USER = "cds"
FTP_PASS = "n9b2^3vD6"
LOCAL_DIR = Path(__file__).parent / "dist"

def upload_dir(ftp, local_dir, remote_dir="/"):
    """Recursively upload a local directory to the FTP server."""
    for item in sorted(local_dir.iterdir()):
        remote_path = f"{remote_dir.rstrip('/')}/{item.name}"
        if item.is_dir():
            # Try to create the directory, ignore if it already exists
            try:
                ftp.mkd(remote_path)
                print(f"  [DIR]  Created {remote_path}")
            except ftplib.error_perm:
                pass  # Already exists
            upload_dir(ftp, item, remote_path)
        else:
            with open(item, "rb") as f:
                ftp.storbinary(f"STOR {remote_path}", f)
                print(f"  [FILE] Uploaded {remote_path}")

def main():
    print(f"\n🚀 Deploying {LOCAL_DIR} → ftp://{FTP_HOST}/\n")
    
    if not LOCAL_DIR.exists():
        print("❌ dist/ folder not found. Run `npx vite build` first.")
        sys.exit(1)

    try:
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, 21, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.set_pasv(True)
        print(f"✅ Connected to {FTP_HOST} as '{FTP_USER}'\n")

        upload_dir(ftp, LOCAL_DIR, remote_dir="/")

        ftp.quit()
        print(f"\n✅ Deploy complete! → http://crayoladesignstudio.com\n")

    except ftplib.all_errors as e:
        print(f"\n❌ FTP error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
