import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Collapse from 'react-md/lib/Helpers/Collapse';

import LoremIpsum from 'components/LoremIpsum';

export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };
    this._toggleCollapse = this._toggleCollapse.bind(this);
  }

  _toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <div>
        <Button raised label="Toggle Collapse Thing" onClick={this._toggleCollapse} style={{ marginBottom: 16 }} />
        <Collapse collapsed={this.state.collapsed}>
          <LoremIpsum count={3} className="md-text-container" />
        </Collapse>
      </div>
    );
  }
}
