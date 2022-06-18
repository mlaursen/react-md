import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';

import firebaseTools from '../../../../util/firebase-tools';

// Import Style
import styles from './PinnedPoll.css';

export class PollOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false,
    };
  }

  renderPollOptions() {
    const castVote = (response) => {
      console.log(response);
      let voteOptions = this.props.data,
        voteTotal = this.props.total;
      voteOptions.map((vote) => {
        if (response.label === vote.label) {
          vote.value++;
          voteTotal++;

          const options = {
            type: 'POLL',
            id: this.props.id,
            name: this.props.name,
            avatar: this.props.avatar,
            title: this.props.title,
            data: voteOptions,
            total: voteTotal,
            viewable: true,
          };

          firebaseTools.setCTA(options);
          this.setState({ voted: true });
        }
      });
    };

    return (
      <ol>
        {this.props.data.map((vote, index) => {
          return (
            <li key={`${index}-options`} onClick={castVote.bind(this, vote)}>
              <label className={styles['title']}>{vote.label}</label>
            </li>
          );
        })}
      </ol>
    );
  }

  renderPollResults() {
    return (
      <div className={styles['pinned-poll-results']}>
        <ul className={styles['list-unstyled']}>
          {this.props.data.map((vote, index) => {
            let pollStyle = {
              width: `${(vote.value / this.props.total) * 100}%`,
            };
            let voteValue = vote.value;
            if (voteValue !== 0) {
              voteValue = ((vote.value / this.props.total) * 100).toFixed(0);
            }
            return (
              <li key={`${index}-answers`}>
                <label className={styles['title']}>{vote.label}</label>
                <label className={styles['value']}>{voteValue}%</label>
                <div className={styles['bar']} style={pollStyle}></div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className={styles['poll']}>
        <div className={styles['title']}>{this.props.title}</div>
        {!this.state.voted
          ? this.renderPollOptions()
          : this.renderPollResults()}
      </div>
    );
  }
}

PollOptions.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default PollOptions;
