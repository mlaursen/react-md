import 'isomorphic-fetch';

import {
  API_ENDPOINT,
  SEARCH_ENDPOINT,
  DOCGENS_ENDPOINT,
  SASSDOCS_ENDPOINT,
  GITHUB_ENDPOINT,
  GITHUB_API_ENDPOINT,
  AIR_QUALITY_ENDPOINT,
  AIR_QUALITY_COLUMNS_ENDPOINT,
  AIR_QUALITY_DATA_ENDPOINT,
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

/**
 * This is a simple wrapper to search for prop types, SassDoc, or components
 * on the documentation website.
 *
 * @param {Object} searchParams - An object for the search params.
 * @param {String=} searchParams.href - An optional href to search for. This is usually
 *    set when querying the next result list.
 * @param {String=} searchParams.query - The query string to be searched for.
 * @param {number=} searchParams.start - The optional start index to search from.
 * @param {String=''} server - the server to query from.
 * @return {Promise} a promise to the fetch api call.
 */
export function search({ href, query, start }, server = '') {
  const endpoint = href || `${server}${API_ENDPOINT}${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&start=${start}`;
  return fetch(endpoint);
}

/**
 * Gets docgen from a specific endpoint.
 *
 * @param {String} endpoint - The endpoint to query for.
 * @param {String=''} server - An optional server to query from.
 * @return {Promise} a promise to the fetch api call.
 */
export function fetchDocgen(endpoint, server = '') {
  return fetch(`${server}${API_ENDPOINT}${DOCGENS_ENDPOINT}/${endpoint}`);
}

/**
 * Gets SassDoc from a specific endpoint.
 *
 * @param {String} endpoint - The endpoint to query for.
 * @param {String=''} server - An optional server to query from.
 * @return {Promise} a promise to the fetch api call.
 */
export function fetchSassdoc(endpoint, server = '') {
  return fetch(`${server}${API_ENDPOINT}${SASSDOCS_ENDPOINT}/${endpoint}`);
}

/**
 * A utility function to fetch data from github. When triggered from the browser,
 * it will point to the local server for proxying to github. When triggered from
 * the server, it will directly call the github api.
 *
 * The main reason for this is that GitHub likes to have custom User-Agent specified
 * for each app, and modifying the User-Agent is not fully supported in browser yet
 * since it was recently changed to not be read-only.
 *
 * @param {String} endpoint - The github api endpoint to make a request to.
 * @param {Object={}} options - Any additional options to provide to the request.
 * @return {Promise} a promise to the fetch api call.
 */
export function fetchGithub(endpoint, options = {}) {
  const prefix = __CLIENT__ ? `${API_ENDPOINT}${GITHUB_ENDPOINT}` : GITHUB_API_ENDPOINT;
  return global.fetch(`${prefix}${endpoint}`, options);
}

/**
 * A utility function for getting the current rate limits after a github api call.
 * This _technically_ isn't an api call itself so maybe it shouldn't be in this file,
 * but I don't feel like finding a better place to put it.
 *
 * @param {Object} response - The response from a fetch request.
 * @param {Map} response.headers - The headers to extract the rate limits from.
 * @return {Object} an object containing the limit for a github endpoint, the remaining
 *    number of calls for the endpoint, and a time for when the rate limits are reset.
 */
export function getGithubRateLimits({ headers }) {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = new Date(headers.get('X-RateLimit-Reset') * 1000);
  return { limit, remaining, reset };
}

/**
 * Gets the column data for the air quality endpoint.
 *
 * @param {String=''} server - the server to call from. This is required to be an absolute
 *    url when calling from SSR.
 * @return {Promise} a promise to the fetch request.
 */
export function fetchAirQualityColumns(server = '') {
  return fetch(`${server}${API_ENDPOINT}${AIR_QUALITY_ENDPOINT}${AIR_QUALITY_COLUMNS_ENDPOINT}`);
}

/**
 * Gets the data for the air quality endpoint in a paginated manner. This can either take in
 * a start and limit to generate a url, or an already generated href.
 *
 * @param {Object} options - The options to use for the request.
 * @param {String=} options.href - An already generated href to use for the request.
 * @param {number=} options.start - A start index to use for the request.
 * @param {number=} options.limit - The total number of rows to return.
 * @return {Promise} a promise to the fetch request.
 */
export function fetchAirQualityData({ href, start, limit }, server = '') {
  const endpoint = href || `${server}${API_ENDPOINT}${AIR_QUALITY_ENDPOINT}${AIR_QUALITY_DATA_ENDPOINT}?start=${start}&limit=${limit}`;
  return fetch(endpoint);
}
