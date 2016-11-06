import toTitle from './toTitle';

export default function toPageTitle(pathname) {
  const path = pathname.replace('/', '');
  if (!path) {
    return '';
  }

  const id = path.split('/').reverse()[0];
  if (path.match(/upgrade-guides/)) {
    return `Upgrade to ${id}`;
  }

  return toTitle(id);
}
