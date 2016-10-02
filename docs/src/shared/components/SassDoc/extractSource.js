export default function extractSource(raw, { start: sourceStart, end }, { end: commentEnd } = {}) {
  const start = commentEnd ? commentEnd + 1 : sourceStart;

  const split = raw.split(/\r?\n/);

  if (start === end) {
    return split[start - 1];
  }

  return split.slice(start - 1, end - 1).join('\n');
}
