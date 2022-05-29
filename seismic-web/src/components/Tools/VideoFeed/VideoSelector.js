import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import FontAwesome from 'react-fontawesome';

import streamDummyData from '../../../util/streamDummyData.js';
import firebaseTools from '../../../util/firebase-tools';

import styles from './VideoSelector.css';

export class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: streamDummyData.videos,
      title: streamDummyData.videos[1].title,
      src: streamDummyData.videos[1].src,
      anchorEl: null,
      open: false,
      expanded: false,
    };
  }

  handleDefault = (event) => {
    this.setState({
      open: false,
    });
  };

  handleClick = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = (title, src) => {
    if (src !== undefined) {
      this.setState({
        open: false,
        title: title,
        src: src,
      });
    } else this.handleDefault();
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleVideoInput = (event) => {
    event.preventDefault();
    const videoInput = this.refs.VideoInput.value.replace(
      /(^\w+:|^)\/\//,
      '//'
    );
    this.onBroadcastStart(videoInput);
    this.refs.VideoInput.value = '';
  };

  onBroadcastStart = (video) => {
    alert('Your broadcasting stream: ' + video);
    firebaseTools.setVideo(1, 'Admin', video, 'video');
  };

  onBroadcastStop = (event) => {
    event.preventDefault();
    firebaseTools.setVideo(1, 'Admin', null, 'video');
  };

  render() {
    return (
      <div className={styles['video-selector']}>
        <Card>
          <CardHeader
            title="Video Stream"
            subheader="Select a video to broadcast"
          />
          <CardContent>
            <Button
              className={styles['dropdown']}
              aria-owns={this.state.open ? 'video-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              {this.state.title}
              <FontAwesome name="chevron-down" />
            </Button>

            <Menu
              id="video-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
            >
              {this.state.videos.map((video, index) => (
                <MenuItem
                  onClick={this.handleRequestClose.bind(
                    this,
                    video.title,
                    video.src
                  )}
                  key={index}
                >
                  {video.title}
                </MenuItem>
              ))}
            </Menu>
          </CardContent>
          <CardActions
            disableActionSpacing
            className={styles['button-container']}
          >
            <FontAwesome name="chevron-down" onClick={this.handleExpandClick} />
            <Button
              className={styles['secondary']}
              onClick={this.onBroadcastStop}
            >
              Stop Current
            </Button>
            <Button
              className={styles['primary']}
              onClick={this.onBroadcastStart.bind(this, this.state.src)}
            >
              Broadcast
            </Button>
          </CardActions>
          <Collapse
            in={this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardContent>
              <form id="frmVideo" role="form" onSubmit={this.handleVideoInput}>
                <input
                  type="VideoInput"
                  className="form-control"
                  id="txtVideo"
                  ref="VideoInput"
                  placeholder="Enter a video stream..."
                  name="video"
                />
              </form>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default VideoInput;
