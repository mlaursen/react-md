/*  eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Card,
  CardText,
  CardTitle,
  FontIcon,
  List,
  ListItem,
} from 'react-md';

const Starred = () => (
  <Card className="md-cell md-cell--12 md-text-container">
    <CardTitle title="Starred" />
    <CardText>
      <List>
        {Array.from(Array(8)).map((_, i) => (
          <ListItem key={i} primaryText={`Starred ${i}`} leftIcon={<FontIcon>star</FontIcon>} />
        ))}
      </List>
    </CardText>
  </Card>
);

export default Starred;
