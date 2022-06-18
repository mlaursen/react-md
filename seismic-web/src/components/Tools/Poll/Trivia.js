import React, { setState, useState, useEffect } from 'react';

import cuid from 'cuid';

import { db, analytics } from '../../../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from './PollCreate.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Trivia(props) {
  const { user } = props;

  const triviaRef = db.collection('polls');
  const query = triviaRef
    .where('type', '==', 'TRIVIA')
    .orderBy('createdAt')
    .limitToLast(1);

  const [trivia] = useCollectionData(query, { idField: 'id' });
  const [currentTrivia, setCurrentTrivia] = useState(null);
  const [total, setTotal] = useState(0);

  const [active, setActive] = useState(true);
  const [viewable, setViewable] = useState(false);

  useEffect(() => {
    loadTrivia();
  }, [trivia]);

  function loadTrivia() {
    if (trivia && trivia.length > 0) {
      setCurrentTrivia(trivia[0]);
      setViewable(true);
    }
  }

  function triviaSubmit(e) {
    e.preventDefault();

    // TODO: need to recieve option number

    if (active) {
      db.collection('polls')
        .where('id', '==', message.uid)
        .limitToLast(1)
        .get()
        .then((query) => {
          const loadedTrivia = query.docs[query.docs.length - 1];
          console.log(loadedTrivia);
          /*
        loadedTrivia.ref.update({
          total: increment,
        });
        */
        });
      console.log('submitting tirvia');
      setActive(false);
      firebase.analytics().logEvent('trivia_played');
    }
  }

  function closeTrivia() {
    console.log('closing trivia');
    setViewable(false);
  }

  return (
    <div className="poll">
      <Card sx={{ maxWidth: 345 }} key="poll-card">
        <CardMedia
          component="img"
          height="140"
          image="https://firebasestorage.googleapis.com/v0/b/showintel-8dcf8.appspot.com/o/trivia.jpg?alt=media&token=baae0177-197e-4b41-b2f3-9e80ab403e60"
          alt="Create a Poll"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Play Trivia
          </Typography>
          {!showPollWidget
            ? [
                <Typography
                  variant="body2"
                  color="text.secondary"
                  key="poll-card"
                >
                  Play trivia with your audience in real-time! The audience can
                  score points for each right answer and score high on the
                  leaderboard.
                </Typography>,
              ]
            : [
                <div>
                  {currentPoll
                    ? [
                        <div className="current-poll" key="poll-create">
                          <h3>{currentPoll.title}</h3>
                          <ol
                            className="listed-options"
                            key="current-listed-options"
                          >
                            {currentPoll.options.map((option) => {
                              return (
                                <li key={option.label}>
                                  <label className="title">
                                    {option.label}
                                  </label>
                                </li>
                              );
                            })}
                          </ol>
                        </div>,
                      ]
                    : [
                        <div className="submit-poll" key="submit-poll">
                          <h3>Submit a Poll</h3>
                          <Box
                            autoComplete="off"
                            component="form"
                            onSubmit={submitPollTitle}
                            className="poll-title"
                            key="poll-title"
                          >
                            {!showPollOption
                              ? [
                                  <TextField
                                    id="poll-title"
                                    key="poll-title-input"
                                    label="Poll Question"
                                    variant="standard"
                                    onChange={(e) => setTitle(e.target.value)}
                                  />,
                                ]
                              : [<h4>{title}</h4>]}
                          </Box>

                          <ol className="listed-options" key="listed-options">
                            {options.map((option) => {
                              return (
                                <li key={option.label}>
                                  <label className="title">
                                    {option.label}
                                  </label>
                                </li>
                              );
                            })}
                          </ol>

                          {showPollOption
                            ? [
                                <Box
                                  autoComplete="off"
                                  component="form"
                                  id="formPollOption"
                                  key="form-option"
                                  onSubmit={pollOptionSubmit}
                                >
                                  <TextField
                                    id="txtPollOption"
                                    key="poll-option-input"
                                    label="Enter an Option"
                                    variant="standard"
                                    onChange={(e) =>
                                      setCurrentPollOption(e.target.value)
                                    }
                                  />
                                </Box>,
                              ]
                            : null}

                          <div
                            className="button-container"
                            key="button-container"
                          >
                            {title ? (
                              <Button onClick={pollReset} className="default">
                                Cancel
                              </Button>
                            ) : null}
                            {options.length > 1 ? (
                              <div>
                                {viewable ? (
                                  <Button
                                    onClick={pollStop}
                                    className="secondary"
                                  >
                                    Stop Poll
                                  </Button>
                                ) : null}
                                <Button
                                  onClick={(e) => pollSubmit(e)}
                                  className="primary"
                                >
                                  Post Poll
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        </div>,
                      ]}
                </div>,
              ]}
        </CardContent>
        <CardActions>
          {showPollWidget
            ? [
                <Button size="small" onClick={(e) => pollReset(e)}>
                  Cancel
                </Button>,
              ]
            : null}
          <Button size="small" onClick={() => setShowPollWidget(true)}>
            Create
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Trivia;
