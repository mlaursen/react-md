export default function getScrollbarWidth() {
  const container = document.createElement('div');
  container.style = 'visibility:hidden;width:100px;';
  container.style.msOverflowStyle = 'scrollbar';

  document.body.appendChild(container);

  const { offsetWidth: noScrollWidth } = container;
  container.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  container.appendChild(inner);

  const { offsetWidth: withScrollWidth } = inner;

  document.body.removeChild(container);
  return noScrollWidth - withScrollWidth;
}
