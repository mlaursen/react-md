import React, { PureComponent } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import FlatButton from 'react-md/lib/Buttons/FlatButton';

import { GITHUB_LINK } from 'constants';

export default class Contribute extends PureComponent {
  render() {
    return (
      <div className="contribute">
        <h4 className="md-title">Contributing</h4>
        <p className="md-body-2">
          This project is currently developed by a single person. Feel free
          to contribute!
        </p>
        <FlatButton secondary label="Github" href={GITHUB_LINK} type={null}>
          <FontIcon iconClassName="fa fa-github" />
        </FlatButton>
      </div>
    );
  }
}
