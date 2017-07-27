import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import EmulatorController from './EmulatorController';

export default connectAdvanced(() => {
  let result;

  return (state, props) => {
    const { mobile, tablet, desktop } = state.media;
    const nextResult = { ...props, mobile, tablet, desktop };
    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(EmulatorController);
