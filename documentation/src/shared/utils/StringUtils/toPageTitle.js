import toTitle from './toTitle';

export default function toPageTitle(pathname) {
  const path = pathname.replace('/', '');
  if (!path) {
    return '';
  }

  return toTitle(path.split('/').reverse()[0]);
}
