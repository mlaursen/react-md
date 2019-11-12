import shallowEqual from 'shallowequal';
import { connectAdvanced } from 'react-redux';

const ShowOnMedia = ({ children }) => children;

export default connectAdvanced(() => {
  let result;

  return (state, props) => {
    const { mobile, tablet, desktop } = state.media;

    let children = null;
    if ((mobile && props.mobile) || (tablet && props.tablet) || (desktop && props.desktop)) {
      children = props.children;
    }

    const nextResult = { children };
    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(ShowOnMedia);
