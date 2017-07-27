import React from 'react';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Paper from 'react-md/lib/Papers';

import components from 'components/Home/components.svg';

const OtherMediaTypes = () => (
  <div className="md-grid">
    <Paper className="md-cell">
      <Media aspectRatio="1-1">
        <img src={components} alt="A chemistry set with material design colors flowing into a text editor." />
      </Media>
    </Paper>
    <Paper className="md-cell md-cell--top">
      <Media>
        <MediaOverlay>
          <CardTitle title="Archer" />
        </MediaOverlay>
        <iframe allowFullScreen src="https://www.youtube.com/embed/kyAn3fSs8_A" />
      </Media>
    </Paper>
  </div>
);

export default OtherMediaTypes;
