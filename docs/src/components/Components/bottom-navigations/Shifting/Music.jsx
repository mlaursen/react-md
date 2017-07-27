import React from 'react';
import { randomImage } from 'utils/random';

import Section from './Section';

const cardClassName = 'md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop';
const NEW_RELEASES = [{
  title: 'In a Perfect World',
  subtitle: 'Kodaline',
  img: randomImage({ width: 140, time: 0 }),
}, {
  title: 'Native',
  subtitle: 'One Republic',
  img: randomImage({ width: 140, time: 1 }),
}];

const RECOMMEDNED = [{
  title: 'All by Myself',
  subtitle: 'Eric Carmen',
  img: randomImage({ width: 140 }),
}, {
  title: 'Prequel to the Sequel',
  subtitle: 'Between the Buried and Me',
  img: randomImage({ width: 140 }),
}, {
  title: 'Virtual Insanity',
  subtitle: 'Jamiroquai',
  img: randomImage({ width: 140 }),
}];

const Music = () => (
  <div className="md-grid md-grid--no-spacing">
    <Section title="New Releases" data={NEW_RELEASES} cardClassName={cardClassName} titleIcon />
    <Section title="Recommended" data={RECOMMEDNED} cardClassName={cardClassName} />
  </div>
);

export default Music;
