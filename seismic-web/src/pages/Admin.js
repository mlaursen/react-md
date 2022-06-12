import React, { useRef, useState, useEffect } from 'react';

import '../styles/Admin.scss';

import { isAdmin } from '../helpers/helperFunctions';

import { auth, analytics, db } from '../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Chat from '../components/Chat';

// import ChatControls from '../components/Tools/Chat/ChatControls';
import Poll from '../components/Tools/Poll/Poll';
import Trivia from '../components/Tools/Poll/Trivia';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Admin(props) {
  const user = props.user;
  const campaigns = props.campaigns;

  const [isLive, setIsLive] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);

  useEffect(() => {}, [campaigns]);

  return (
    <div className="admin">
      {isAdmin(user)
        ? [
            <section key="isadmin">
              <section className="main">
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 1, sm: 2, md: 12 }}
                >
                  <Grid item xs={1} sm={2} md={4} key="poll">
                    <Poll user={user} />
                  </Grid>
                  <Grid item xs={1} sm={2} md={4} key="trivia">
                    <Trivia user={user} key="trivia" />
                  </Grid>
                </Grid>
              </section>
              {chatEnabled ? (
                [
                  <section className="rail" key="chat-panel">
                    <Chat user={user} authenticated={auth} />
                  </section>,
                ]
              ) : (
                <></>
              )}
            </section>,
          ]
        : [
            <section key="notadmin">
              <h1>Please Login as Admin</h1>
            </section>,
          ]}
    </div>
  );
}

export default Admin;
