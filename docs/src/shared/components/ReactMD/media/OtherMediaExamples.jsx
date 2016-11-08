import React, { PureComponent } from 'react';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media from 'react-md/lib/Media/Media';
import MediaOverlay from 'react-md/lib/Media/MediaOverlay';

import InlineSVG from 'components/InlineSVG';
import components from 'components/Home/components.svg';

export default class OtherMediaExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell">
          <Media aspectRatio="1-1">
            <InlineSVG src={components} />
          </Media>
        </div>
        <div className="md-cell">
          <Media>
            <MediaOverlay>
              <CardTitle title="Archer" />
            </MediaOverlay>
            <iframe allowFullScreen src="https://www.youtube.com/embed/kyAn3fSs8_A" />
          </Media>
        </div>
      </div>
    );
  }
}
