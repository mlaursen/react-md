import React, { useRef, useState, useEffect } from 'react';

import '../styles/Admin.scss';

import { getSelf } from '../modules/locaUser';
import { isAdmin } from '../helpers/helperFunctions';

import { auth, analytics, db } from '../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Header from '../components/Header';
import Chat from '../components/Chat';

// import ChatControls from '../components/Tools/Chat/ChatControls';

import Button from '@mui/material/Button';

function Admin() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLive, setIsLive] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const editProfileRef = useRef(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // TODO: Assign Self to Chat XP
    setCurrentUser(getSelf(user));
    //getInitChatMessages()
    //listenToNewMessages()
  }, [user]);

  return (
    <div className="App Admin">
      <Header user={currentUser} />
      {auth.currentUser && isAdmin(currentUser)
        ? [
            <section className="body" key="is admin">
              <section className="main"></section>
              {chatEnabled ? (
                [
                  <section className="rail">
                    <Chat user={currentUser} authenticated={auth} />
                  </section>,
                ]
              ) : (
                <></>
              )}
            </section>,
          ]
        : [
            <section className="body" key="not admin">
              <h1>Please Login as Admin</h1>
            </section>,
          ]}
    </div>
  );
}

export default Admin;
