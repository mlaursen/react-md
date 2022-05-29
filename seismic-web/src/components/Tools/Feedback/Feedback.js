/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import streamDummyData from '../../../../util/streamDummyData.js';
import firebaseTools from '../../../../util/firebase-tools';

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    //this.loadChatControls();
  }

  castFeedback = (feedback) => {
    console.log(feedback);
  };

  render() {
    return (
      <div className={styles['feedback-card']}>
        <div className={styles['actions']}>
          <FontAwesome
            name="thumbs-up"
            onClick={this.castFeedback.bind(this, 'like')}
          />
          <FontAwesome
            name="thumbs-down"
            onClick={this.castFeedback.bind(this, 'dislike')}
          />
        </div>
      </div>
    );
  }
}

export default Feedback;
