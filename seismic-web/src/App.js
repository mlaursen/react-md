import React, { useRef, useState, useEffect } from 'react';

import './styles/App.scss';

import { getSelf } from './modules/locaUser';

import { db, auth, analytics } from './modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Header from './components/Header';
import Chat from './components/Chat';
import { VideoPlayer } from './components/VideoPlayer';

import { MOVIES } from './helpers/constants';

function App() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const editProfileRef = useRef(false);
  // const flatListRef = useRef<FlatList>();
  const [showSplash, setShowSplash] = useState(true);

  const campaignsRef = db.collection('campaigns');
  const [campaigns] = useCollectionData(campaignsRef);
  const [currentCampaign, setCurrentCampaign] = useState(null);

  useEffect(() => {
    // TODO: Assign Self to Chat XP
    // getSelf(user);
    // setCurrentUser = getSelf(user);
    setCurrentUser(getSelf(user));
    setCurrentCampaign(campaigns && campaigns[0]);
    //setCurrentCampaign(campaigns && campaigns[0]);
    //getInitChatMessages();
    //listenToNewMessages();
  }, [user, campaigns]);

  return (
    <div className="App">
      <Header user={currentUser} />
      <section className="body">
        <section
          className="main"
          style={{
            backgroundImage: currentCampaign
              ? `url(${currentCampaign.banner})`
              : 'none',
          }}
        >
          {/*
            <img
              className="qr-code"
              src="https://firebasestorage.googleapis.com/v0/b/showintel-8dcf8.appspot.com/o/qr-test.png?alt=media&token=d4416410-3f02-4652-b3e4-8eaa65b7d00e"
              alt="Flow Code QR"
            />
            <VideoPlayer video={MOVIES[0]} />
          */}
          <div
            className="text-block"
            style={{
              backgroundImage:
                currentCampaign && currentCampaign.styles
                  ? `linear-gradient(to bottom, rgba(245, 246, 252, 0.0), rgba(117, 19, 93, 0.73))`
                  : 'none',
            }}
          >
            <h1>{currentCampaign && currentCampaign.artist}</h1>
            <h2>{currentCampaign && currentCampaign.name}</h2>
            <p>{currentCampaign && currentCampaign.description}</p>
          </div>
        </section>
        <section className="rail">
          <Chat user={currentUser} authenticated={auth} />
        </section>
      </section>
    </div>
  );
}

export default App;
