import React from 'react';
import { Card, CardTitle, CardMedia, CardActions, CardText, CardActionOverlay } from 'react-md/lib/Cards';
import Avatar from 'react-md/lib/Avatars';
import { FlatButton, IconButton } from 'react-md/lib/Buttons';

import { loremIpsum, randomImage } from '../../utils';

const Overlay = () => (
  <CardTitle title="Such nature" subtitle="Wow!" style={{ justifyContent: 'space-between' }}>
    <IconButton>star_outline</IconButton>
  </CardTitle>
);

export default function ExpandableCard() {
  return (
    <div className="md-card-list">
      <Card isExpandable={true} style={{ maxWidth: '350px' }}>
        <CardMedia overlay={<Overlay />}>
          <img src="http://lorempixel.com/600/337/nature" />
        </CardMedia>
        <CardTitle
          avatar={<Avatar src={randomImage({ width: 40, height: 40 })} alt="some person image" />}
          title="Title"
          subtitle="Subtitle"
        />
        <CardActions isExpander={true}>
          <FlatButton>Action 1</FlatButton>
          <FlatButton>Action 2</FlatButton>
        </CardActions>
        <CardText expandable={true}>
          {loremIpsum(4)}
        </CardText>
      </Card>
      <Card style={{ maxWidth: '350px' }}>
        <CardMedia
          aspectRatio={CardMedia.aspect.equal}
          overlay={(
            <CardActionOverlay
              title="TItle goes here"
              subtitle="Subtitle here"
              actions={[{ label: 'Action 1' }, { label: 'Action 2' }]}
            />
          )}
          >
          <img src={randomImage()} alt="Some image" />
        </CardMedia>
      </Card>
    </div>
  );
}
