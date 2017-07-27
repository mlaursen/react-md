/*  eslint-disable react/no-array-index-key */
import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

const Starred = () => (
  <Card className="md-cell md-cell--12 md-text-container">
    <CardTitle title="Starred" />
    <CardText>
      <List>
        {[...new Array(8)].map((_, i) => (
          <ListItem key={i} primaryText={`Starred ${i}`} leftIcon={<FontIcon>star</FontIcon>} />
        ))}
      </List>
    </CardText>
  </Card>
);

export default Starred;
