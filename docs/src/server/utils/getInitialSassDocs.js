import fetch from 'actions/fetch';
import { API_URL } from 'constants/application';

function hasSassDoc(url, tab) {
  return !url.match(/helpers/) &&
    ((url.match(/customization(?!.*(themes|minimizing))/) && tab === '1')
    || (url.match(/themes|components/) && tab === '2'));
}

export default async function getInitialSassocs(pathname, component, section, tab) {
  if (!hasSassDoc(pathname, tab)) {
    return {};
  }

  const ids = [];
  if (!section && !component) {
    ids.push(pathname.substring(pathname.lastIndexOf('/') + 1).replace(/\?.*/, ''));
  } else if (section && section.match(/progress|selection-controls|pickers/)) {
    ids.push(section);
  } else {
    ids.push(component);

    if (section) {
      ids.push(section);
    }
  }

  const sassdocs = await fetch(`${API_URL}/sassdocs/${ids.join('/')}`);
  if (ids.length === 2) {
    return {
      [ids[0]]: { [ids[1]]: sassdocs },
    };
  }

  return {
    [ids[0]]: sassdocs,
  };
}
