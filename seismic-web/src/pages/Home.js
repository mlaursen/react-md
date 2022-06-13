import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import Atropos from 'atropos';

import '../styles/Home.scss';

function Home() {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  // const selectedColor = queryParams.get("color");

  const email = 'yasir@seismic.app';

  const myAtropos = Atropos({
    el: '.my-atropos',
    activeOffset: 40,
    shadowScale: 0,
    onEnter() {
      //console.log('Enter');
    },
    onLeave() {
      //console.log('Leave');
    },
    onRotate(x, y) {
      //console.log('Rotate', x, y);
    },
  });

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
      <div className="main-copy" data-atropos-offset="0">
        <h1>Welcome to Seismic</h1>
        <h2>We're in Beta</h2>
        <Button variant="contained" disableElevation onClick={onEmailClick}>
          Contact Us
        </Button>
      </div>
      <div className="atropos my-atropos">
        <div className="atropos-scale">
          <div className="atropos-rotate">
            <div className="atropos-inner">
              <div className="container">
                <div className="planet">
                  <div className="orbit">
                    <div className="moon"></div>
                  </div>
                  <div className="orbit two">
                    <div className="moon two"></div>
                  </div>
                  <div className="orbit three">
                    <div className="moon three"></div>
                  </div>
                  <div className="orbit four">
                    <div className="moon four"></div>
                  </div>
                  <div className="orbit five">
                    <div className="moon five"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
