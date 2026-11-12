/* Hallmark · shape: settled · genre: modern-minimal · theme: Khetala Ledger (bespoke) · v2.0.0
 * khetala-i18n.js — Language preference: redirect en ↔ ne on page load */
'use strict';

(function () {
  var STORAGE_KEY = 'khetala_lang';
  var path = window.location.pathname;

  // Detect current page language from URL structure
  // /khetala/np/ or /khetala/np/index.html → Nepali
  // All others → English
  var isNepaliPage = /\/khetala\/np(\/|$)/.test(path);

  var stored;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch {}

  if (stored === 'ne' && !isNepaliPage) {
    // User prefers Nepali but is on English page — redirect to np/
    // Find the khetala root to construct np/ path
    var match = path.match(/^(.*\/khetala\/)(.*)/);
    if (match) {
      var base = match[1]; // e.g. /khetala/
      var rest = match[2]; // e.g. '' or 'features.html'
      // Only redirect from root index, not sub-pages (features, download, etc.)
      if (!rest || rest === 'index.html') {
        window.location.replace(base + 'np/');
      }
    }
  } else if (stored === 'en' && isNepaliPage) {
    // User prefers English but is on Nepali page — redirect to khetala root
    var npMatch = path.match(/^(.*\/khetala\/)np\/(.*)/);
    if (npMatch) {
      window.location.replace(npMatch[1]);
    }
  }
})();
