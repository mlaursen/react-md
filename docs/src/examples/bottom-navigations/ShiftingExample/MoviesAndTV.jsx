import React from 'react';
import loremIpsum from 'lorem-ipsum';

import { randomImage, getRandomInt } from 'utils/RandomUtils';
import Section from './Section';

const releasesData = [{
  title: 'Countryside Veterinarian',
  subtitle: 'Drama',
  img: randomImage({ width: 140, time: 1 }),
}, {
  title: 'Town of Golds',
  subtitle: 'Action & Adventure',
  img: randomImage({ width: 140, time: 2 }),
}];

const recommendedData = [{
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 1, units: 'words' }),
  img: randomImage({ width: 140, time: 3 }),
}, {
  title: loremIpsum({ count: 1, units: 'words' }),
  subtitle: loremIpsum({ count: 2, units: 'words' }),
  img: randomImage({ width: 140, time: 4 }),
}, {
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 3, units: 'words' }),
  img: randomImage({ width: 140, time: 5 }),
}];

const loremTitle = loremIpsum({ count: 2, units: 'words' });
const lorems = [...new Array(8)].map((_, i) => ({
  title: loremIpsum({ count: getRandomInt({ min: 1, max: 3 }), units: 'words' }),
  subtitle: loremIpsum({ count: getRandomInt({ min: 1, max: 5 }), units: 'words' }),
  img: randomImage({ width: 140, time: 6 + i }),
}));

const MoviesAndTV = () => {
  return (
    <div className="md-grid md-grid--no-spacing">
      <Section title="New releases" data={releasesData} cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" />
      <Section title="Recommended for You" data={recommendedData} cardClassName="md-cell" />
      <Section title={loremTitle} data={lorems} cardClassName="md-cell" className="md-text-capitalize" />
    </div>
  );
};

export default MoviesAndTV;
