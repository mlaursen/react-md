import React, { useState, useEffect } from 'react';

import { db, analytics } from '../../../modules/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import '../../../styles/Trivia.scss';

import CloseIcon from '@mui/icons-material/Close';

function Trivia() {
  const triviaRef = db.collection('polls').where('type', '==', 'TRIVIA');

  const [trivia] = useCollectionData(triviaRef, { idField: 'id' });
  const [currentTrivia, setCurrentTrivia] = useState(null);
  const [total, setTotal] = useState(0);
  const increment = firebase.firestore.FieldValue.increment(1);

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
    <div className="trivia">
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
                      >
                        <label className="title">{option.label}</label>
                        <label className="value">{optionValue}%</label>
                        <div className="bar" style={pollStyle}></div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>,
          ]
        : null}
    </div>
  );
}

export default Trivia;
