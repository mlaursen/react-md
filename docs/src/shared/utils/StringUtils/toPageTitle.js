import toTitle from './toTitle';

export default function toPageTitle(pathname) {
  const path = pathname.replace('/', '');
  if (!path) {
    return '';
  }

  const [id, section] = path.split('/').reverse();
  if (path.match(/upgrade-guides/)) {
    return `Upgrade to ${id}`;
  } else if (section && section.match(/pickers|progress/)) {
    return toTitle(`${id}-${section}`);
  }

  return toTitle(id);
}
