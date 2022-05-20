import React, { useRef, useState, useEffect } from 'react';
import '../styles/Chat.scss';

import moment from 'moment';

function ChatMessage(props) {
  const { text, uid, avatarUrl, chatName, createdAt, role } = props.message;
  const currentUser = props.user;

  const seconds = createdAt ? moment(createdAt.toDate()) : '';
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message`}>
        <img alt="avatar" className="avatar" src={avatarUrl} />
        <div className="messageContainer">
          <p className="username">{chatName}</p>
          <p className="message">{text}</p>
          <p className="date">{createdAt ? moment(seconds).fromNow() : ''}</p>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
