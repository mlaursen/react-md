import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import GoogleAnalytics from 'react-ga';
import firebaseTools from '../../../util/firebase-tools';

import { replyActive } from '../../Live/LiveActions';

import styles from './PromotedMessages.css';
import animations from './PromotedAnimations.css';

export class PromotedMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotedMessage: [],
      viewable: false,
    };
  }

  componentDidMount() {
    this.getPromotedMessage();
  }

  getPromotedMessage = () => {
    firebaseTools.database
      .ref('promoted')
      .limitToLast(1)
      .on('value', (snapshot) => {
        if (snapshot.val() !== null) {
          this.setState({
            promotedMessage: snapshot.val().options,
            viewable: snapshot.val().options.viewable,
          });
        }
      });
  };

  avatarAction = () => {
    if (this.props.user.isAuthenticated && this.props.user.isAdmin) {
      firebaseTools.setPromoted({
        chatId: this.state.promotedMessage.chatId,
        chatAvatar: this.state.promotedMessage.chatAvatar,
        chatName: this.state.promotedMessage.chatName,
        chatMessage: this.state.promotedMessage.chatMessage,
        viewable: false,
      });
    } else {
      setState({ viewable: false });
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
        ref="promoted"
        className={`${styles['promoted-messages']} ${
          this.state.viewable ? '' : styles['promoted-chat-hide']
        }`}
      >
        <ReactCSSTransitionGroup
          component="ul"
          transitionName={{
            enter: `${animations['promoted-message-enter']}`,
            leave: `${animations['promoted-message-leave']}`,
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={0}
        >
          <li
            key={this.state.promotedMessage.chatId}
            className={styles['chat-message']}
          >
            <div className={styles['columns']}>
              <div
                className={styles['chat-avatar']}
                onClick={this.avatarAction.bind(this)}
              >
                <div
                  className={styles['image']}
                  style={{
                    background: `transparent url("${this.state.promotedMessage.chatAvatar}") center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </div>
              <div
                className={styles['copy-container']}
                onClick={this.messageAction.bind(
                  this,
                  this.state.promotedMessage
                )}
              >
                <div className={styles['name']}>
                  <label>{this.state.promotedMessage.chatName}</label>
                  {this.state.promotedMessage.chatReplyName ? (
                    <label>
                      <span> replied to </span>{' '}
                      {this.state.promotedMessage.chatReplyName}
                    </label>
                  ) : null}
                </div>
                <div className={styles['body']}>
                  {this.state.promotedMessage.chatReply ? (
                    <p className={styles['reply']}>
                      -{this.state.promotedMessage.chatReply}
                    </p>
                  ) : null}
                  <p>{this.state.promotedMessage.chatMessage}</p>
                </div>
              </div>
            </div>
          </li>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

PromotedMessages.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default PromotedMessages;
