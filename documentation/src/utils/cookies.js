const EXPIRES = new Date();
EXPIRES.setYear(2000);

const MAX_AGE = new Date();
MAX_AGE.setYear(MAX_AGE.getFullYear() + 5);

export function create(name, content, maxAge = MAX_AGE) {
  document.cookie = `${name}=${content}; maxAge=${maxAge}; path=/`;
}

export function remove(name) {
  document.cookie = `${name}=; expires=${EXPIRES}; path=/`;
}
