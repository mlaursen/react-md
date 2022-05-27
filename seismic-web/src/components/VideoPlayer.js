import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import '../styles/VideoPlayer.scss';

import { MOVIES } from '../helpers/constants';

function VideoPlayer() {
  const playerRef = React.useRef();

  function playVideo() {
    playerRef.current.play();
  }

  function pauseVideo() {
    playerRef.current.pause();
  }

  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }

  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      className="videoPlayer"
      autoplay="true"
      src={MOVIES[1]}
    />
  );
}

export default VideoPlayer;
