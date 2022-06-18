import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import find from 'lodash/find';
import pull from 'lodash/pull';

import GoogleAnalytics from 'react-ga';
import firebaseTools from '../../../util/firebase-tools';

import PromotedMessages from './PromotedMessages';

import { replyActive } from '../../Live/LiveActions';

import styles from './ChatMessages.css';

export class ChatMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      scrollBottom: false,
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  scrollToView = () => {
    let elem = ReactDOM.findDOMNode(this.refs.chat.children[1]),
      val = elem.children.length - 1;

    if (elem) {
      elem.children[val].scrollIntoView({ block: 'end', behavior: 'smooth' });

      // clears messages when it goes above 100
      if (elem.children.length > 100) this.clearOldMessages();
    }
  };

  clearOldMessages = () => {
    let messages = this.state.messages;
    this.setState({
      messages: messages.slice(30),
    });
  };

  getMessages = () => {
    firebaseTools.database
      .ref('chat')
      .limitToLast(30)
      .on('child_added', (snapshot) => {
        if (snapshot.val() !== null) {
          let message = snapshot.val();
          message.id = snapshot.getKey();
          this.setState({
            messages: [...this.state.messages, message],
          });
          setTimeout(() => {
            this.scrollToView();
          }, 100);
        }
      });

    firebaseTools.database.ref('chat').on('child_removed', (snapshot) => {
      const message = snapshot.val();
      const removedMessages = pull(
        this.state.messages,
        find(this.state.messages, {
          chatName: message.chatName,
          chatMessage: message.chatMessage,
        })
      );

      this.setState({
        messages: removedMessages,
      });
    });
  };

  avatarAction = (message) => {
    if (this.props.user.isAuthenticated && this.props.user.isAdmin) {
      const pinnedMessage = message;
      firebaseTools.setPromoted({
        chatId: pinnedMessage.chatId,
        chatAvatar: pinnedMessage.chatAvatar,
        chatName: pinnedMessage.chatName,
        chatMessage: pinnedMessage.chatMessage,
        viewable: true,
      });
    } else {
      this.props.dispatch(replyActive(message));
    }
  };

  messageAction = (message) => {
    this.props.dispatch(replyActive(message));
    GoogleAnalytics.initialize('UA-107154170-1');
    GoogleAnalytics.event({
      category: 'User',
      action: 'Clicks Message',
    });
  };

  render() {
    return (
      <div
        ref="chat"
        className={`${styles['chat-container']} ${
          this.props.viewable ? '' : styles['chat-hide']
        }`}
      >
        <PromotedMessages
          user={this.props.user}
          dispatch={this.props.dispatch}
        />

        <ReactCSSTransitionGroup
          component="ul"
          transitionName={{
            enter: `${styles['chat-message-enter']}`,
            leave: `${styles['chat-message-leave']}`,
          }}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
        >
          {this.state.messages.map((message, i) => (
            <li
              key={i}
              className={
                styles['chat-message'] +
                (message.role !== undefined ? ` ${styles[message.role]}` : '')
              }
            >
              <div className={styles['columns']}>
                <div
                  className={styles['chat-avatar']}
                  onClick={this.avatarAction.bind(this, message)}
                >
                  <div
                    className={styles['image']}
                    style={{
                      background: `transparent url("${message.chatAvatar}") center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </div>
                <div
                  className={styles['copy-container']}
                  onClick={this.messageAction.bind(this, message)}
                >
                  <div className={styles['name']}>
                    <label>{message.chatName}</label>
                    {message.chatReplyName ? (
                      <label>
                        <span> replied to </span> {message.chatReplyName}
                      </label>
                    ) : null}
                  </div>
                  <div className={styles['body']}>
                    {message.chatReply ? (
                      <p className={styles['reply']}>-{message.chatReply}</p>
                    ) : null}
                    <p>{message.chatMessage}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ChatMessages.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default ChatMessages;
