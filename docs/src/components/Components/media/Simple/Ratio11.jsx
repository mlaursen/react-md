import React from 'react';
import Media from 'react-md/lib/Media';

import { randomImage } from 'utils/random';
import Example from './Example';

const Ratio11 = () => (
  <Example>
    <Media aspectRatio="1-1">
      <img src={randomImage({ width: 300, height: 300 })} alt="Something from unsplash.it" />
    </Media>
  </Example>
);

export default Ratio11;
