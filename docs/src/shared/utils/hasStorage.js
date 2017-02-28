let storage;
export default function hasStorage() {
  if (typeof storage === 'undefined') {
    try {
      const key = 'react-md';
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
      storage = true;
    } catch (e) {
      storage = false;
    }
  }

  return storage;
}

