import { flattenDeep } from 'lodash/array';
import { kebabCase } from 'lodash/string';
import pluralize from 'pluralize';

import { ROOT_PATH } from 'constants/application';

export default function getPropTypeLinks(documentableComponents) {
  return flattenDeep(documentableComponents.map(({ components: cs, folder }) => cs.map(c => ({
    folder,
    component: c.replace('inject', ''),
  })))).map(({ component: c, folder }) => {
    const name = c.endsWith('ss') || c === 'Tab' ? c : pluralize(c);
    let pluralized = '';
    if (name.match(/^SVG/)) {
      pluralized = 'SVG Icons';
    } else {
      pluralized = name.replace(/([A-Z])/g, ' $1').trim();
    }
    const kebabCased = kebabCase(folder.match(/helpers/i) ? pluralized : c).replace('-inked', '');
    const ref = `#${kebabCased}-proptypes`;
    let link = kebabCase(folder);
    if (link.match(/helpers|pickers|progress/)) {
      link = `${link}/${kebabCased.replace(/-(picker|progress)/, '')}`;
    }

    return {
      name: pluralized,
      ref: `${ROOT_PATH}components/${link}?tab=1${ref}`,
      type: 'Prop Types',
    };
  });
}
