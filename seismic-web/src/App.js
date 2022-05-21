import React, { useRef, useState, useEffect } from 'react';

import './styles/App.scss';

import { firebaseConfig } from './firebase';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ANONYMOUS_USER } from './helpers/constants';

import Chat from './components/Chat';
import VideoPlayer from './components/VideoPlayer';

import Button from '@mui/material/Button';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(firebaseApp);
const db = firebase.firestore(firebaseApp);
const analytics = firebase.analytics(firebaseApp);

function App() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const editProfileRef = useRef(false);
  // const flatListRef = useRef<FlatList>();
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
          <VideoPlayer />
        </section>
        <section className="rail">
          <Chat user={currentUser} authenticated={auth} />
        </section>
      </section>
    </div>
  );
}

export default App;
