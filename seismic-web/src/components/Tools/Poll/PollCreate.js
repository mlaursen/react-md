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

function PollCreate(props) {
  const { user } = props;

  const pollsRef = db.collection('polls');
  const query = pollsRef.orderBy('createdAt').limitToLast(1);

  const [polls] = useCollectionData(query, { idField: 'id' });

  const [currentPoll, setCurrentPoll] = useState(null);
  const [title, setTitle] = useState(null);
  const [currentPollOption, setCurrentPollOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);

  const [showPollOption, setShowPollOption] = useState(false);
  const [viewable, setViewable] = useState(false);

  const [showPollWidget, setShowPollWidget] = useState(false);

  useEffect(() => {
    loadPolls();
  }, [polls, currentPoll]);

  function loadPolls() {
    if (polls && polls.length > 0) {
      setCurrentPoll(polls[0]);
    }
  }

  function pollOptionSubmit(e) {
    e.preventDefault();

    let currentOptions = options;
    currentOptions.push({
      label: currentPollOption,
      value: 0,
    });

    setOptions(currentOptions);
    setCurrentPollOption(null);

    console.log(options);
  }

  const pollSubmit = async () => {
    await pollsRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      type: 'POLL',
      id: 'poll-' + cuid(),
      user: {
        chatName: user.chatName,
        uid: user.uid,
        avatarUrl: user.avatarUrl,
      },
      title,
      options,
      total,
      viewable: true,
    });

    firebase.analytics().logEvent('poll_submitted_admin');
    pollReset();
  };

  function pollReset() {
    setTitle('');
    setOptions([]);
    setTotal(0);
    setShowPollOption(false);
    setViewable(false);
    setShowPollWidget(false);
  }

  function pollStop() {
    pollReset();
    setViewable(false);
    pollSubmit();
  }

  function submitPollTitle(e) {
    e.preventDefault();
    setShowPollOption(true);
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
                  Poll your audience all in real-time! Give your community a way
                  to score high on the leaderboard all while you gain valuable
                  insights.
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

export default PollCreate;
