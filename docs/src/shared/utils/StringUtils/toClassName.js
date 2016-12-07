export default function toClassName(string) {
  return string.split(/\s|(?=[A-Z])/).join('-').toLowerCase();
}
