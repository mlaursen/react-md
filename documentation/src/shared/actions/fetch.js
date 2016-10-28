import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_DOCGEN_REQUEST,
  FETCH_DOCGEN_SUCCESS,
  FETCH_DOCGEN_FAILURE,
  FETCH_SASSDOC_REQUEST,
  FETCH_SASSDOC_SUCCESS,
  FETCH_SASSDOC_FAILURE,
} from 'constants/ActionTypes';
import { addNotification } from 'actions/notifications';
import reduceKey from 'utils/StateUtils/reduceKey';

const API_URL = 'http://localhost:3000/api';
const BASE_URL = 'http://localhost:8080';
const PROXY_URL = `${BASE_URL}/proxy?url=`;

/**
 * This function fetches data from an endpoint with options using the native fetch (when possible)
 * or async loading `isomorphic-fetch` to do the api call when run on the server or not competent browsers.
 *
 * @param {String} endpoint - The endpoint to fetch from
 * @param {Object=} options - Any additional options to send with the request.
 * @return {Promise} a Promise containing the json
 */
export default function fetch(endpoint, options) {
  return new Promise(resolve => {
    if (global.fetch) {
      resolve(global.fetch);
    } else if (__CLIENT__) {
      require.ensure(['isomorphic-fetch'], require => {
        resolve(require('isomorphic-fetch'));
      });
    } else {
      resolve(require('isomorphic-fetch'));
    }
  }).then(fetch => fetch(encodeURI(endpoint), options).then(response => response.json()));
}

/**
 * Wraps the fetch function to be used with redux. Basically dispatches an action on request, success,
 * and failure. If the store already contains data with the `stateKey`, the fetch will also not occur.
 *
 * When dispatched, the action creator will contain the type (request || success || failure), the `id`.
 * If the type is `success`, there will be an additional key for `data` while if it is a failure, there
 * will be an additional key with the `error`.
 *
 * @param {String} endpoint - The endpoint to fetch
 * @param {Object} options - Any additional options to pass.
 * @param {String} id - An id to associate with this request.
 * @param {String} stateKey - A period delimited string to access the redux state for this api call,
 * @param {Object} types - An object containing a key for `request`, `success`, and `failure` that should
 *    map to a redux type.
 */
export function fetchCreator(endpoint, options, id, stateKey, { request, success, failure } = {}) {
  if (!request) {
    request = FETCH_REQUEST;
  }

  if (!success) {
    success = FETCH_SUCCESS;
  }

  if (!failure) {
    failure = FETCH_FAILURE;
  }

  return (dispatch, getState) => {
    if (reduceKey(getState(), stateKey)) {
      return;
    }

    dispatch({ type: request, id });

    fetch(endpoint, options).then(data => {
      dispatch({ type: success, id, data });
    }).catch(error => {
      console.log('error:', error);
      dispatch(addNotification({ text: `Failed to fetch from endpoint: ${endpoint}` }));
      dispatch({ type: failure, id, error });
    });
  };
}

/**
 * Fetches data from the proxy server.
 *
 * @param {String} url - The url to fetch from
 * @param {Object=} options - Any additional options to use.
 * @return {Promise} a promise containing the json data.
 */
export function fetchProxy(url, options) {
  return fetch(`${PROXY_URL}${url}`, options);
}

/**
 * Fetches data fromthe proxy server but wraps with redux dispatces.
 *
 * @param {String} id - An id to associate with this request.
 * @param {String} stateKey - A period delimited string to access the redux state for this api call,
 * @param {String} url - A url to fetch
 * @param {Object=} options - any additional options
 * @param {Object=} types - Optional redux action types to associate with.
 */
export function fetchProxyCreator(id, stateKey, url, options, types) {
  return fetchCreator(`${PROXY_URL}${url}`, options, id, stateKey, types);
}

/**
 * Fetches the sassdoc from the api server.
 *
 * @param {String} id - the id for the sassdoc
 * @param {String} section - An optional subsection for the sassdoc. This will be set
 *    when the component routes had a `nestedItems` created.
 * @param {Object=} options - Any additional options to use.
 */
export function fetchSassDoc(id, section, options) {
  return fetchProxyCreator(id, 'documentation.sassdocs',
    `${API_URL}/sassdocs/${section ? `${section}/` : ''}${id}`,
    options, {
      request: FETCH_SASSDOC_REQUEST,
      success: FETCH_SASSDOC_SUCCESS,
      failure: FETCH_SASSDOC_FAILURE,
    },
  );
}

/**
 * Fetches the react docgen from the api server.
 *
 * @param {String} id - the id for the react docgen
 * @param {String} section - An optional subsection for the react docgen. This will be set
 *    when the component routes had a `nestedItems` created.
 * @param {Object=} options - Any additional options to use.
 */
export function fetchDocgen(id, section, options) {
  return fetchProxyCreator(id, `documentation.docgens.${section ? `${section}.` : ''}${id}`,
    `${API_URL}/docgens/${section ? `${section}/` : ''}${id}`,
    options, {
      request: FETCH_DOCGEN_REQUEST,
      success: FETCH_DOCGEN_SUCCESS,
      failure: FETCH_DOCGEN_FAILURE,
    });
}
