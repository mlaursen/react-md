function findPagePosition(direction) {
  const key = `scroll${direction}`;
  return Math.max(
    document.body[key],
    document.documentElement[key]
  );
}


export default function calcPageOffset(el) {
  if (!el) {
    return null;
  }

  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + findPagePosition('Left'),
    top: rect.top + findPagePosition('Top'),
  };
}
