import React from 'react';
import { Card, CardTitle, CardMedia, CardActions, CardText } from 'react-md/Cards';
import Avatar from 'react-md/Avatar';
import { FlatButton } from 'react-md/Buttons';

import { loremIpsum } from '../../utils';

export default function ExpandableCard() {
  return (
    <Card isExpandable={true} style={{ maxWidth: '350px' }}>
      <CardMedia overlay={<CardTitle title="Such nature" subtitle="Wow!" />}>
        <img src="http://lorempixel.com/600/337/nature" />
      </CardMedia>
      <CardTitle
        avatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some person image" />}
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
  );
}
