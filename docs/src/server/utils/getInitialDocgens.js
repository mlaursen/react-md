import fetch from 'actions/fetch';
import { API_URL } from 'constants/application';

export default async function getInitialDocgens(pathname, component, section) {
  if (!pathname.match(/components/)) {
    return {};
  }

  const ids = [section, component].filter(id => !!id);

  const docgens = await fetch(`${API_URL}/docgens/${ids.join('/')}`);

  if (ids.length === 2) {
    return {
      [ids[0]]: { [ids[1]]: docgens },
    };
  }

  return {
    [ids[0]]: docgens,
  };
}
