import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'react-md/lib/Snackbars';

import { dismissToast } from 'actions/ui';

@connect(({ ui: { snackbar } }) => ({ toasts: snackbar }), {
  onDismiss: dismissToast,
})
export default class Notifications extends PureComponent {
  static propTypes = {
    toasts: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
  };

  render() {
    const { ...props } = this.props;
    delete props.dispatch;

    return (
      <Snackbar {...props} />
    );
  }
}
