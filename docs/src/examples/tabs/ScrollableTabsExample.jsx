import React, { PureComponent, PropTypes } from 'react';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import ToolbarMenu from '../toolbars/ToolbarMenu';

import { numberToString } from 'utils/StringUtils';

const actions = [
  <Button key="search" icon>search</Button>,
  <ToolbarMenu key="menu" />,
];

// const tabs = ['Web', 'Shopping', 'Videos', 'Images', 'Books', 'Games', 'VR', 'Music'];
const tabs = [...new Array(12)].map((_, i) => `Item ${numberToString(i + 1)}`);

export default class ScrollableTabsExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 4 };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(activeTabIndex) {
    this.setState({ activeTabIndex });
  }

  render() {
    const { activeTabIndex } = this.state;
    return (
      <div>
        <Toolbar
          colored
          title="Page title"
          nav={<Button icon>menu</Button>}
          actions={actions}
        />
        <Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={this._handleChange} />
      </div>
    );
  }
}
