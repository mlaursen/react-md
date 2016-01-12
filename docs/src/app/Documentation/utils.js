export const splitOnCaps = s => s.split(/(?=[A-Z1-9])/);

function getString(s) {
  return !(s instanceof Array) ? splitOnCaps(s) : s;
}

export const toDashedName = (s) => getString(s).map(s => s.toLowerCase()).join('-');
export const toTitle = (s) => getString(s).join(' ');
