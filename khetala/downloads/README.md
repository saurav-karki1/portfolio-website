# Digital Khetala Hisab-Kitab: APK Distribution & Release Procedures

This directory contains the release manifest configuration (`version.json`) and release changelog history (`releases.json`) for **Digital Khetala Hisab-Kitab**.

---

## 1. Physical APK Verification Summary

| Property | Value |
|---|---|
| **Binary File** | `Hisab-Kitab-release.apk` |
| **Physical Location** | `D:\Digital Khetala Hisab-Kitab\build_apks\Hisab-Kitab-release.apk` |
| **Package ID** | `com.khetala.digital_khetala_hisab_kitab` |
| **Version Name** | `1.0.0` |
| **Version Code / Build** | `1` (`1.0.0+1`) |
| **File Size** | `73,613,879` bytes (~`70.20` MB / `70.20` MiB) |
| **Target Android** | Android 5.0+ (API 21+) up to Android 14 (API 34) |
| **Bundled Native ABIs** | `arm64-v8a` (modern 64-bit), `armeabi-v7a` (legacy 32-bit), `x86_64` (tablets/emulators) |
| **Bundled SQLite Engine** | Drift SQLite (`libsqlite3.so` bundled for all 3 architectures) |

### Cryptographic Signatures

- **SHA-256:** `670B6C4787EE67676E30DE68E2A7BB533C902FA54F585AED8BC617461E8D00DC`
- **MD5:** `D301452B8298B74BCED97256046839C4`
- **SHA-1:** `F4DA57E16382753B942763A31ABEF1F625EE05F8`

---

## 2. APK Hosting Strategy: Why GitHub Releases is Preferred

### Problem with Committing APK Directly to Git Repo:
1. **Repository Bloat:** Storing a ~70.2 MB binary directly in the git tree increases clone times, inflates the `.git` directory permanently, and slows down every CI/CD deployment.
2. **GitHub Repository Limits:** GitHub limits individual files to 100 MB and warns at 50 MB. Subsequent versions would multiply the repository size rapidly.
3. **Cloudflare & CDN Caching:** GitHub Pages is optimized for small text/static web assets. Binaries in GitHub Releases leverage GitHub's distributed Fastly CDN edges built specifically for large asset downloads with resume support.

### Recommended Standard Hosting:
- Upload binary assets to **GitHub Releases** under the target repository:
  `https://github.com/saurav-karki1/portfolio-website/releases`
- Asset download link format:
  `https://github.com/saurav-karki1/portfolio-website/releases/download/v1.0.0/Hisab-Kitab-release.apk`
- The static manifest `khetala/downloads/version.json` points directly to this CDN link.
- In-app update checkers and website visitors both fetch `version.json` with negligible bandwidth (< 4 KB), checking if their local `version_code` is less than `latest_version_code`.

---

## 3. How to Publish a New APK Release

When a new build is produced in Flutter:

1. **Build the release APK:**
   ```bash
   flutter build apk --release
   ```
2. **Compute the SHA-256 hash:**
   - **PowerShell (Windows):**
     ```powershell
     Get-FileHash -Path "build\app\outputs\flutter-apk\app-release.apk" -Algorithm SHA256
     ```
   - **Linux / macOS:**
     ```bash
     shasum -a 256 build/app/outputs/flutter-apk/app-release.apk
     ```
3. **Draft a GitHub Release:**
   - Go to `https://github.com/saurav-karki1/portfolio-website/releases/new`.
   - Tag version: `v1.0.0` (or next version tag).
   - Release title: `v1.0.0 Initial Production Release`.
   - Attach file: Drag and drop `Hisab-Kitab-release.apk`.
   - Click **Publish release**.
4. **Update `version.json` and `releases.json`:**
   - Update `latest_version`, `version_code`, `file_size_bytes`, `apk_sha256`, and changelog.
   - Commit and push `version.json` and `releases.json`. GitHub Pages will immediately serve the updated manifest.

---

## 4. Manifest Endpoints

- **Live Manifest URL:** `https://www.sauravkarki1.com.np/khetala/downloads/version.json`
- **Releases History URL:** `https://www.sauravkarki1.com.np/khetala/downloads/releases.json`
- **Primary Direct Download:** `https://github.com/saurav-karki1/portfolio-website/releases/download/v1.0.0/Hisab-Kitab-release.apk`
