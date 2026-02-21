/**
 * ExamGuides Service Worker
 * Strategy: Cache-First for assets, Network-First for HTML pages
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `examguides-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/css/main.css',
  '/js/app.js',
  '/search-index.json',
  '/manifest.json',
];

// ── Install: precache core assets ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
    }).catch((err) => {
      console.warn('[SW] Precache failed for some assets:', err);
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ─────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('examguides-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ── Fetch: Network-first for navigation, Cache-first for assets ────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip analytics, ads, and dynamic endpoints
  if (
    url.pathname.includes('/pagead/') ||
    url.pathname.includes('/gtag/') ||
    url.pathname.includes('/analytics')
  ) return;

  if (request.mode === 'navigate') {
    // HTML pages: Network-first with offline fallback
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
  } else {
    // Assets (CSS, JS, images, JSON): Cache-first
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => new Response('', { status: 408, statusText: 'Network unavailable' }));
      })
    );
  }
});
