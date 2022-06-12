import React, { setState, useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import cuid from 'cuid';

import { db, analytics } from '../../../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from './PollCreate.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function PollCreate(props) {
  const user = props.useer;

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

  function pollSubmit(e) {
    e.preventDefault();
    let pollData = {};

    console.log(e.target.value);

    const options = {
      type: 'POLL',
      id: cuid(),
      name: 'ADMIN',
      avatar: user.avatar,
      title: title,
      data: options,
      total: total,
      viewable: viewable,
    };

    console.log(options);

    // firebaseTools.setCTA(options);
    pollReset();
  }

  function pollReset() {
    setTitle('');
    setOptions([]);
    setTotal(0);
    setShowPollOption(false);
    setViewable(false);
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
      {currentPoll
        ? [
            <div className="current-poll">
              <h3>{currentPoll.title}</h3>
              <ol className="listed-options" key="current-listed-options">
                {currentPoll.options.map((option) => {
                  return (
                    <li key={option.label}>
                      <label className="title">{option.label}</label>
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
                      <label className="title">{option.label}</label>
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
                        onChange={(e) => setCurrentPollOption(e.target.value)}
                      />
                    </Box>,
                  ]
                : null}

              <div className="button-container" key="button-container">
                {title ? (
                  <Button onClick={pollReset} className="default">
                    Cancel
                  </Button>
                ) : null}
                {options.length > 1 ? (
                  <div>
                    {viewable ? (
                      <Button onClick={pollStop} className="secondary">
                        Stop Poll
                      </Button>
                    ) : null}
                    <Button onClick={(e) => pollSubmit()} className="primary">
                      Post Poll
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>,
          ]}
    </div>
  );
}

export default PollCreate;
