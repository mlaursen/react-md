import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GoogleAnalytics from 'react-ga';
import FontAwesome from 'react-fontawesome';

import firebaseTools from '../../../util/firebase-tools';

// Import Style
import styles from './PollView.css';

export class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollData: {
        title: '',
        options: [],
        total: 0,
      },
      voted: false,
      viewable: false,
    };
    this.getPoll = this.getPoll.bind(this);
  }

  componentDidMount() {
    this.getPoll();
  }

  getPoll = () => {
    firebaseTools.database.ref('poll').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          pollData: snapshot.val().poll,
          viewable: snapshot.val().poll.viewable,
        });
      }
    });
  };

  hidePoll = () => {
    this.setState({ viewable: false });
  };

  castVote = (response) => {
    this.state.pollData.options.map((vote) => {
      if (response.label === vote.label) {
        vote.value++;
        this.state.pollData.total++;
        firebaseTools.setPoll(this.state.pollData);
        GoogleAnalytics.initialize('UA-107154170-1');
        GoogleAnalytics.event({
          category: 'Poll',
          action: 'Casts Vote',
          label: vote.label,
        });
        this.setState(this.state);
      }
    });
  };

  render() {
    return (
      <div className={styles['poll']}>
        {this.state.viewable
          ? [
              !this.state.voted
                ? [
                    <div key={payload.createdAt} style={bgColor}>
                      <div className={styles['avatar']}>
                        <img src={payload.chatAvatar} />
                      </div>
                      <div className={styles['body']}>
                        <div className={styles['user-name']}>
                          {payload.chatName}
                        </div>
                        <div className={styles['copy']}>
                          {payload.chatMessage}
                        </div>
                      </div>
                      <div className={styles['actions']}>
                        <FontAwesome name="times" onClick={this.hideMessage} />
                      </div>
                    </div>,
                  ]
                : [
                    <div>
                      <FontAwesome
                        className={styles['close']}
                        name="times"
                        onClick={this.hidePoll}
                      />
                      <div className={styles['component-container']}>
                        <h2>{this.state.pollData.title}</h2>
                        <ul className={styles['list-unstyled']}>
                          {this.state.pollData.options.map((vote) => {
                            let pollStyle = {
                              width: `${
                                (vote.value / this.state.pollData.total) * 100
                              }%`,
                            };
                            let voteValue = vote.value;
                            if (voteValue !== 0) {
                              voteValue = (
                                (vote.value / this.state.pollData.total) *
                                100
                              ).toFixed(0);
                            }
                            return (
                              <li
                                key={vote.label}
                                onClick={this.castVote.bind(this, vote)}
                              >
                                <label className={styles['title']}>
                                  {vote.label}
                                </label>
                                <label className={styles['value']}>
                                  {voteValue}%
                                </label>
                                <div
                                  className={styles['bar']}
                                  style={pollStyle}
                                ></div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>,
                  ],
            ]
          : null}
      </div>
    );
  }
}

export default PollView;
