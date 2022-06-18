import React, { useRef, useState, useEffect } from 'react';

import Routes from './Routes';

import './styles/App.scss';

import { db, auth, analytics } from './modules/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { getSelf } from './modules/locaUser';

import Header from './components/Header';

function App() {
  // Load User
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  // Load Campaigns
  const campaignsRef = db.collection('campaigns');
  const [campaigns] = useCollectionData(campaignsRef);

  // TODO: Load Current Campaign
  // const [currentCampaign, setCurrentCampaign] = useState(null);

  useEffect(() => {
    // Set User
    setCurrentUser(getSelf(user));

    // TODO: Set Current Campaign
    // setCurrentCampaign(campaigns && campaigns[0]);
  }, [user, campaigns]);

  return (
    <div className="App">
      <Header user={currentUser} />
      <section className="body">
        <Routes user={currentUser} campaigns={campaigns} />
      </section>
    </div>
  );
}

export default App;
