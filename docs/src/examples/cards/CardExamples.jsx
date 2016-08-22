import React from 'react';
import { Card, CardMedia, CardTitle, CardActions, CardText } from 'react-md/lib/Cards';
import Avatar from 'react-md/lib/Avatars';
import { FlatButton, IconButton } from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';

import { randomImage } from 'utils/RandomUtils';

const CardExamples = () => {
  const overlay = (
    <CardTitle
      key="overlay"
      title="Such nature"
      subtitle="Wow!"
    >
      <IconButton className="margin-left-auto">star_outline</IconButton>
    </CardTitle>
  );
  return (
    <Card className="media-card">
      <CardMedia overlay={overlay}>
        <img
          src={randomImage({ width: 600, height: 337, section: 'nature' })}
          role="presentation"
        />
      </CardMedia>
      <CardTitle
        avatar={<Avatar src={randomImage()} alt="Some random image" />}
        title="Card Title"
        subtitle="Card Subtitle"
      />
      <CardActions isExpander>
        <FlatButton label="Action 1" />
        <FlatButton label="Action 2" />
      </CardActions>
      <CardText expandable>
        <LoremIpsum units="paragraphs" count={4} />
      </CardText>
    </Card>
  );
};

export default CardExamples;
