import flatten from 'utils/ListUtils/flatten';
import toClassName from 'utils/StringUtils/toClassName';

import findDocgenComponents from './findDocgenComponents';

/**
 * Builds the search list for any component prop types.
 *
 * @return {Array.<Object>} a list of prop type search routes.
 */
export default async function buildPropTypesList() {
  const stats = await findDocgenComponents();
  const components = flatten(stats.map(({ components: cs, folder }) => cs.map(c => ({ component: c.replace('inject', ''), folder }))));

  return components.map(({ component: c, folder }) => {
    const pluralized = `${c}${!c.match(/^tab/i) && !folder.match(/helpers/i) ? 's' : ''}`;
    const lowerName = toClassName(c).replace(/-inked/, '');
    const ref = `#${lowerName}-proptypes`;
    let link = toClassName(folder);
    if (link.match(/helpers|pickers|progress/)) {
      link = `${link}/${lowerName.replace(/-(picker|progress)/, '')}`;
    }

    return {
      name: pluralized,
      ref: `/components/${link}?tab=1${ref}`,
      type: 'Prop Types',
    };
  });
}
