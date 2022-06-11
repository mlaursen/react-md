import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import cuid from 'cuid';
// import firebaseTools from '../../../util/firebase-tools';

import styles from './PollCreate.css';

function PollCreate(props) {
  const user = props.useer;

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(null);
  const [total, setTotal] = useState(0);
  const [showPollQuestion, setShowPollQuestion] = useState(false);
  const [showPollOption, setShowPollOption] = useState(false);
  const [viewable, setViewable] = useState(false);

  useEffect(() => {
    loadPoll();
  }, []);

  function loadPoll() {
    /*
    firebaseTools.database.ref('poll').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ viewable: snapshot.val().poll.viewable });
      }
    });
    */
    console.log('loading poll');
  }

  function pollQuestionSubmit(val) {
    const pollTitle = val;

    console.log(val);

    setTitle(pollTitle);
    setShowPollQuestion(false);
    setShowPollOption(true);
  }

  function pollOptionSubmit(e) {
    e.preventDefault();
    const pollOption = pollOption.value;
    const pollOptions = options;

    pollOptions.push({
      label: pollOption,
      value: 0,
    });

    setOptions({ options: pollOptions });

    setTitle('');
  }

  function pollSubmit(e) {
    e.preventDefault();
    let pollData = {};

    setViewable(true);

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

  function pollReset(e) {
    e.preventDefault();

    setTitle('');
    setOptions(null);
    setTotal(0);
    setShowPollQuestion(true);
    setShowPollOption(false);
    setViewable(false);
  }

  function pollStop(e) {
    pollReset(e);
    setViewable(false);
    pollSubmit();
  }

  return (
    <div className={styles['poll']}>
      <h3>{title}</h3>
      <ol>
        {options &&
          options.map((vote) => {
            return (
              <li key={vote.label}>
                <label className="title">{vote.label}</label>
              </li>
            );
          })}
      </ol>

      {showPollQuestion && !viewable ? (
        <form
          id="frmPollQuestion"
          role="form"
          value={title}
          onSubmit={(e) => pollQuestionSubmit(e.target.value)}
        >
          <input
            type="pollQuestion"
            className="form-control"
            id="txtPollQuestion"
            placeholder="Ask a Question..."
            name="pollQuestion"
          />
        </form>
      ) : null}

      {!showPollQuestion ? (
        <form id="formPollOption" role="form" onSubmit={pollOptionSubmit}>
          <input
            type="pollOption"
            className="form-control"
            id="txtPollOption"
            placeholder="Enter an Option"
            name="pollOption"
          />
        </form>
      ) : null}

      {!showPollQuestion || options || viewable ? (
        <div className="button-container">
          {showPollQuestion ? null : (
            <Button onClick={pollReset} className="default">
              Cancel
            </Button>
          )}
          {viewable ? (
            <Button onClick={pollStop} className="secondary">
              Stop Poll
            </Button>
          ) : null}
          {options ? (
            <Button onClick={() => pollSubmit()} className="primary">
              Broadcast New Poll
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default PollCreate;
