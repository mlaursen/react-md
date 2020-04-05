import { BAD_REQUEST } from 'constants/responseCodes';
import { getUrl } from 'server/utils/getServerUrl';
import { omit } from 'lodash';

function isInt(x) {
  return !Number.isNaN(x) && x % 1 === 0;
}

/**
 * Creates an express route handler for paginating data. The paginated data response will return
 * an object containing meta information and the list of data.
 *
 * The metadata will contain the requested start index, the requested limit, the total number of results,
 * an optional next link, and an option previous link. This will allow the client to automatically request
 * the next dataset when needed.
 *
 * @param {function} getData - a function to get the data for the current route. It will provide the current
 *    query string.
 * @param {Object=} config - Any additional config to use.
 * @param {boolean=true} config.queryable - boolean if the route should be queryable.
 * @param {number=50} config.maxResults - the maximun number of results allowed.
 * @param {Array.<String>|String=} config.omitKeys - An optional list or sintr string of keys to remove
 *    from the response.
 * @return {function} a route handler for getting paginated data.
 */
export default function createPaginatedRoute(getData, { queryable = true, maxResults = 50, omitKeys = null } = {}) {
  return function handlePaginationRequest(req, res) {
    const { q } = req.query;
    let { start, limit } = req.query;

    if (!start) {
      start = 0;
    }

    if (!limit) {
      limit = 10;
    }

    if ((queryable && !q) || !isInt(start) || !isInt(limit) || start < 0 || limit > maxResults || limit < 1) {
      res.sendStatus(BAD_REQUEST);
      return;
    }

    start = parseInt(start, 10);
    limit = parseInt(limit, 10);

    const data = getData(q);
    const total = data.length;
    if (start > total) {
      res.sendStatus(BAD_REQUEST);
      return;
    }

    let url = `${getUrl(req).replace(/\?.*/, '')}?`.replace('/v1/v1', '/v1');
    if (queryable) {
      url = `${url}q=${q}&`;
    }

    let next = null;
    let previous = null;
    if (total > start + limit) {
      next = `${url}start=${start + limit}&limit=${limit}`;
    }

    if (start + limit > limit) {
      previous = `${url}start=${Math.max(0, start - limit)}&limit=${limit}`;
    }

    const sliced = data.slice(start, start + limit);

    res.json({
      meta: {
        start,
        limit,
        total,
        next,
        previous,
      },
      data: omitKeys && omitKeys.length ? sliced.map(datum => omit(datum, omitKeys)) : sliced,
    });
  };
}
