import React, { useRef, useState, useEffect } from 'react';

import '../styles/Admin.scss';

import { getSelf } from '../modules/locaUser';

import { auth, analytics, db } from '../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Header from '../components/Header';
import Chat from '../components/Chat';
import VideoPlayer from '../components/VideoPlayer';

import Button from '@mui/material/Button';

function Admin() {
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
    setCurrentUser(getSelf(user));
    //getInitChatMessages()
    //listenToNewMessages()
  }, [user]);

  /*
  const createUser = () => {
    const usersRef = db.collection('users');
    console.log(usersRef);
  }
  */

  return (
    <div className="App">
      <Header user={currentUser} />
      <section className="body">
        <section className="main"></section>
        <section className="rail">
          <Chat user={currentUser} authenticated={auth} />
        </section>
      </section>
    </div>
  );
}

export default Admin;
