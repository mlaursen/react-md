import Fuse from 'fuse.js';
import { toTitle } from 'utils/strings';
import { baseRoutes } from 'server/routes';
import proptypesDatabase from 'server/databases/proptypeLinks.json';
import sassdocsDatabase from 'server/databases/sassdocLinks';
import createPaginatedRoute from 'server/utils/createPaginatedRoute';

const searchRoutes = baseRoutes.map((route) => {
  let upgrade = false;
  let name = route.replace(/\/(components(\/helpers)?|customization|getting-started|discover-more)\//, '');
  if (name.match(/pickers|progress/)) {
    const [section, component] = name.split('/');
    name = `${component}-${section}`;
  } else if (name.match(/upgrade/)) {
    upgrade = true;
    const [, version] = name.split('/');
    name = `Upgrade to ${version}`;
  }

  return {
    type: route.indexOf('components') !== -1 ? 'Examples' : 'Info',
    name: upgrade ? name : toTitle(name),
    ref: route,
  };
});
searchRoutes.push({
  name: 'Theme Builder',
  ref: '/customization/themes?tab=1',
  type: 'Info',
});

const database = searchRoutes.concat(proptypesDatabase).concat(sassdocsDatabase);

const indexer = new Fuse(database, {
  keys: [{ name: 'name', weight: 0.85 }, { name: 'type', weight: 0.15 }],
});

export default createPaginatedRoute(q => indexer.search(q));
