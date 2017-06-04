export function create(name, content, maxAge = null) {
  let cookie = `${name}=${content}`;
  if (maxAge) {
    cookie += `; maxAge=${maxAge}`;
  }

  document.cookie = cookie;
}

export function remove(name) {
  document.cookie = `${name}=; maxAge=${new Date().toUTCString()}; path=/`;
}
