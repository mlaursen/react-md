import { combineReducers } from 'redux';
import { isEqual } from 'lodash/lang';

export const AIR_QUALITY_COLUMNS_REQUEST = 'AIR_QUALITY_COLUMNS_REQUEST';
export const AIR_QUALITY_COLUMNS_SUCCESS = 'AIR_QUALITY_COLUMNS_SUCCESS';

export function airQualityColumnsRequest() {
  return { type: AIR_QUALITY_COLUMNS_REQUEST };
}

export function airQualityColumnsSuccess(data) {
  return { type: AIR_QUALITY_COLUMNS_SUCCESS, payload: { data } };
}

export const AIR_QUALITY_DATA_REQUEST = 'AIR_QUALITY_DATA_REQUEST';
export const AIR_QUALITY_DATA_REQUEST_NEXT = 'AIR_QUALITY_DATA_REQUEST_NEXT';
export const AIR_QUALITY_DATA_SUCCESS = 'AIR_QUALITY_DATA_SUCCESS';

export function airQualityDataRequest(start = 0, limit = 10) {
  return { type: AIR_QUALITY_DATA_REQUEST, payload: { start, limit } };
}

export function airQualityDataRequestNext(href) {
  return { type: AIR_QUALITY_DATA_REQUEST_NEXT, payload: { href } };
}

export function airQualityDataSuccess({ meta, data }) {
  return { type: AIR_QUALITY_DATA_SUCCESS, payload: { meta, data } };
}

export function columns(state = [], action) {
  switch (action.type) {
    case AIR_QUALITY_COLUMNS_SUCCESS:
      return action.payload.data;
    default:
      return state;
  }
}

export function meta(state = { start: 0, limit: 10, total: 0, next: null, previous: null }, action) {
  switch (action.type) {
    case AIR_QUALITY_DATA_SUCCESS:
      return action.payload.meta;
    default:
      return state;
  }
}

function updateData(state, { data, meta: { start } }) {
  const serverData = data.reduce((serverData, datum, i) => {
    serverData[`${i + start}`] = datum;

    return serverData;
  }, {});

  if (isEqual(state, serverData)) {
    return state;
  } else if (start > 0) {
    return { ...state, ...serverData };
  }

  return serverData;
}

export function data(state = {}, action) {
  switch (action.type) {
    case AIR_QUALITY_DATA_SUCCESS:
      return updateData(state, action.payload);
    default:
      return state;
  }
}

export default combineReducers({ columns, meta, data });
