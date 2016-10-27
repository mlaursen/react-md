export default function toClassName(string) {
  return string.split(' ').map(s => s.toLowerCase()).join('-');
}
