import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Snackbar } from 'react-md';

import { removeMessage, REFRESH_MESSAGE } from 'state/messages';

const Messages = props => <Snackbar {...props} id="application-messages" autohideTimeout={5000} />;
Messages.propTypes = {
  toasts: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({ onDismiss: removeMessage }, dispatch);

  return ({ messages }) => {
    let autohide = true;
    const [toast] = messages;
    if (toast && toast.text === REFRESH_MESSAGE) {
      autohide = false;
    }

    const nextResult = { ...actions, toasts: messages, autohide };
    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(Messages);
