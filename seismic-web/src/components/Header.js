import React from 'react';
import { LOGO } from '../helpers/constants';

import firebase from 'firebase/compat/app';

import '../styles/Header.scss';
import Button from '@mui/material/Button';

import { auth } from '../modules/firebase';

function Header(props) {
  // console.log(props);
  const currentUser = props.user;

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };

    return (
      <Button
        className="sign-in"
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In
      </Button>
    );
  }

  function SignOut() {
    return (
      auth.currentUser && (
        <Button
          className="sign-out"
          variant="outlined"
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      )
    );
  }

  return (
    <header>
      <img alt="Logo" src={LOGO} className="logo" />
      {auth.currentUser ? <SignOut /> : <SignIn />}
    </header>
  );
}

export default Header;
