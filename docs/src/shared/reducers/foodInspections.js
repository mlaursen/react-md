import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from 'constants/ActionTypes';

/**
 * Transforms the inspection data from the massive array of arrays
 * into a plain JS object.
 *
 * The result from the API call is:
 *
 * data: {
 *   meta: {
 *     view: {
 *       attribution: string,
 *       attributionLink: string,
 *       averageRating: number,
 *       category: string,
 *       columns: associative array - [{
 *         cachedContents
 *         dataTypeName: string,
 *         fieldName: string
 *         format: object,
 *         id: number,
 *         name: string,
 *         position: number,
 *         renderTypeName: string,
 *         tableColumnId: number,
 *         width: number,
 *       },
 *       createdAt: timestamp,
 *       description: string,
 *       displayType: 'table',
 *       downloadCount: number,
 *       flags: arrayOf(string),
 *       grants: arrayOf({ flags: arrayOf(string), inherited: bool, type: string }),
 *       hideFromCatalog: bool,
 *       hideFromDataJson: bool,
 *       id: string,
 *       indexUpdatedAt: timestamp,
 *       metadata: object,
 *       name: string,
 *       newBackend: bool,
 *       numberOfComments: number
 *       oid: number,
 *       owner: object,
 *       publicationAppendEnabled: bool,
 *       publicationDate: timestamp
 *       ... others ... // too lazy
 *     },
 *   },
 *   data: arrayOf(associative arrays matching columns above),
 * }
 */
function transformInspectionData(state, { data: results }) {
  const { columns } = results.meta.view;
  let startIndex = 0;
  columns.some((c, i) => {
    if (c.position > 0) {
      startIndex = i;
    }

    return startIndex;
  });

  const meta = columns.slice(startIndex).filter(({ fieldName }) => fieldName !== 'location').map(({ name, id, dataTypeName, description, fieldName }) => ({
    id,
    name,
    fieldName,
    description,
    numeric: dataTypeName === 'number',
  }));
  const inspections = results.data.map(inspection => inspection.reduce((formatted, data, i) => {
    const { fieldName } = columns[i];
    if (i >= startIndex) {
      formatted[fieldName] = typeof data === 'string' ? data.split('|').join('\n') : data;
    }

    return formatted;
  }, {}));

  return Object.assign({}, state, { fetching: false, inspections, meta });
}


const initialState = {
  fetching: false,
  meta: [],
  inspections: [],
};

export default function foodInspections(state = initialState, action) {
  if (action.id !== 'inspections') {
    return state;
  }

  switch (action.type) {
    case FETCH_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case FETCH_SUCCESS:
      return transformInspectionData(state, action);
    case FETCH_FAILURE:
      return Object.assign({}, state, { fetching: false, inspections: [] });
    default:
      return state;
  }
}
