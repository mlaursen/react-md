import fetch from './fetch';

const SPOTIFY_API = 'https://api.spotify.com/v1';

function addLimit(limit, delimiter = '&') {
  if (!limit) {
    return '';
  }

  return `${delimiter}limit=${limit}`;
}

function getCountryCode(country) {
  if (typeof country === 'string') {
    return country;
  } else if (typeof window === 'undefined') {
    return 'US';
  }

  return (window.navigator.userLanguage || window.navigator.language).match(/[A-Z]{2}/)[0] || 'US';
}

/**
 * The search function takes in a query string, the search type, and a limit. If the second param
 * is a number instead of a string, the type will default to `artist`.
 *
 * @param {String} query - The search query
 * @param {(String|Number)=} type - Either one of 'artist', 'album', 'playlist' or a number or results
 *    to limit to.
 * @param {Number=} limit - The number of results to limit the search to.
 *
 * @return {Promise} a promise containing either a single search result or a list of results up to the limit.
 */
export function search(query, type = 'artist', limit = 0) {
  if (typeof type === 'number') {
    limit = type;
    type = 'artist';
  }

  return fetch(`${SPOTIFY_API}/search?type=${type}&q=${query}${addLimit(limit)}`)
    .then(json => {
      const data = json[`${type}s`];
      if (limit === 1) {
        return data.items[0];
      }

      return data;
    });
}

/**
 * Fetches any related artists to the given artist or artist id
 *
 * @param {(Object|String}) id - Either an artist object or an id for an artist
 * @param {Number=} limit - an optional limit for related artists.
 */
export function getRelatedArtists(id, limit) {
  if (id.id) {
    id = id.id;
  }

  return fetch(`${SPOTIFY_API}/artists/${id}/related-artists${addLimit(limit, '?')}`)
    .then(({ artists }) => artists);
}

export function getArtistAlbums(id, limit, market) {
  if (id.id) {
    id = id.id;
  }

  return fetch(`${SPOTIFY_API}/artists/${id}/albums?market=${getCountryCode(market)}${addLimit(limit)}`)
    .then(({ items }) => {
      // Doesn't actually support limit for this one.
      if (limit === 1) {
        return items[0];
      } else if (limit) {
        return items.slice(0, limit);
      }

      return items;
    });
}

export function getArtistTopTracks(id, limit) {
  if (id.id) {
    id = id.id;
  }

  return fetch(`${SPOTIFY_API}/artists/${id}/top-tracks?country=${getCountryCode()}${addLimit(limit)}`)
    .then(({ tracks }) => {
      if (limit === 1) {
        return tracks[0];
      } else if (limit) {
        return tracks.slice(0, limit);
      }

      return tracks;
    });
}

export function getAlbum(id, market) {
  if (id.id) {
    id = id.id;
  }

  return fetch(`${SPOTIFY_API}/albums/${id}?market=${getCountryCode(market)}`);
}

export default {
  search,
  getRelatedArtists,
  getArtistAlbums,
  getArtistTopTracks,
  getAlbum,
};
