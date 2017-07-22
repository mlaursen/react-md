import React from 'react';
import Media from 'react-md/lib/Media';

import Example from './Example';
import { randomImage } from 'utils/random';

const Ratio169 = () => (
  <Example>
    <Media aspectRatio="16-9">
      <img src={randomImage({ width: 300, height: 300 })} alt="Something from unsplash.it" />
    </Media>
  </Example>
);

export default Ratio169;
