import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import cuid from 'cuid';
import firebaseTools from '../../../util/firebase-tools';

// Import Style
import styles from './PinnedCreate.css';

export class PinnedCreate extends Component {
  onChatSend = (event) => {
    event.preventDefault();

    const PinnedMessage = this.refs.PinnedMessage.value;
    const options = {
      type: 'MESSAGE',
      id: cuid(),
      name: 'ADMIN',
      avatar: this.props.avatar,
      message: PinnedMessage,
      viewable: true,
    };
    firebaseTools.setCTA(options);
    this.refs.PinnedMessage.value = '';
  };

  render() {
    return (
      <div>
        <form id="frmChat" role="form" onSubmit={this.onChatSend}>
          <input
            type="PinnedMessage"
            className="form-control"
            id="txtChat"
            ref="PinnedMessage"
            placeholder="Say Something..."
            name="chat"
          />
        </form>
      </div>
    );
  }
}

PinnedCreate.propTypes = {
  avatar: PropTypes.string.isRequired,
};

export default PinnedCreate;
