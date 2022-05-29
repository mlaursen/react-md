import React, { useRef, useEffect } from 'react';
import VideoJS from '../modules/video.js';

import '../styles/VideoPlayer.scss';

function VideoPlayer(props) {
  const playerRef = useRef(null);

  const video = props.video;

  const videoJsOptions = {
    sources: [
      {
        src: '//vjs.zencdn.net/v/oceans.mp4',
      },
    ],
  };

  return <VideoJS playerOptions={videoJsOptions} />;
}

export default VideoPlayer;
