import React from 'react';
import { GridList, Card, Media } from 'react-md';

import images from './HOCUsage/images';

const SimpleGridList = () => (
  <GridList container="pictures" size={1} component="section">
    {images.map(({ url, key }) => (
      <Card key={key}>
        <Media>
          <img src={url} alt="Something" />
        </Media>
      </Card>
    ))}
  </GridList>
);

export default SimpleGridList;
