import React from 'react';
import { Card, CardTitle, CardActions } from 'react-md/lib/Cards';
import Media from 'react-md/lib/Media';
import MediaOverlay from 'react-md/lib/Media/MediaOverlay';
import Button from 'react-md/lib/Buttons/Button';

import { randomImage } from 'utils/RandomUtils';

const CardListExample = () => {
  const cards = [...new Array(10)].map((_, i) => (
    <Card key={i} className="md-cell md-cell--2 md-cell--4-tablet">
      <Media aspectRatio="1-1">
        <MediaOverlay>
          <CardTitle title="Title" />
        </MediaOverlay>
        <img src={randomImage({ width: 220, time: i })} role="presentation" />
      </Media>
      <CardActions centered>
        <Button icon>favorite</Button>
        <Button icon>bookmark</Button>
        <Button icon>reply</Button>
      </CardActions>
    </Card>
  ));

  return (
    <div className="md-grid">
      {cards}
    </div>
  );
};

export default CardListExample;
