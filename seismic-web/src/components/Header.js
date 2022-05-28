import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import '../styles/VideoPlayer.scss';
import { LOGO } from '../helpers/constants';

function Header(props) {
  console.log(props);
  //const video = props.video;

  const playerRef = React.useRef();

  return (
    <header>
      <img alt="Logo" src={LOGO} className="logo" />
      {auth.currentUser ? <SignOut /> : <SignIn />}
    </header>
  );
}

export default Header;
