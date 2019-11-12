/* eslint-disable no-console */
// This is pretty much copied from create-react-app except for messages

import { createRefreshMessage } from 'state/messages';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

function registerServiceWorker(swUrl, store) {
  navigator.serviceWorker.register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              store.dispatch(createRefreshMessage());
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    }).catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function registerLocalServiceWorker(swUrl, store) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then((response) => {
    // Ensure service worker exists, and that we really are getting a JS file.
    if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      registerServiceWorker(swUrl, store);
    }
  }).catch(() => {
    console.log('No network available. App is running in offline mode.');
  });
}

export default function register(store) {
  if (!__DEV__ && 'serviceWorker' in navigator) {
    const publicUrl = new URL(PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    const swUrl = `${PUBLIC_URL}/${SERVICE_WORKER}`;
    window.addEventListener('load', () => {
      if (isLocalhost) {
        registerLocalServiceWorker(swUrl, store);
      } else {
        registerServiceWorker(swUrl, store);
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
