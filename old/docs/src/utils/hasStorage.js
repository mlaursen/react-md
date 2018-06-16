const TEST_STORAGE_KEY = 'react-md';

let storage;

/**
 * Lazily check if storage is enabled
 *
 * @return {Boolean} true if localStorage can be used
 */
export default function hasStorage() {
  if (typeof storage === 'undefined') {
    try {
      const key = TEST_STORAGE_KEY;
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
      storage = true;
    } catch (e) {
      storage = false;
    }
  }

  return storage;
}
