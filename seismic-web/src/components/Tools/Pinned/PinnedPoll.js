import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import firebaseTools from '../../../util/firebase-tools';

// Import Style
import styles from './PinnedPoll.css';

export class PinnedPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewable: this.props.viewable,
    };
  }

  hideMessage = () => {
    this.setState({ viewable: false });
  };

  castVote = (vote) => {
    let response = vote,
      voteOptions = this.props.data,
      voteTotal = this.props.total;

    voteOptions.map((vote) => {
      if (response === vote.label) {
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
      }
    });
  };

  render() {
    const pollOptions = this.props.data;
    const pollOptionsList = pollOptions.map((vote, i) => {
      let pollStyle = {
          width: `${(vote.value / this.props.total) * 100}%`,
        },
        voteValue = vote.value;

      if (voteValue !== 0) {
        voteValue = ((vote.value / this.props.total) * 100).toFixed(0);
      }

      return (
        <li
          key={i}
          data-value={vote.label}
          onClick={this.castVote.bind(this, vote.label)}
        >
          <label className={styles['title']}>{vote.label}</label>
          <label className={styles['value']}>{voteValue}%</label>
          <div className={styles['bar']} style={pollStyle}></div>
        </li>
      );
    });

    return (
      <div
        key={`${this.props.id}-${this.props.type}`}
        className={`${styles['pinned-poll']} ${
          this.state.viewable && this.props.viewable ? '' : styles['hide']
        }`}
      >
        <div className={styles['body']}>
          <div className={styles['poll']}>
            <div className={styles['title']}>{this.props.title}</div>
            <div className={styles['pinned-poll-results']}>
              <ul className={styles['list-unstyled']}>{pollOptionsList}</ul>
            </div>
          </div>
        </div>
        <div className={styles['actions']}>
          <FontAwesome name="times" onClick={this.hideMessage} />
        </div>
      </div>
    );
  }
}

PinnedPoll.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default PinnedPoll;
