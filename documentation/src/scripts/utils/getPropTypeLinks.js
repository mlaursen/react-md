import { flattenDeep } from 'lodash/array';
import { kebabCase } from 'lodash/string';
import pluralize from 'pluralize';

export default function getPropTypeLinks(documentableComponents) {
  return flattenDeep(documentableComponents.map(({ components: cs, folder }) => cs.map(c => ({
    folder,
    component: c.replace('inject', ''),
  })))).map(({ component: c, folder }) => {
    const pluralized = (c.endsWith('ss') || c === 'Tab' ? c : pluralize(c)).replace(/([A-Z])/g, ' $1').trim();
    const kebabCased = kebabCase(pluralized).replace('-inked', '');
    const ref = `#${kebabCased}-proptypes`;
    let link = kebabCase(folder);
    if (link.match(/helpers|pickers|progress/)) {
      link = `${link}/${kebabCased.replace(/-(picker|progress)/, '')}`;
    }

    return {
      name: pluralized,
      ref: `/components/${link}?tab=1${ref}`,
      type: 'Prop Types',
    };
  });
}
