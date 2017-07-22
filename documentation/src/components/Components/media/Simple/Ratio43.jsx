import React from 'react';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media, { MediaOverlay } from 'react-md/lib/Media';

import { randomImage } from 'utils/random';
import Example from './Example';

const Ratio43 = () => (
  <Example>
    <Media aspectRatio="4-3">
      <img src={randomImage({ width: 300, height: 300 })} alt="Something from unsplash.it" />
      <MediaOverlay>
        <CardTitle title="Wow. Amazing." />
      </MediaOverlay>
    </Media>
  </Example>
);
export default Ratio43;
