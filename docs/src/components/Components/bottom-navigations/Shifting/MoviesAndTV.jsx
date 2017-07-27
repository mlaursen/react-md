import React from 'react';

import { randomImage } from 'utils/random';
import Section from './Section';

const RELEASES = [{
  title: 'Countryside Veterinarian',
  subtitle: 'Drama',
  img: randomImage({ width: 140, time: 1 }),
}, {
  title: 'Town of Golds',
  subtitle: 'Action & Adventure',
  img: randomImage({ width: 140, time: 2 }),
}];

const RECOMMENDED = [{
  title: 'Terminator',
  subtitle: 'Science Fiction',
  img: randomImage({ width: 140 }),
}, {
  title: 'Shrek 2',
  subtitle: 'Reality TV',
  img: randomImage({ width: 140 }),
}, {
  title: 'Running Man',
  subtitle: 'Heartfelt drama',
  img: randomImage({ width: 140 }),
}];

const MoviesAndTV = () => (
  <div className="md-grid md-grid--no-spacing">
    <Section title="New Releases" data={RELEASES} cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" />
    <Section title="Recommended" data={RECOMMENDED} cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" />
  </div>
);

export default MoviesAndTV;
