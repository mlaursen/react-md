import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeMessage } from 'state/messages';
import Snackbar from 'react-md/lib/Snackbars';

const Messages = ({ toasts, onDismiss }) => <Snackbar toasts={toasts} onDismiss={onDismiss} />;
Messages.propTypes = {
  toasts: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default connect(({ messages }) => ({ toasts: messages }), { onDismiss: removeMessage })(Messages);
