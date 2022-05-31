import React, { useRef, useState, useEffect } from 'react';

import '../styles/Chat.scss';

import { db, analytics } from '../modules/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Like(props) {
  const message = props.user;

  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  const [likes, setLikes] = useState(message.likes);

  useEffect(() => {
    setLikes(message.likes);
  }, [message]);

  const sendLike = () => {
    db.collection('messages')
      .where('uid', '==', message.uid)
      .where('text', '==', message.text)
      .limit(2)
      .get()
      .then((query) => {
        // Getting 2 items in case there is a duplicate, and applying to latest message in array
        const message = query.docs[query.docs.length - 1];
        message.ref.update({
          likes: increment,
        });
      });

    firebase.analytics().logEvent('chat_message_liked');
  };

  return (
    <>
      {message && message.likes > 0
        ? [
            <Badge
              key="liked"
              color="primary"
              badgeContent={likes}
              max={100}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              showZero
            >
              <FavoriteIcon onClick={() => sendLike()} />
            </Badge>,
          ]
        : [<FavoriteBorderIcon onClick={() => sendLike()} key="like" />]}
    </>
  );
}

export default Like;
