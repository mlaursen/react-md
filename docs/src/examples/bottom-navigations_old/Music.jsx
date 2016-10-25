import React, { PureComponent, PropTypes } from 'react';
import loremIpsum from 'lorem-ipsum';

import { randomImage, randomImages, getRandomInt } from 'utils/RandomUtils';
import Section from './Section';

const releasesData = [{
  title: 'In a Perfect World',
  subtitle: 'Kodaline',
}, {
  title: 'Native',
  subtitle: 'One Republic',
}];

const recommendedData = [{
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 1, units: 'words' }),
}, {
  title: loremIpsum({ count: 1, units: 'words' }),
  subtitle: loremIpsum({ count: 2, units: 'words' }),
}, {
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 3, units: 'words' }),
}];

const imgs = randomImages(releasesData.length + recommendedData.length, { width: 140 });
releasesData.forEach((datum, i) => {
  datum.img = imgs[i];
});
recommendedData.forEach((datum, i) => {
  datum.img = imgs[i + releasesData.length];
});

const loremTitle = loremIpsum({ count: 2, units: 'words' });
const lorems = Array.apply(null, new Array(8)).map((_, i) => ({
  title: loremIpsum({ count: getRandomInt({ min: 1, max: 3 }), units: 'words' }),
  subtitle: loremIpsum({ count: getRandomInt({ min: 1, max: 5 }), units: 'words' }),
  img: randomImage({ width: 140, time: i }),
}));
export default class Music extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    return (
      <div>
        <Section title="New Releases" data={releasesData} cardClassName="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop" titleIcon="more_vert" />
        <Section title="Recommended" data={recommendedData} cardClassName="recommended-card" />
        <Section title={loremTitle} data={lorems} className="lorems" cardClassName="lorem-card" />
      </div>
    );
  }
}
