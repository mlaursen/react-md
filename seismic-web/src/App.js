import React, { useRef, useState, useEffect } from 'react';

import './styles/App.scss';

import { getSelf } from './modules/locaUser';

import { auth } from './modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Header from './components/Header';
import Chat from './components/Chat';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const editProfileRef = useRef(false);
  // const flatListRef = useRef<FlatList>();
  const [showSplash, setShowSplash] = useState(true);

  const videoSource =
    'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

  useEffect(() => {
    // TODO: Assign Self to Chat XP
    // getSelf(user);
    // setCurrentUser = getSelf(user);
    setCurrentUser(getSelf(user));
    //getInitChatMessages()
    //listenToNewMessages()
  }, [user]);

  return (
    <div className="App">
      <Header user={currentUser} />
      <section className="body">
        <section className="main">
          {/*
            <img
              className="qr-code"
              src="https://firebasestorage.googleapis.com/v0/b/showintel-8dcf8.appspot.com/o/qr-test.png?alt=media&token=d4416410-3f02-4652-b3e4-8eaa65b7d00e"
              alt="Flow Code QR"
            />
          */}
          <VideoPlayer video={videoSource} />
        </section>
        <section className="rail">
          <Chat user={currentUser} authenticated={auth} />
        </section>
      </section>
    </div>
  );
}

export default App;
