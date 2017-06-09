import 'isomorphic-fetch';

import {
  API_ENDPOINT,
  SEARCH_ENDPOINT,
  DOCGENS_ENDPOINT,
  SASSDOCS_ENDPOINT,
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
