export const SEARCH_REQUEST = 'SEARCH_REQUEST';

export function searchRequest(query, start = 0) {
  return { type: SEARCH_REQUEST, payload: { query, start } };
}
