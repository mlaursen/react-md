import React, { useState, useEffect } from 'react';

import { db, analytics } from '../../../modules/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import '../../../styles/Trivia.scss';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function Trivia() {
  const triviaRef = db.collection('polls').where('type', '==', 'TRIVIA');

  const [trivia] = useCollectionData(triviaRef, { idField: 'id' });
  const [currentTrivia, setCurrentTrivia] = useState(null);
  const [total, setTotal] = useState(0);
  const increment = firebase.firestore.FieldValue.increment(1);
  const [myVote, setMyVote] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
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

  function triviaSubmit(vote) {
    setMyVote(vote);
    if (vote.label === currentTrivia.answer) {
      setIsCorrect(true);
    }

    let triviaSnapshot = currentTrivia;
    triviaSnapshot.options.map((response) => {
      if (response.label === vote.label) {
        response.value++;
        triviaSnapshot.total++;
      }
    });

    if (active) {
      db.collection('polls')
        .where('id', '==', currentTrivia.id)
        .limitToLast(1)
        .orderBy('createdAt')
        .get()
        .then((query) => {
          const loadedTrivia = query.docs[0];
          const loadedTriviaRef = loadedTrivia.ref;
          loadedTriviaRef.update(triviaSnapshot);
        });
      setActive(false);
      firebase.analytics().logEvent('trivia_played');
    }
  }

  function closeTrivia() {
    console.log('closing trivia');
    setViewable(false);
  }

  return (
    <div className={'trivia ' + (active ? 'active ' : 'inactive ')}>
      {viewable
        ? [
            <div key={currentTrivia.id}>
              <CloseIcon className="close" onClick={closeTrivia} />
              <div className="component-container">
                <h2>{currentTrivia.title}</h2>
                <ul className="list-unstyled">
                  {currentTrivia.options.map((option) => {
                    let pollStyle = {
                      width: `${(option.value / currentTrivia.total) * 100}%`,
                    };
                    let optionValue = option.value;
                    if (optionValue !== 0) {
                      optionValue = (
                        (option.value / currentTrivia.total) *
                        100
                      ).toFixed(0);
                    }
                    return (
                      <li
                        key={option.label}
                        onClick={(e) => triviaSubmit(option)}
                        className={
                          (myVote &&
                          !active &&
                          currentTrivia.answer === myVote.label &&
                          myVote.label === option.label
                            ? 'correct '
                            : '') +
                          (myVote &&
                          !active &&
                          currentTrivia.answer !== myVote.label &&
                          myVote.label === option.label
                            ? 'incorrect '
                            : '')
                        }
                      >
                        <label className="title">{option.label}</label>
                        {!active
                          ? [
                              <>
                                <label className="value">{optionValue}%</label>
                                {currentTrivia.answer === option.label ? (
                                  <CheckIcon />
                                ) : (
                                  <ClearIcon />
                                )}
                                <div className="bar" style={pollStyle}></div>
                              </>,
                            ]
                          : null}
                      </li>
                    );
                  })}
                </ul>
                <div className="response">
                  {isCorrect && !active
                    ? [<p>You got it right! +{currentTrivia.value} points</p>]
                    : null}
                  {!isCorrect && !active
                    ? [<p>Incorrect. Better luck next time. +0 points</p>]
                    : null}
                </div>
              </div>
            </div>,
          ]
        : null}
    </div>
  );
}

export default Trivia;
