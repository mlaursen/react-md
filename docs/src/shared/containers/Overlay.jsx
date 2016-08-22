import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Overlay from 'react-md/lib/Transitions/Overlay';

import { hideOverlay } from 'actions/ui';

@connect(({ ui: { overlay } }) => ({ ...overlay }), { onClick: hideOverlay })
export default class OverlayContainer extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { visible, ...props } = this.props;
    delete props.dispatch;

    return (
      <Overlay isOpen={visible} {...props} />
    );
  }
}
