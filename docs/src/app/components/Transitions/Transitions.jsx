import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { FloatingButton } from 'react-md/lib/Buttons';
import SpeedDial from 'react-md/lib/SpeedDial';

export default class Transitions extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    return (
      <div>
        <SpeedDial fabs={[{ children: 'thumb_up' }]}>
          <FloatingButton primary>share</FloatingButton>
        </SpeedDial>
      </div>
    );
  }
}
