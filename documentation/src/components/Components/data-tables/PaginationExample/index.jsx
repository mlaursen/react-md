import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import {
  airQualityColumnsRequest,
  airQualityDataRequest,
  airQualityDataRequestNext,
} from 'state/airQuality';

import PaginationExample from './PaginationExample';

export default connectAdvanced((dispatch) => {
  let result;
  let cachedData;
  let dataList = [];
  const actions = bindActionCreators({
    fetchColumns: airQualityColumnsRequest,
    fetchData: airQualityDataRequest,
    fetchNextData: airQualityDataRequestNext,
  }, dispatch);

  return (state, props) => {
    const { columns, meta, data } = state.airQuality;
    if (!shallowEqual(cachedData, data)) {
      cachedData = data;
      dataList = Object.keys(data).map(key => data[key]);
    }

    const nextResult = {
      ...props,
      ...actions,
      columns,
      meta,
      data: dataList,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PaginationExample);
