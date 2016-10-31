export default function loadCustomTheme(primary, secondary, hue, light) {
  let link = document.getElementById('preview-link');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('id', 'preview-link');
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  link.href = `/themes/${primary}.${secondary}-${hue}${light ? '' : '.dark'}.css`;
}
