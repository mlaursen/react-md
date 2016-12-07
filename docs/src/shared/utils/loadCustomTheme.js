import getLink from './getLink';

export default function loadCustomTheme(primary, secondary, hue, light) {
  const link = getLink('preview-link');

  link.href = `/themes/${primary.replace('-', '_')}-${secondary.replace('-', '_')}-${hue}${light ? '' : '-dark'}.css`;
}
