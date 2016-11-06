export default function hasStorage() {
  try {
    const key = 'react-md';
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

