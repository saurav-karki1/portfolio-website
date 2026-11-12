/**
 * Digital Khetala Hisab-Kitab - APK Download & Verification Engine
 * Handles manifest hydration, SHA-256 copy, terminal code switching, interactive hash validation, and QR toggles.
 */

(function () {
  'use strict';

  // Verified Fallback Metadata
  const DEFAULT_RELEASE = {
    version: '1.0.0',
    version_code: 1,
    build_number: 1,
    tag: 'v1.0.0',
    release_date: '2026-11-11',
    release_date_bs: '२०८३-०७-२६',
    file_name: 'Hisab-Kitab-release.apk',
    file_size_formatted: '70.20 MB',
    file_size_bytes: 73613879,
    min_android: 'Android 5.0+ (API 21+)',
    target_android: 'Android 14 (API 34)',
    sha256: '670B6C4787EE67676E30DE68E2A7BB533C902FA54F585AED8BC617461E8D00DC',
    md5: 'D301452B8298B74BCED97256046839C4',
    download_url: 'https://github.com/saurav-karki1/portfolio-website/releases/download/v1.0.0/Hisab-Kitab-release.apk',
    release_page_url: 'https://github.com/saurav-karki1/portfolio-website/releases/tag/v1.0.0'
  };

  const TERMINAL_COMMANDS = {
    powershell: 'Get-FileHash -Path "Hisab-Kitab-release.apk" -Algorithm SHA256',
    bash: 'shasum -a 256 Hisab-Kitab-release.apk',
    termux: 'sha256sum Hisab-Kitab-release.apk'
  };

  function initDownloadModule() {
    setupClipboardButtons();
    setupTerminalTabs();
    setupHashValidator();
    setupQrToggle();
    fetchLiveVersionManifest();
  }

  // 1. Fetch live version.json if served over HTTP
  function fetchLiveVersionManifest() {
    const isNepali = document.documentElement.lang === 'ne';
    const manifestPath = isNepali ? '../downloads/version.json' : 'downloads/version.json';

    fetch(manifestPath)
      .then(response => {
        if (!response.ok) throw new Error('Manifest not found');
        return response.json();
      })
      .then(data => {
        hydratePageWithManifest(data);
      })
      .catch(() => {
        // Fallback already pre-rendered, no disruption
      });
  }

  function hydratePageWithManifest(data) {
    if (!data) return;

    // Update dynamic text if elements exist
    document.querySelectorAll('[data-bind="version"]').forEach(el => {
      el.textContent = 'v' + (data.latest_version || DEFAULT_RELEASE.version);
    });

    document.querySelectorAll('[data-bind="filesize"]').forEach(el => {
      el.textContent = data.file_size_formatted || (data.file_size_mb ? data.file_size_mb + ' MB' : DEFAULT_RELEASE.file_size_formatted);
    });

    document.querySelectorAll('[data-bind="sha256"]').forEach(el => {
      el.textContent = data.apk_sha256 || DEFAULT_RELEASE.sha256;
    });

    document.querySelectorAll('[data-bind="download-btn"]').forEach(el => {
      if (data.download_url) el.setAttribute('href', data.download_url);
    });
  }

  // 2. Clipboard Copy Button
  function setupClipboardButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(button => {
      button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-copy-target');
        const targetEl = document.getElementById(targetId);
        const textToCopy = targetEl ? (targetEl.innerText || targetEl.textContent).trim() : DEFAULT_RELEASE.sha256;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(document.documentElement.lang === 'ne' ? 'चेकसम कपी गरियो!' : 'SHA-256 Checksum copied!');
          }).catch(() => {
            legacyCopy(textToCopy);
          });
        } else {
          legacyCopy(textToCopy);
        }
      });
    });
  }

  function legacyCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(document.documentElement.lang === 'ne' ? 'चेकसम कपी गरियो!' : 'SHA-256 Checksum copied!');
    } catch (e) {
      alert(text);
    }
    document.body.removeChild(textarea);
  }

  function showToast(message) {
    let toast = document.getElementById('kh-dl-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kh-dl-toast';
      toast.className = 'kh-dl-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>✓</span> ' + message;
    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  // 3. Tabbed Terminal Switcher
  function setupTerminalTabs() {
    const tabs = document.querySelectorAll('.kh-dl-term-tab');
    const codeLine = document.getElementById('kh-dl-code-line');
    if (!tabs.length || !codeLine) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('is-active'));
        this.classList.add('is-active');

        const env = this.getAttribute('data-env');
        if (TERMINAL_COMMANDS[env]) {
          codeLine.textContent = TERMINAL_COMMANDS[env];
        }
      });
    });
  }

  // 4. Interactive Hash Validator
  function setupHashValidator() {
    const input = document.getElementById('kh-hash-input');
    const status = document.getElementById('kh-hash-status');
    if (!input || !status) return;

    const isNepali = document.documentElement.lang === 'ne';

    input.addEventListener('input', function () {
      const val = this.value.trim().toUpperCase().replace(/[^A-F0-9]/g, '');
      const expected = DEFAULT_RELEASE.sha256.toUpperCase();

      if (!val) {
        status.innerHTML = '';
        return;
      }

      if (val === expected) {
        status.innerHTML = isNepali 
          ? '<span style="color: var(--color-success)">✓ चेकसम शतप्रतिशत मिल्यो! यो आधिकारिक र सुरक्षित एपीके हो।</span>'
          : '<span style="color: var(--color-success)">✓ Exact Match! Authentic, untampered release package.</span>';
      } else if (expected.startsWith(val)) {
        status.innerHTML = isNepali
          ? '<span style="color: var(--color-accent)">पङ्क्तिबद्ध हुँदैछ... बाँकी क्यारेक्टरहरू प्रविष्ट गर्नुहोस्।</span>'
          : '<span style="color: var(--color-accent)">Matching prefix... continue entering hash.</span>';
      } else {
        status.innerHTML = isNepali
          ? '<span style="color: var(--color-error)">⚠️ चेकसम मिलेन! फाइल पुनः डाउनलोड गर्न अनुरोध गर्दछौं।</span>'
          : '<span style="color: var(--color-error)">⚠️ Hash mismatch! Do not install if checksum does not match.</span>';
      }
    });
  }

  // 5. QR Code Toggle (Desktop Page vs Direct APK Link)
  function setupQrToggle() {
    const toggleBtns = document.querySelectorAll('[data-qr-target]');
    const qrImg = document.getElementById('kh-qr-img');
    const qrCaption = document.getElementById('kh-qr-caption');
    if (!toggleBtns.length || !qrImg) return;

    const isNepali = document.documentElement.lang === 'ne';
    const basePath = isNepali ? '../images/' : 'images/';

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        toggleBtns.forEach(b => b.classList.remove('is-active'));
        this.classList.add('is-active');

        const target = this.getAttribute('data-qr-target');
        if (target === 'direct') {
          qrImg.src = basePath + 'qr-direct-apk.svg';
          if (qrCaption) {
            qrCaption.textContent = isNepali ? 'सीधै एपीके डाउनलोड गर्न स्क्यान गर्नुहोस्' : 'Scan to download APK file directly';
          }
        } else {
          qrImg.src = basePath + 'qr-download.svg';
          if (qrCaption) {
            qrCaption.textContent = isNepali ? 'मोबाइल डाउनलोड पेज खोल्न स्क्यान गर्नुहोस्' : 'Scan to open mobile download page';
          }
        }
      });
    });
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDownloadModule);
  } else {
    initDownloadModule();
  }
})();
