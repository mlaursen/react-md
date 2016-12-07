import React, { PureComponent } from 'react';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media from 'react-md/lib/Media/Media';
import MediaOverlay from 'react-md/lib/Media/MediaOverlay';

import './_media.scss';
import randomImages from 'utils/RandomUtils/randomImages';
import LoremIpsum from 'components/LoremIpsum';

// Sorry mobile users
const imgs = randomImages(4, { width: 300, height: 300 });

export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="md-grid md-grid--no-spacing">
        <div className="md-cell md-cell--12 md-grid">
          <div className="md-cell md-cell--3-tablet md-cell--4-desktop">
            <Media aspectRatio="16-9">
              <img src={imgs[0]} role="presentation" />
            </Media>
          </div>
          <LoremIpsum className="md-cell md-cell--5-tablet md-cell--8-desktop" />
        </div>
        <div className="md-cell md-cell--12 md-grid">
          <div className="md-cell md-cell--3-tablet md-cell--4-desktop">
            <Media aspectRatio="4-3">
              <img src={imgs[1]} role="presentation" />
              <MediaOverlay>
                <CardTitle title="Wow. Amazing." />
              </MediaOverlay>
            </Media>
          </div>
          <LoremIpsum className="md-cell md-cell--5-tablet md-cell--8-desktop" />
        </div>
        <div className="md-cell md-cell--12 md-grid">
          <div className="md-cell md-cell--3-tablet md-cell--4-desktop">
            <Media aspectRatio="1-1">
              <img src={imgs[2]} role="presentation" />
              <MediaOverlay>
                <CardTitle title="Or is it?" />
              </MediaOverlay>
            </Media>
          </div>
          <LoremIpsum className="md-cell md-cell--5-tablet md-cell--8-desktop" />
        </div>
        <div className="md-cell md-cell--12 md-grid">
          <div className="md-cell md-cell--3-tablet md-cell--4-desktop">
            <Media aspectRatio="13-3">
              <img src={imgs[3]} role="presentation" />
            </Media>
          </div>
          <LoremIpsum className="md-cell md-cell--5-tablet md-cell--8-desktop" />
        </div>
      </div>
    );
  }
}
