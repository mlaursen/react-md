import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import '../styles/VideoPlayer.scss';

function VideoPlayer(props) {
  const video = props.video;

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
      autoPlay={true}
      controls={true}
      src={video}
    />
  );
}

export default VideoPlayer;
