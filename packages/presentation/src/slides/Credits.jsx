import React, { useState, useEffect, useRef } from "react";
import { TextContainer, Text } from "@react-md/typography";
import Confetti from "react-confetti";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const presenters = ["Courtney Boone", "Stas Danishevsky", "Mikkel Laursen"];

const Credits = () => {
  const [run, setRun] = useState(false);
  const [currentPresenters, setCurrentPresenters] = useState([]);
  const runRef = useRef(false);
  useEffect(() => {
    if (presenters.length === currentPresenters.length) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        if (!run) {
          setRun(true);
        }
        setCurrentPresenters(prev => presenters.slice(0, prev.length + 1));
      },
      !currentPresenters.length ? 300 : 2000
    );
    return () => window.clearTimeout(timeout);
  }, [currentPresenters]);

  useEffect(() => {
    if (runRef.current) {
      return;
    }
    const timeout = setTimeout(
      () => {
        setRun(!run);
        if (run) {
          runRef.current = true;
        }
      },
      run ? 15000 : 2000
    );

    return () => window.clearTimeout(timeout);
  }, [run]);
  return (
    <TextContainer>
      <Text type="headline-1">Presented by</Text>
      <div className="markdown-container">
        <TransitionGroup className="markdown-container" component="ul">
          {currentPresenters.map(name => (
            <CSSTransition
              key={name}
              timeout={{ enter: 300 }}
              classNames="cross-fade"
            >
              <li>{name}</li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      {run && (
        <Confetti height={window.innerHeight} width={window.innerWidth} />
      )}
    </TextContainer>
  );
};

export default Credits;
