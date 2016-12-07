import React from 'react';
import loremIpsum from 'lorem-ipsum';

import randomInt from 'utils/RandomUtils/randomInt';
import randomImage from 'utils/RandomUtils/randomImage';
import Section from './Section';

const releasesData = [{
  title: 'In a Perfect World',
  subtitle: 'Kodaline',
  img: randomImage({ width: 140, time: 0 }),
}, {
  title: 'Native',
  subtitle: 'One Republic',
  img: randomImage({ width: 140, time: 1 }),
}];

const recommendedData = [{
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 1, units: 'words' }),
  img: randomImage({ width: 140, time: 2 }),
}, {
  title: loremIpsum({ count: 1, units: 'words' }),
  subtitle: loremIpsum({ count: 2, units: 'words' }),
  img: randomImage({ width: 140, time: 3 }),
}, {
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 3, units: 'words' }),
  img: randomImage({ width: 140, time: 4 }),
}];

const loremTitle = loremIpsum({ count: 2, units: 'words' });
const lorems = [...new Array(8)].map((_, i) => ({
  title: loremIpsum({ count: randomInt({ min: 1, max: 3 }), units: 'words' }),
  subtitle: loremIpsum({ count: randomInt({ min: 1, max: 5 }), units: 'words' }),
  img: randomImage({ width: 140, time: i }),
}));

const Music = () => (
  <div>
    <Section title="New Releases" data={releasesData} cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" titleIcon="more_vert" />
    <Section title="Recommended" data={recommendedData} cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" />
    <Section title={loremTitle} data={lorems} className="lorems" cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" />
  </div>
);

export default Music;
