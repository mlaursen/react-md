import Fuse from 'fuse.js';
import { toTitle } from 'utils/strings';
import { baseRoutes } from 'server/routes';
import proptypesDatabase from 'server/databases/proptypeLinks.json';
import sassdocsDatabase from 'server/databases/sassdocLinks';

const searchRoutes = baseRoutes.map((route) => {
  let upgrade = false;
  let name = route.replace(/\/(components(\/helpers)?|customization|getting-started|discover-more)\//, '');
  if (name.match(/pickers|progress/)) {
    const [section, component] = name.split('/');
    name = `${component}-${section}`;
  } else if (name.match(/selection-controls/)) {
    name = name.substring(name.indexOf('/') + 1);
    if (!name.endsWith('s')) {
      name += 's';
    }
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

function isInt(x) {
  return !Number.isNaN(x) && x % 1 === 0;
}

export default function search(req, res) {
  const { q } = req.query;
  let { start, limit } = req.query;

  if (!start) {
    start = 0;
  }

  if (!limit) {
    limit = 10;
  }

  if (!q || !isInt(start) || !isInt(limit) || start < 0 || limit > 50 || limit < 1) {
    res.sendStatus(400);
    return;
  }
  start = parseInt(start, 10);
  limit = parseInt(limit, 10);

  const data = indexer.search(q);

  const total = data.length;
  if (start > total) {
    res.sendStatus(400);
    return;
  }

  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`.replace(/\?.*/, '');
  let next = null;
  let previous = null;
  if (total > start + limit) {
    next = `${url}?q=${q}&start=${start + limit}&limit=${limit}`;
  }

  if (start + limit > limit) {
    previous = `${url}&start=${Math.max(0, start - limit)}&limit=${limit}`;
  }

  res.json({
    meta: {
      start,
      limit,
      total,
      next,
      previous,
    },
    data: data.slice(start, start + limit),
  });
}
