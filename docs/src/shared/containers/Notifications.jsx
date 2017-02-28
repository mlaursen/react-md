import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'react-md/lib/Snackbars';
import { dismissNotification } from 'actions/notifications';

@connect(({ notifications }) => ({ toasts: notifications }), { onDismiss: dismissNotification })
export default class Notifications extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    toasts: Snackbar.propTypes.toasts,
    onDismiss: PropTypes.func.isRequired,
  };

  render() {
    const {
      dispatch, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <Snackbar {...props} />;
  }
}
