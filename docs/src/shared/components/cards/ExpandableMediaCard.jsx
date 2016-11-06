import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

import LoremIpsum from 'components/LoremIpsum';

import randomImage from 'utils/RandomUtils/randomImage';

const imgSrc = randomImage({ width: 600, height: 337, section: 'nature' });

const ExpandableMediaCard = () => (
  <Card style={{ maxWidth: 600 }} className="md-block-centered">
    <Media>
      <img src={imgSrc} role="presentation" />
      <MediaOverlay>
        <CardTitle title="Such nature" subtitle="Wow!">
          <Button className="md-cell--right" icon>star_outline</Button>
        </CardTitle>
      </MediaOverlay>
    </Media>
    <CardTitle
      avatar={<Avatar src={randomImage()} role="presentation" />}
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

export default ExpandableMediaCard;
