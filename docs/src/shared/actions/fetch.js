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

const { port, host } = require('../../../serverConfig.json');
const {
  port: apiPort,
  host: apiHost,
  path: apiPath,
} = require('../../../../api/serverConfig.json');

const API_URL = `http://${apiHost}:${apiPort}${apiPath}`;
const BASE_URL = `http://${host}:${port}`;
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
      require.ensure([], require => {
        resolve(require('isomorphic-fetch'));
      });
    } else {
      resolve(require('isomorphic-fetch'));
    }
  }).then(fetch => fetch(encodeURI(endpoint), options)
    .then(response => {
      const { status } = response;
      if (status >= 200 && status < 300) {
        return response.json();
      }

      const error = new Error(response.statusText);
      error.response = response;

      throw error;
    }));
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
 * @param {String} id - An id to associate with this request.
 * @param {String|Array.<String>} stateKey - A period delimited string to access the redux state for this api call
 *    or a list of keys.
 * @param {Object} types - An object containing a key for `request`, `success`, and `failure` that should
 *    map to a redux type.
 * @param {Boolean=} addId - Boolean if the id should be added to the end of the state key. Default: true
 * @param {Object} options - Any additional options to pass.
 */
export function fetchCreator(endpoint, id, stateKey, { request, success, failure } = {}, addId = true, options) {
  if (!request) {
    request = FETCH_REQUEST;
  }

  if (!success) {
    success = FETCH_SUCCESS;
  }

  if (!failure) {
    failure = FETCH_FAILURE;
  }

  let fullStateKey = stateKey;
  if (addId) {
    fullStateKey = (typeof stateKey === 'string' ? stateKey.split('.') : stateKey);
    fullStateKey.push(id);
  }

  return (dispatch, getState) => {
    if (reduceKey(getState(), fullStateKey)) {
      return;
    }

    dispatch({ type: request, id });

    fetch(endpoint, options).then(data => {
      dispatch({ type: success, id, data });
    }).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }

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
 * @param {Object=} types - Optional redux action types to associate with.
 * @param {Boolean=} addId - Boolean if the id should be added to the end of the state key. Default: true
 * @param {Object=} options - any additional options
 */
export function fetchProxyCreator(id, stateKey, url, types, addId = true, options) {
  return fetchCreator(`${PROXY_URL}${url}`, id, stateKey, types, addId, options);
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
  return fetchProxyCreator(section ? [section, id] : id, ['documentation', 'sassdocs', section, id],
    `${API_URL}/sassdocs/${section ? `${section}/` : ''}${id}`, {
      request: FETCH_SASSDOC_REQUEST,
      success: FETCH_SASSDOC_SUCCESS,
      failure: FETCH_SASSDOC_FAILURE,
    }, false, options);
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
  return fetchProxyCreator(section ? [section, id] : id, ['documentation', 'docgens', section, id],
    `${API_URL}/docgens/${section ? `${section}/` : ''}${id}`, {
      request: FETCH_DOCGEN_REQUEST,
      success: FETCH_DOCGEN_SUCCESS,
      failure: FETCH_DOCGEN_FAILURE,
    }, false, options);
}
