export default function isPrivate(s, docblock) {
  return s.charAt(0) === '_' || (docblock && docblock.includes('@private'));
}
