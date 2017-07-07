import React from 'react';

import { randomImage } from 'utils/random';
import NewsItem from './NewsItem';

const news = [{
  key: 'news-1',
  title: 'Day reappeared. The tempest still raged with undimished termoil.',
  subtitle: 'Corned beef proscuitto ground something',
  time: '10 min',
  titleClassName: 'two-line-clamp',
  subtitleClassName: 'line-clamp',
  img: randomImage({ width: 100, height: 80 }),
}, {
  key: 'news-2',
  title: 'There were some signs of a calm at noon.',
  subtitle: 'Things to enjoy.',
  time: '1 hr',
  titleClassName: 'two-line-clamp',
  subtitleClassName: 'line-clamp',
  img: randomImage({ width: 100, height: 80 }),
}, {
  key: 'news-3',
  title: 'Fun tropical escapes',
  subtitle: 'The night was comparatively quiet. Some of the sails were again.',
  time: '1 hr',
  titleClassName: 'line-clamp',
  subtitleClassName: 'two-line-clamp',
  img: randomImage({ width: 100, height: 80 }),
}, {
  key: 'news-4',
  title: 'Pork loin sausage shankle, keilbasas bacon beef rips',
  subtitle: 'Drumstick turkey shoulder spare parts',
  time: '1 hr',
  titleClassName: 'line-clamp',
  subtitleClassName: 'two-line-clamp',
  img: randomImage({ width: 100, height: 80 }),
}, {
  key: 'news-5',
  title: 'Cherry blossoms in bloom',
  subtitle: 'Krieger-san. My cherry blossoms... are wilting!',
  time: '2 hr',
  titleClassName: 'line-clamp',
  subtitleClassName: 'two-line-clamp',
  img: randomImage({ width: 100, height: 80 }),
}];

const NewsStand = () => {
  const items = news.map(props => <NewsItem {...props} />);

  return (
    <ol className="md-list-unstyled md-grid">
      {items}
    </ol>
  );
};

export default NewsStand;
