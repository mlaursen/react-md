import 'isomorphic-fetch';

import {
  API_ENDPOINT,
  SEARCH_ENDPOINT,
  DOCGENS_ENDPOINT,
  SASSDOCS_ENDPOINT,
  GITHUB_API_ENDPOINT,
  // VERSION,
} from 'constants/application';

export default function fetch(endpoint) {
  return global.fetch(endpoint).then((response) => {
    if (response.ok) {
      return response.json();
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}

export function search({ href, query, start }, server = '') {
  const endpoint = href || `${server}${API_ENDPOINT}${SEARCH_ENDPOINT}?q=${query}&start=${start}`;
  return fetch(endpoint);
}

export function fetchDocgen(endpoint, server = '') {
  return fetch(`${server}${API_ENDPOINT}${DOCGENS_ENDPOINT}/${endpoint}`);
}

export function fetchSassdoc(endpoint, server = '') {
  return fetch(`${server}${API_ENDPOINT}${SASSDOCS_ENDPOINT}/${endpoint}`);
}

export function fetchGithub(endpoint, options = {}) {
  const headers = new Headers({
    ...options.headers,
    Accept: 'application/vnd.github.v3+json',
    // 'User-Agent': `react-md-documentation/${VERSION} mlaursen`,
  });
  return global.fetch(`${GITHUB_API_ENDPOINT}${endpoint}`, {
    ...options,
    headers,
  });
}

export function getGithubRateLimits({ headers }) {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = new Date(headers.get('X-RateLimit-Reset') * 1000);
  return { limit, remaining, reset };
}

export async function fetchGithubRateLimits() {
  const response = await fetchGithub('/users/mlaursen');
  return getGithubRateLimits(response);
}
