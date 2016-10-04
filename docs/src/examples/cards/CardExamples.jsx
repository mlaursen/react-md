import React from 'react';
import { Card, CardTitle, CardActions, CardText } from 'react-md/lib/Cards';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';

import { randomImage } from 'utils/RandomUtils';

const imgSrc = randomImage({ width: 600, height: 337, section: 'nature' });

const CardExamples = () => {
  return (
    <Card style={{ maxWidth: 600 }} className="md-block-centered">
      <Media>
        <img src={imgSrc} role="presentation" />
        <MediaOverlay>
          <CardTitle title="Such nature" subtitle="Wow!">
            <Button className="margin-left-auto" icon>star_outline</Button>
          </CardTitle>
        </MediaOverlay>
      </Media>
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
