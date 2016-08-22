import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import QuickNav from 'components/QuickNav';

@connect(({ ui: { quickNav } }) => ({ ...quickNav }))
export default class QuickNavContainer extends PureComponent {
  static propTypes = {
    previousTo: PropTypes.string,
    previousName: PropTypes.string,
    nextTo: PropTypes.string,
    nextName: PropTypes.string,
  };

  render() {
    return (
      <QuickNav {...this.props} />
    );
  }
}
