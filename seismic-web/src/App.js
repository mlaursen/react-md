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

import { MAX_CHAT_CAR_COUNT, DUMMY_USER } from './helpers/constants';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(firebaseApp);
const db = firebase.firestore(firebaseApp);
const analytics = firebase.analytics(firebaseApp);

function App() {
  const [user] = useAuthState(auth);
  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [charCount, setCharCount] = useState(MAX_CHAT_CAR_COUNT);
  const [error, setError] = useState('');
  const [lastMessage, setLastMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const editProfileRef = useRef(false);
  // const flatListRef = useRef<FlatList>();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [messageToReply, setMessageToReply] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // TODO: Assign Self to Chat XP
    // getSelf()
    getOrCreateUser();
    //getInitChatMessages()
    //listenToNewMessages()
  }, []);

  const getOrCreateUser = async () => {
    let user = localStorage.getItem('seismicChatUser');
    user
      ? setCurrentUser(JSON.parse(user))
      : setCurrentUser(DUMMY_USER) &&
        localStorage.setItem('seismicChatUser', JSON.stringify(user));
  };

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

  return (
    <div className="App">
      <header>
        <h1>Sandbox Env</h1>
        {auth.currentUser ? <SignOut /> : <SignIn />}
      </header>
      <section className="body">
        <section className="main">
          <p>Main Body</p>
        </section>
        <section className="rail">
          <ChatRoom />
        </section>
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button className="sign-in" onClick={signInWithGoogle}>
      Sign In
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(50);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });

    setFormValue('');
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
  const { text, uid, photoURL, displayName, createdAt } = props.message;

  const seconds = createdAt ? moment(createdAt.toDate()) : '';
  const messageClass =
    uid === auth.currentUser && auth.currentUser.uid ? 'sent' : 'received';
  const userName = displayName ? displayName : 'User';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          alt="avatar"
          className="avatar"
          src={
            photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
        />
        <div className="messageContainer">
          <p className="username">{userName}</p>
          <p className="message">{text}</p>
          <p className="date">{createdAt ? moment(seconds).fromNow() : ''}</p>
        </div>
      </div>
    </>
  );
}

export default App;
