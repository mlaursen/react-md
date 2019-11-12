import Fuse from 'fuse.js';
import { toTitle } from 'utils/strings';
import { baseRoutes } from 'server/routes';
import proptypesDatabase from 'server/databases/proptypeLinks.json';
import sassdocsDatabase from 'server/databases/sassdocLinks.json';
import examplesDatabase from 'server/databases/examplesLinks.json';
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

const database = [...searchRoutes, ...proptypesDatabase, ...sassdocsDatabase, ...examplesDatabase];

const indexer = new Fuse(database, {
  keys: [{
    name: 'name',
    weight: 0.50,
  }, {
    name: 'type',
    weight: 0.35,
  }, {
    name: 'description',
    weight: 0.15,
  }],
});

export default createPaginatedRoute(q => indexer.search(q), { omitKeys: 'description' });
