import React, { useRef, useState, useEffect } from 'react';
import '../styles/Chat.scss';

import moment from 'moment';

import Like from './Like';

function ChatMessage(props) {
  const { text, uid, avatarUrl, chatName, createdAt, role, likes } =
    props.message;
  const currentUser = props.user;
  const reply = props.reply;
  const replyMessage = props.replyMessage;

  const seconds = createdAt ? moment(createdAt.toDate()) : '';
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div
        className={`chat-message`}
        onDoubleClick={reply.bind(this, props.message)}
      >
        <img alt="avatar" className="avatar" src={avatarUrl} />
        <div className="messageContainer">
          <p className="username">{chatName}</p>
          <p className="message">{text}</p>
          <p className="date">{createdAt ? moment(seconds).fromNow() : ''}</p>
        </div>
        <div className="messageActions">
          <Like user={props.message} />
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
