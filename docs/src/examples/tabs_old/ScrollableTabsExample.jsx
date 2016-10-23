import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Tabs from 'react-md/lib/Tabs/Tabs';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import ToolbarMenu from '../toolbars/ToolbarMenu';

import { numberToString } from 'utils/StringUtils';
import LoremIpsum from 'components/LoremIpsum';

const actions = [
  <Button key="search" icon>search</Button>,
  <ToolbarMenu key="menu" />,
];

// const tabs = ['Web', 'Shopping', 'Videos', 'Images', 'Books', 'Games', 'VR', 'Music'];
const tabs = [...new Array(12)].map((_, i) => ({
  label: `Item ${numberToString(i + 1)}`,
  children: <LoremIpsum className="md-cell md-cell--12" key={i} />,
}));

export default class ScrollableTabsExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 2, children: tabs[2].children };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(activeTabIndex, children) {
    this.setState({ activeTabIndex, children });
  }

  render() {
    const { activeTabIndex, children } = this.state;
    return (
      <div>
        <Toolbar
          colored
          title="Page title"
          nav={<Button icon>menu</Button>}
          actions={actions}
        />
        <Tabs tabs={tabs} activeTabIndex={activeTabIndex} onChange={this._handleChange} />
        <CSSTransitionGroup
          component="section"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-grid"
        >
          {children}
        </CSSTransitionGroup>
      </div>
    );
  }
}
