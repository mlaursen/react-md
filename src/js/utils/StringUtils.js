export function addSuffix(str, suffix) {
  if (!str) {
    return str;
  }

  return str.indexOf(suffix) === -1
    ? `${str.trim()} ${suffix}`
    : str;
}
