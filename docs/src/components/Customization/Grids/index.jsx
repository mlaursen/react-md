/* eslint-disable react/no-array-index-key */
import React from 'react';

import Markdown from 'components/Markdown';

import './_styles.scss';
import description from './README.md';

const Grids = () => (
  <section>
    <header className="md-grid">
      <h1 className="md-cell md-cell--12">Grids</h1>
    </header>
    <div className="md-grid grid-example">
      {[...Array(12)].map((_, i) => <div key={i} className="md-cell md-cell--1">1</div>)}
    </div>
    <div className="md-grid grid-example">
      {[...Array(3)].map((_, i) => <div key={i} className="md-cell md-cell--4">4</div>)}
    </div>
    <div className="md-grid grid-example">
      <div className="md-cell md-cell--6">6</div>
      <div className="md-cell md-cell--4">4</div>
      <div className="md-cell md-cell--2">2</div>
    </div>
    <div className="md-grid grid-example">
      <div className="md-cell md-cell--6 md-cell--8-tablet">6 (8 tablet)</div>
      <div className="md-cell md-cell--4 md-cell--6-tablet">4 (6 tablet)</div>
      <div className="md-cell md-cell--2 md-cell--4-phone">2 (4 phone)</div>
    </div>
    <Markdown markdown={description} className="md-cell md-cell--12 md-text-container" />
  </section>
);

export default Grids;
