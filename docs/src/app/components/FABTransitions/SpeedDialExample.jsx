import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { SpeedDial } from 'react-md/lib/FABTransitions';
import SpeedDialMarkdown from './SpeedDialMarkdown';

export default class FABTransitions extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  static propTypes = {
    marked: PropTypes.func.isRequired,
  };

  toggleSpeedDial = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeSpeedDial = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const fabs = [{
      children: 'star_rate',
      onClick: this.closeSpeedDial,
    }, {
      children: 'thumb_up',
      onClick: this.closeSpeedDial,
    }, {
      children: 'play_arrow',
      onClick: this.closeSpeedDial,
    }];
    return (
      <div>
        <SpeedDialMarkdown {...this.props} />
        <SpeedDial
          primary
          onClick={this.toggleSpeedDial}
          fabs={fabs}
          isOpen={this.state.isOpen}
          passiveIconChildren="share"
          activeIconChildren="close"
        />
      </div>
    );
  }
}
