import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Countdown from 'react-countdown-now';
import cuid from 'cuid';
import firebaseTools from '../../../util/firebase-tools';

import GoogleAnalytics from 'react-ga';
import FontAwesome from 'react-fontawesome';
import Tooltip from 'material-ui/Tooltip';
import SvgIcon from 'material-ui/SvgIcon';

import { logout } from '../../User/UserActions';
import { replyReset, toggleChatDialog } from '../../Live/LiveActions';

// Import Style
import styles from './ChatInput.css';

export class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: 'Say something...',
      charRemaining: this.props.charLimit,
      lastMessage: null,
      error: null,
      viewable: true,
      chatEnabled: true,
    };
  }

  onChatSend = (event) => {
    event.preventDefault();

    let chatName = this.props.chatName,
      chatAvatar = this.props.avatar,
      chatId = '1',
      chatMessage = this.refs.ChatMessage.value,
      role = 'NORMAL',
      chatReply = null,
      chatReplyName = null,
      GAAction = 'Sends Chat Message';

    if (this.props.user.user.length > 0) {
      let user = this.props.user.user[0];
      chatName = user.chatName;
      chatAvatar = this.assignedAvatar();
      chatId = user.slug;
      role = user.role;
    }

    if (this.props.replyActive) {
      chatReplyName = this.props.replyMessage.chatName;
      chatReply = this.props.replyMessage.chatMessage;
      GAAction = 'Replies to Message';
    }

    if (this.chatFilter(chatMessage) && this.state.chatEnabled) {
      firebaseTools.sendMessage(
        chatId,
        chatName,
        chatMessage,
        chatReplyName,
        chatReply,
        chatAvatar,
        role,
        'chat'
      );

      // Reset
      this.setState({
        lastMessage: chatMessage,
        placeholder: 'Say something...',
      });

      this.props.dispatch(replyReset());
      GoogleAnalytics.initialize('UA-107154170-1');
      GoogleAnalytics.event({
        category: 'User',
        action: GAAction,
        label: 'Chat',
      });
    }
    this.refs.ChatMessage.value = '';
    this.setState({
      charRemaining: this.props.charLimit,
    });
  };

  charCounter = (event) => {
    this.setState({
      charRemaining: this.props.charLimit - this.refs.ChatMessage.value.length,
    });
  };

  chatFilter = (message) => {
    let sanitizedMessage = message.replace(/\s+/g, '');

    if (sanitizedMessage.length < 2) {
      this.setState({ placeholder: 'Please type a longer message. ' });
      return false;
    } else if (message.length > this.props.charLimit) {
      this.setState({ placeholder: 'Please type a shorter message. ' });
      return false;
    } else if (message === this.state.lastMessage) {
      this.setState({
        placeholder: 'Sorry, we dont allow saying the same message twice. ',
      });
      return false;
    } else return true;
  };

  assignedAvatar = () => {
    if (this.props.user.isAdmin) {
      return this.props.defaultAvatar;
    } else {
      return this.props.avatar;
    }
  };

  renderChatCountdown = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <div>
          <span>{seconds}</span>
        </div>
      );
    }
  };

  onReplyClose = (event) => {
    this.props.dispatch(replyReset());
  };

  onDelete = (message) => {
    firebaseTools.deleteMessage(message.id, 'chat');
    this.props.dispatch(replyReset());
  };

  onChatName = () => {
    this.props.dispatch(toggleChatDialog());
  };

  render() {
    return (
      <div
        className={`${styles['chat-input']} ${
          this.props.replyActive ? styles['reply-active'] : ''
        }`}
      >
        <div className={styles['reply-message-container']}>
          <div className={styles['name']}>
            Reply to {this.props.replyMessage.chatName}
          </div>
          <div className={styles['body']}>
            {this.props.replyMessage.chatMessage}
          </div>
          <div className={styles['actions']}>
            {this.props.user.isAdmin ? (
              <FontAwesome
                name="ban"
                onClick={this.onDelete.bind(this, this.props.replyMessage)}
              />
            ) : null}
            <FontAwesome name="times" onClick={this.onReplyClose.bind(this)} />
          </div>
        </div>
        <div className={styles['columns']}>
          <div
            className={`${styles['user-panel']} ${
              this.props.user.isAdmin ? styles['admin'] : null
            }`}
            onClick={this.onChatName}
          >
            <div className={styles['chat-avatar']}>
              <div
                className={styles['image']}
                style={{
                  background: `transparent url("${this.assignedAvatar()}") center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
            <label>
              {this.props.user.isAuthenticated &&
              this.props.user.user[0].chatName.length > 0
                ? this.props.user.user[0].chatName
                : this.props.chatName}
            </label>
          </div>
          <form
            id="frmChat"
            role="form"
            onSubmit={this.onChatSend}
            className={`${this.props.viewable ? '' : styles['chat-hide']}`}
          >
            <input
              type="ChatMessage"
              className="form-control"
              id="txtChat"
              ref="ChatMessage"
              onChange={this.charCounter.bind(this)}
              placeholder={
                this.props.replyActive
                  ? `Reply to ${this.props.replyMessage.chatName}`
                  : `${this.state.placeholder}`
              }
              name="chat"
            />
          </form>
          <Tooltip
            id="tooltip-icon"
            title="Characters Remaining"
            placement="top"
            className={`${this.props.viewable ? '' : styles['chat-hide']}`}
          >
            <span
              className={`${styles['char-limit']} ${
                this.state.charRemaining < 0 ? styles['error'] : ''
              }`}
            >
              {this.state.charRemaining}
            </span>
          </Tooltip>
          <SvgIcon onClick={this.onChatSend} className={styles['send-button']}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </SvgIcon>
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  user: PropTypes.object.isRequired,
  showChatNameDialog: PropTypes.bool.isRequired,
  chatName: PropTypes.string.isRequired,
  replyActive: PropTypes.bool.isRequired,
  replyMessage: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  charLimit: PropTypes.number.isRequired,
  defaultAvatar: PropTypes.string.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default ChatInput;
