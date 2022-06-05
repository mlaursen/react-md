import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import '../styles/Home.scss';

function Home() {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  // const selectedColor = queryParams.get("color");

  const email = 'yasir@seismic.app';

  function handleGoToHome() {
    navigate('/');
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleGoForward() {
    navigate(1);
  }

  function onEmailClick() {
    window.open(`mailto:${email}`);
  }

  return (
    <div className="home">
      <div className="main-copy">
        <h1>Welcome to Seismic</h1>
        <h2>We're in Beta</h2>
        <Button variant="contained" disableElevation onClick={onEmailClick}>
          Contact Us
        </Button>
      </div>
    </div>
  );
}

export default Home;
