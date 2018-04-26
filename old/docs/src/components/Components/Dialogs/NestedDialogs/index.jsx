import React, { PureComponent } from 'react';
import { Switch } from 'react-md';

import MainDialog from './MainDialog';

export default class NestedDialogs extends PureComponent {
  state = { fixed: false };
  handleFix = (fixed) => {
    this.setState({ fixed });
  };

  render() {
    const { fixed } = this.state;

    return [
      <Switch
        id="apply-fix"
        key="apply-fix"
        name="apply-fix"
        label="Apply fix?"
        checked={fixed}
        onChange={this.handleFix}
      />,
      <MainDialog key="main-dialog" fixed={fixed} />,
    ];
  }
}
