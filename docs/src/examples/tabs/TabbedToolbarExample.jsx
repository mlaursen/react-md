import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import TabbedToolbar from 'react-md/lib/Tabs/TabbedToolbar';

import LoremIpsum from 'components/LoremIpsum';
import ToolbarMenu from '../toolbars/ToolbarMenu';

const nav = <Button key="nav" icon>menu</Button>;
const toolbarActions = [
  <Button key="search" icon>search</Button>,
  <ToolbarMenu key="menu" />,
];

const ipsumProps = {
  count: 20,
  className: 'md-cell md-cell--12',
  style: { maxHeight: 400, overflowY: 'auto' },
};

const tabs = [{
  label: 'Recents',
  icon: <FontIcon>phone</FontIcon>,
  children: <LoremIpsum key="recent" {...ipsumProps} />,
}, {
  label: 'Favorites',
  // Its width is off for some reason
  icon: <FontIcon style={{ width: 24 }}>favorites</FontIcon>,
  children: <LoremIpsum key="favorites" {...ipsumProps} />,
}, {
  label: 'Nearby',
  icon: <FontIcon>person</FontIcon>,
  children: <LoremIpsum key="nearby" {...ipsumProps} />,
}];

export default class TabbedToolbarExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { children: tabs[0].children, activeTabIndex: 0 };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(activeTabIndex, children) {
    this.setState({ activeTabIndex, children });
  }

  render() {
    const { activeTabIndex, children } = this.state;
    return (
      <div>
        <TabbedToolbar
          key="tabbed-toolbar"
          title="Page title"
          titleStyle={{ fontSize: 34 }}
          nav={nav}
          actions={toolbarActions}
          tabs={tabs}
          prominentTitle
          activeTabIndex={activeTabIndex}
          onChange={this._handleChange}
          centered
        />
        <CSSTransitionGroup
          component="div"
          className="md-grid"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {children}
        </CSSTransitionGroup>
      </div>
    );
  }
}
