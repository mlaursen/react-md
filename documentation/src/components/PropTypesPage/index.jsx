import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { get } from 'lodash/object';

import { docgenRequest } from 'state/docgens';
import PropTypesPage from './PropTypesPage';

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({ docgenRequest }, dispatch);

  return (state, props) => {
    const {
      match: {
        params: { component, section },
      },
    } = props;
    const { toolbarTitle } = state.drawer;

    const ids = ['docgens', section, component].filter(id => !!id);
    const docgens = get(state, ids.join('.'), null);

    const nextResult = { component, section, docgens, toolbarTitle, ...actions };
    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PropTypesPage);
