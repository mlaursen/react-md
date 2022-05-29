import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import firebaseTools from '../../../../util/firebase-tools';

export class VideoLive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: [],
    };
    this.getVideo = this.getVideo.bind(this);
  }

  componentDidMount() {
    this.getVideo();
  }

  getVideo = () => {
    firebaseTools.database.ref('video').on('value', (snapshot) => {
      this.setState({
        payload: snapshot.val(),
      });
    });
  };

  render() {
    return <div>{payload.message}</div>;
  }
}

export default VideoLive;
