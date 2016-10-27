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

const API_URL = 'http://localhost:3000/api';
const BASE_URL = 'http://localhost:8080';
const PROXY_URL = `${BASE_URL}/proxy?url=`;

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
  }).then(fetch => fetch(endpoint, options).then(response => response.json()));
}

/* eslint-disable no-param-reassign */
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
    if (getState()[stateKey]) {
      return;
    }

    dispatch({ type: request, id });

    fetch(endpoint, options).then(data => {
      dispatch({ type: success, id, data });
    }).catch(error => {
      dispatch(addNotification({ text: `Failed to fetch from endpoint: ${endpoint}` }));
      dispatch({ type: failure, id, error });
    });
  };
}

export function fetchProxy(url, options) {
  return fetch(`${PROXY_URL}${url}`, options);
}

export function fetchProxyCreator(id, url, options) {
  return fetchCreator(`${PROXY_URL}${url}`, options, id);
}

export function fetchSassDoc(id, options) {
  return fetchCreator(`${PROXY_URL}${API_URL}/sassdocs/${id}`, options, id, 'documentation.sassdocs', {
    request: FETCH_SASSDOC_REQUEST,
    success: FETCH_SASSDOC_SUCCESS,
    failure: FETCH_SASSDOC_FAILURE,
  });
}

export function fetchDocgen(id, options) {
  return fetchCreator(`${PROXY_URL}${API_URL}/docgens/${id}`, options, id, 'documentation.docgens', {
    request: FETCH_DOCGEN_REQUEST,
    success: FETCH_DOCGEN_SUCCESS,
    failure: FETCH_DOCGEN_FAILURE,
  });
}
