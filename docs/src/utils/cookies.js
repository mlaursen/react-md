import { ROOT_PATH } from 'constants/application';

const EXPIRES = new Date();
EXPIRES.setYear(2000);

const MAX_AGE = new Date();
MAX_AGE.setYear(MAX_AGE.getFullYear() + 5);

export function create(name, content, maxAge = MAX_AGE) {
  document.cookie = `${name}=${content}; maxAge=${maxAge}; path=${ROOT_PATH}`;
}

export function remove(name) {
  document.cookie = `${name}=; expires=${EXPIRES}; path=${ROOT_PATH}`;
}

export function getParsedCookie() {
  if (!__CLIENT__) {
    return null;
  }

  const cookie = decodeURIComponent(document.cookie);
  if (!cookie) {
    return null;
  }

  const parts = cookie.split(/; +?/);
  return parts.reduce((parsed, part) => {
    const [key, value] = part.split('=');
    if (key) {
      parsed[key] = value;
    }

    return parsed;
  }, {});
}
