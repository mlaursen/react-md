import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/App.scss';

function Metaverse() {
  return (
    <div className="App">
      <header>
        <h1>Sandbox Env</h1>
      </header>
      <section className="body">
        <p>Welcome to the metaverse!</p>
      </section>
    </div>
  );
}

export default Metaverse;
