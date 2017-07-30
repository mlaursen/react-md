/*
 Copyright 2015 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// This isn't entirely that file, but might as well copy/paste it to be safe.

const OFFLINE_URL = 'offline.html';
const CACHE_NAME = 'offline-__CACHE_ID__-v1';

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map((cacheName) => {
    if (cacheName.match(/^offline/) && cacheName !== CACHE_NAME) {
      return caches.delete(cacheName);
    }

    return null;
  }))));
});

function createCacheBustedRequest(url) {
  const request = new Request(url, { cache: 'reload' });
  if ('cache' in request) {
    return request;
  }

  const bustedUrl = new URL(url, self.location.href);
  bustedUrl.search = `${bustedUrl.search ? '&' : ''}cachebust=${Date.now()}`;
  return new Request(bustedUrl);
}

self.addEventListener('install', (event) => {
  event.waitUntil(fetch(createCacheBustedRequest(OFFLINE_URL))
    .then(response => caches.open(CACHE_NAME).then(cache => cache.put(OFFLINE_URL, response))));
});

self.addEventListener('fetch', (event) => {
  const { mode, method, headers } = event.request;
  if (mode === 'navigate' || (method === 'GET' && headers.get('accept').includes('text/html'))) {
    event.respondWith(fetch(event.request).catch((error) => {
      console.log('Fetch failed; returning offline page instead.', error);
      return caches.match(OFFLINE_URL);
    }));
  }
});
