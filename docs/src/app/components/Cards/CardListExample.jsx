import React from 'react';
import { Card, CardTitle, CardMedia, CardActions } from 'react-md/Cards';
import { IconButton } from 'react-md/Buttons';

import { isMobile } from 'react-md/utils';

export default function CardListExample() {
  return (
    <div className="md-card-list">
      {Array.apply(null, new Array(6)).map((_, i) => (
        <Card key={i} style={{ maxWidth: !isMobile && '180px' }}>
          <CardMedia
            aspectRatio={CardMedia.aspect.equal}
            overlay={<CardTitle title="title" />}
            >
            <img src={`https://unsplash.it/200/200/?random&time=${i}`} />
          </CardMedia>
          <CardActions centered>
            <IconButton>favorite</IconButton>
            <IconButton>bookmark</IconButton>
            <IconButton>reply</IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
