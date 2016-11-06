import { SPOTIFY_API } from 'constants';

function addLimit(limit, delimiter = '&') {
  if (!limit) {
    return '';
  }

  return `${delimiter}limit=${limit}`;
}

function getCountryCode(country) {
  if (country) {
    return country;
  }

  return (window.navigator.userLanguage || window.navigator.language).match(/[A-Z]{2}/)[0] || 'US';
}

function fetch(uri, options) {
  uri = `${SPOTIFY_API}/${uri}`;

  if (!global.fetch) {
    return new Promise(resolve => {
      require.ensure(['whatwg-fetch'], require => {
        resolve(require('whatwg-fetch')(uri, options).then(response => response.json()));
      });
    });
  }

  return global.fetch(uri, options).then(response => response.json());
}

export function search(value, type = 'artist', limit = 0) {
  if (typeof type === 'number') {
    limit = type;
    type = 'artist';
  }

  return fetch(encodeURI(
    `search?type=${type}&q=${value}${addLimit(limit)}`
  )).then(json => {
    const data = json[`${type}s`];
    if (limit === 1) {
      return data.items[0];
    }

    return data;
  });
}

export function getRelatedArtists(id, limit) {
  return fetch(`artists/${id}/related-artists${addLimit(limit, '?')}`)
    .then(({ artists }) => artists);
}

export function getArtistAlbums(id, limit, market) {
  return fetch(`artists/${id}/albums?market=${getCountryCode(market)}${addLimit(limit)}`)
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
  return fetch(`artists/${id}/top-tracks?country=${getCountryCode()}${addLimit(limit)}`)
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
  return fetch(`albums/${id}${market ? `?market=${market}` : ''}`);
}

export default {
  search,
  getRelatedArtists,
  getArtistAlbums,
  getArtistTopTracks,
  getAlbum,
};
