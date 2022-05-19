import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles/App.scss';
import './styles/Chat.scss';

import { firebaseConfig } from './firebase';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import moment from 'moment';
import Filter from 'bad-words';

import { MAX_CHAT_CAR_COUNT, ANONYMOUS_USER } from './helpers/constants';
import { connectFirestoreEmulator } from 'firebase/firestore';

import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(firebaseApp);
const db = firebase.firestore(firebaseApp);
const analytics = firebase.analytics(firebaseApp);

function App() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [charCount, setCharCount] = useState(MAX_CHAT_CAR_COUNT);
  const [error, setError] = useState('');
  const [lastMessage, setLastMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const editProfileRef = useRef(false);
  // const flatListRef = useRef<FlatList>();
  const [currentMessage, setCurrentMessage] = useState(null);
  const [messageToReply, setMessageToReply] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // TODO: Assign Self to Chat XP
    getSelf();
    //getInitChatMessages()
    //listenToNewMessages()
  }, [user]);

  /*
  const createUser = () => {
    const usersRef = db.collection('users');
    console.log(usersRef);
  }
  */

  const getSelf = async () => {
    let localUser = localStorage.getItem('seismicChatUser');

    // Returning User Who Has Not Signed In
    // User info is pulled from local storage
    if (localUser !== null && user === null) {
      //console.log("This is a returning user who has not signed in.");
      setCurrentUser(JSON.parse(localUser));
    }
    // Returning User Who Has Signed In
    // User info is pulled from Firebase
    else if (localUser !== null && user !== null) {
      //console.log("This is a returning signed in user.");

      let parsedLocalUser = JSON.parse(localUser);
      let tempUser = null;

      if (parsedLocalUser.avatarUrl === undefined) {
        tempUser = {
          ...user,
          avatarUrl: ANONYMOUS_USER.avatarUrl,
          chatName: ANONYMOUS_USER.chatName,
          devices: ANONYMOUS_USER.devices,
          role: ANONYMOUS_USER.role,
          preferences: ANONYMOUS_USER.preferences,
        };
      } else {
        tempUser = {
          ...user,
          avatarUrl: parsedLocalUser.avatarUrl,
          chatName: parsedLocalUser.chatName,
          devices: parsedLocalUser.devices,
          role: parsedLocalUser.role,
          preferences: parsedLocalUser.preferences,
        };
      }
      setCurrentUser(tempUser);
      localStorage.setItem('seismicChatUser', JSON.stringify(tempUser));
    }
    // New User
    // Anonymous user is created
    else {
      setCurrentUser(ANONYMOUS_USER);
      //console.log("This is a new user");
      localStorage.setItem('seismicChatUser', JSON.stringify(ANONYMOUS_USER));
    }
  };

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };

    return (
      <Button
        className="sign-in"
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In
      </Button>
    );
  }

  function SignOut() {
    return (
      auth.currentUser && (
        <Button
          className="sign-out"
          variant="outlined"
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      )
    );
  }

  function validateMessage(message) {
    const messageLength = message.length;
    const trimedValueLength = message.trim().length;
    const badWordFilter = new Filter();

    let isValid = true;

    // TODO: Give feedback to user
    // https://plutotv.atlassian.net/browse/RN-123

    if (messageLength == 0) {
      setError('Sorry, no empty messages.');
      isValid = false;
    } else if (trimedValueLength < 2) {
      setError('Please type a longer message.');
      isValid = false;
    } else if (messageLength > MAX_CHAT_CAR_COUNT) {
      setError('Please type a shorter message.');
      isValid = false;
    } else if (message === lastMessage) {
      setError('Sorry, no duplicate messages.');
      isValid = false;
    } else if (badWordFilter.isProfane(message)) {
      setError('Please keep it PG!');
      isValid = false;
    }

    if (!isValid) {
      setTimeout(() => {
        setError('');
      }, 2000);
    }

    return isValid;
  }

  function clearInput() {
    setLastMessage('');
    setInputVal('');
    setError('');
    setIsValid(true);
    setCharCount(MAX_CHAT_CAR_COUNT);
  }

  function onChangeText(inputVal) {
    setInputVal(inputVal);
  }

  function onSubmitMessage() {
    const newMessage = {
      ...currentUser,
      message: inputVal,
      createdAt: Date.now(),
    };

    // validate message
    if (validateMessage(inputVal)) {
      // send message to firebase
      // sendChatMessage(newMessage, messageToReply);
      // clear input
      setMessageToReply(null);
      clearInput();
    }
  }

  function ChatRoom() {
    const dummy = useRef();
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(50);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
      e.preventDefault();

      const { uid, role, displayName, avatarUrl, chatName } = currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        role,
        displayName,
        avatarUrl,
        chatName,
      });

      setFormValue('');
      firebase.analytics().logEvent('chat_message_sent');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <>
        <main className="chat">
          {messages &&
            messages.map((msg) => (
              <ChatMessage key={msg.createdAt} message={msg} />
            ))}
        </main>

        {auth.currentUser ? (
          <form onSubmit={sendMessage} className="chatInput">
            <div className="inputContainer">
              <AccountCircleIcon
                sx={{ color: 'white', fontSize: 40, paddingLeft: '4px' }}
              />
              <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder="Say something..."
              />
              <button type="submit" disabled={!formValue}>
                Go
              </button>
            </div>
          </form>
        ) : (
          <></>
        )}
      </>
    );
  }

  function ChatMessage(props) {
    const { text, uid, avatarUrl, chatName, createdAt, role } = props.message;

    const seconds = createdAt ? moment(createdAt.toDate()) : '';
    const messageClass = uid === currentUser.uid ? 'sent' : 'received';

    return (
      <>
        <div className={`message ${messageClass}`}>
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

  return (
    <div className="App">
      <header>
        <img
          alt="Disney"
          src="https://static-mh.content.disney.io/matterhorn/assets/goc/disney_logo_dark@2x-45d70f7dd57b.png"
          className="logo"
        />
        {auth.currentUser ? <SignOut /> : <SignIn />}
      </header>
      <section className="body">
        <section className="main">
          <img
            className="qr-code"
            src="https://firebasestorage.googleapis.com/v0/b/showintel-8dcf8.appspot.com/o/qr-test.png?alt=media&token=d4416410-3f02-4652-b3e4-8eaa65b7d00e"
            alt="Flow Code QR"
          />
        </section>
        <section className="rail">
          <ChatRoom />
        </section>
      </section>
    </div>
  );
}

export default App;
