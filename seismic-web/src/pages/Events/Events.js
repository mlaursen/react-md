import React, { useRef, useState, useEffect } from 'react';

import '../../styles/App.scss';

import { getSelf } from '../../modules/locaUser';

import { db, auth, analytics } from '../../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Header from '../Header';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Events() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const editProfileRef = useRef(false);
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="App">
      <Header user={currentUser} />
      <section className="body">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
}

export default Events;
