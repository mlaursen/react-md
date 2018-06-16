import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import { updateMedia } from 'state/media';

import App from './App';

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({ updateMedia }, dispatch);

  return (state, props) => {
    const {
      drawer,
      helmet,
      routing: { pathname },
      media: { defaultMedia, mobile },
      search: { searching },
    } = state;

    const nextResult = {
      ...props,
      ...drawer,
      ...helmet,
      ...actions,
      mobileNavigation: !!(mobile && pathname && pathname.startsWith('/components')),
      searching,
      defaultMedia,
      mobile,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(App);
