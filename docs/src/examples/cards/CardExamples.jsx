import React from 'react';
import { Card, CardMedia, CardTitle, CardActions, CardText } from 'react-md/lib/Cards';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';

import { randomImage } from 'utils/RandomUtils';

const CardExamples = () => {
  const overlay = (
    <CardTitle
      key="overlay"
      title="Such nature"
      subtitle="Wow!"
    >
      <Button className="margin-left-auto" icon>star_outline</Button>
    </CardTitle>
  );
  return (
    <Card style={{ maxWidth: 600 }} className="md-block-centered">
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
        <Button flat label="Action 1" />
        <Button flat label="Action 2" />
      </CardActions>
      <CardText expandable>
        <LoremIpsum units="paragraphs" count={4} />
      </CardText>
    </Card>
  );
};

export default CardExamples;
