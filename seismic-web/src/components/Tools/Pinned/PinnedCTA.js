import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import firebaseTools from '../../../util/firebase-tools';

import PinnedMessage from './PinnedMessage';
import PinnedPoll from './PinnedPoll';

// Import Style
import styles from './PinnedCTA.css';
import animations from './PinnedAnimations.css';

export class PinnedCTA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: [],
      viewable: false,
    };
  }

  componentDidMount() {
    this.getCTA();
  }

  getCTA = () => {
    firebaseTools.database.ref('cta').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          payload: snapshot.val().options,
          viewable: snapshot.val().options.viewable,
        });
      }
    });
  };

  hideMessage = () => {
    this.setState({ viewable: false });
  };

  render() {
    const payload = this.state.payload,
      viewable = this.state.viewable;

    return (
      <div className={styles['message']}>
        {payload ? (
          <div>
            <ReactCSSTransitionGroup
              transitionName={{
                enter: `${animations['message-enter']}`,
                leave: `${animations['message-leave']}`,
              }}
              transitionEnterTimeout={0}
              transitionLeaveTimeout={0}
            >
              {payload.type === 'MESSAGE'
                ? [
                    <PinnedMessage
                      key={`${payload.id}-${payload.type}`}
                      type={payload.type}
                      id={payload.id}
                      avatar={payload.avatar}
                      name={payload.name}
                      message={payload.message}
                      viewable={viewable}
                    />,
                  ]
                : null}
            </ReactCSSTransitionGroup>

            {payload.type === 'POLL'
              ? [
                  <PinnedPoll
                    key={`${payload.id}-${payload.type}`}
                    type={payload.type}
                    id={payload.id}
                    name={payload.name}
                    avatar={payload.avatar}
                    title={payload.title}
                    data={payload.data}
                    total={payload.total}
                    viewable={viewable}
                  />,
                ]
              : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PinnedCTA;
