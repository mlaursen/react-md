import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  // const selectedColor = queryParams.get("color");

  function handleGoToHome() {
    navigate('/');
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleGoForward() {
    navigate(1);
  }

  return (
    <div className="home">
      <p>Hello world!</p>
    </div>
  );
}

export default Home;
